const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');

dotenv.config();  // Para usar variáveis de ambiente

const app = express();  
const prisma = new PrismaClient();
app.use(express.json());

// Função para gerar token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Middleware para excluir a senha de um objeto usuário
const excludePassword = (user) => {
    // Cria uma cópia do objeto user para não modificar o original
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

// Rota de login (agora com Prisma)
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar se o usuário existe (consulta completa necessária para verificar a senha)
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    // Verificar se a senha está correta
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Senha incorreta' });
    }

     // Gerar token JWT
    const token = generateToken(user.id);
    
    // Retorna o usuário sem a senha
    const userWithoutPassword = excludePassword(user);

    res.json({
      message: 'Login bem-sucedido',
      token,
      user: userWithoutPassword
    });
  } catch (err) {
    console.error("Erro no login:", err); // Adicionado log
    res.status(500).json({ error: 'Erro ao verificar usuário' });
  }
});

// Rota de registro de usuário (com Prisma)
app.post('/register', async (req, res) => {
  const { email, password, name, crea } = req.body;

  try {
    // MELHORIA: Apenas verifica a existência buscando um campo leve (id)
    const userExists = await prisma.user.findUnique({
      where: { email: email },
      select: { id: true }
    });

    if (userExists) {
      return res.status(400).json({ error: 'Usuário já registrado' });
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserir o novo usuário no banco de dados
    let user = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        name: name,
        crea: crea, 
      },
    });

    // CORREÇÃO DE SEGURANÇA: Excluir a senha antes de enviar a resposta
    user = excludePassword(user);

    res.json({ message: 'Usuário registrado com sucesso', user });
  } catch (err) {
    console.error("Erro no registro:", err); // Adicionado log
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

// Rota para visualizar agendamentos (com Prisma)
app.get('/appointments', authenticateToken, async (req, res) => {
  const userId = req.user.id;

  try {
    // Consultar os agendamentos para o usuário autenticado
    const appointments = await prisma.appointment.findMany({
      where: { userId: userId },
    });

    res.json({ message: 'Agendamentos recuperados com sucesso', appointments });
  } catch (err) {
    console.error("Erro ao buscar agendamentos:", err); // Adicionado log
    res.status(500).json({ error: 'Erro ao buscar agendamentos' });
  }
});

// Função middleware para verificar o token JWT
function authenticateToken(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) return res.status(401).json({ error: 'Acesso negado, token não fornecido' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.user = user;
    next();
  });
}

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});