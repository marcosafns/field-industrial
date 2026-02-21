# ⚙️ Field Industrial

<div align="center">

**Plataforma completa de engenharia industrial com painel administrativo, agendamento de reuniões e gestão técnica.**

[🌐 Demo](#) · [📋 Documentação](#instalação) · [🐛 Issues](../../issues)

</div>

---

## 📸 Preview

```
┌─────────────────────────────────────────────────────┐
│  🏠 Site Institucional      ⚙️  Painel Admin       │
│  ├── Hero com partículas    ├── Dashboard           │
│  ├── Serviços               ├── Solicitações        │
│  ├── Projetos               ├── Calendário          │
│  ├── Quem Somos             ├── Notificações        │
│  └── Agendamento            └── Gestão de admins    │
└─────────────────────────────────────────────────────┘
```

---

## 🚀 Funcionalidades

### 🌐 Site Institucional
- Hero animado com partículas interativas
- Páginas institucionais: Quem Somos, Valores, Serviços
- Portfólio de projetos com filtros e carrossel
- Formulário de agendamento de reunião
- Animações de scroll reveal
- Layout responsivo (mobile-first)

### ⚙️ Painel Administrativo
- **Dashboard** com métricas, gráficos (Chart.js) e widgets
- **Solicitações** com filtros por status, data, responsável e busca global
- **Calendário** de reuniões
- **Notificações em tempo real** com polling a cada 10s + som
- **Atribuição de responsável** por solicitação
- **Notas internas** visíveis apenas para admins
- **E-mails automáticos** para aprovação, recusa e reagendamento
- Autenticação JWT com sessões de 30 dias
- Suporte a múltiplos administradores

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia |
|--------|-----------|
| Framework | Nuxt.js 3 |
| Linguagem | TypeScript |
| Estilização | Tailwind CSS 3 |
| Banco de Dados | MySQL 8 |
| Autenticação | JWT (jsonwebtoken) |
| Senhas | bcrypt |
| E-mail | Nodemailer |
| Ícones | Nuxt Icon + Lucide |
| Gráficos | Chart.js (CDN) |

---

## 📦 Instalação

### Pré-requisitos

- Node.js 18+
- MySQL 8+
- npm ou yarn

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/field-industrial.git
cd field-industrial
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Banco de dados
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=field_industrial

# JWT
JWT_SECRET=seu_secret_super_seguro_aqui

# E-mail (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu@email.com
SMTP_PASS=sua_senha_de_app
SMTP_FROM=Field Industrial <noreply@fieldindustrial.com.br>
```

### 4. Configure o banco de dados

Execute o SQL abaixo no seu MySQL:

```sql
CREATE DATABASE IF NOT EXISTS field_industrial;
USE field_industrial;

CREATE TABLE admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT NOW()
);

CREATE TABLE meeting_requests (
  id VARCHAR(20) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  company VARCHAR(255),
  subject VARCHAR(255),
  message TEXT,
  preferred_date DATE,
  preferred_time VARCHAR(10),
  status ENUM('pending','approved','rejected','completed') DEFAULT 'pending',
  admin_response TEXT,
  internal_notes TEXT,
  responded_at DATETIME,
  viewed_at DATETIME,
  assigned_to INT,
  assigned_at DATETIME,
  created_at DATETIME DEFAULT NOW(),
  FOREIGN KEY (assigned_to) REFERENCES admins(id) ON DELETE SET NULL
);
```

### 5. Crie o primeiro admin

```bash
node -e "const b = require('bcrypt'); b.hash('sua_senha', 10).then(h => console.log(h))"
```

```sql
INSERT INTO admins (name, email, password)
VALUES ('Seu Nome', 'seu@email.com', 'hash_gerado_acima');
```

### 6. Inicie o servidor

```bash
# Desenvolvimento
npm run dev

# Produção
npm run build
npm run preview
```

Acesse em: `http://localhost:3000`
Painel admin: `http://localhost:3000/admin`

---

## 📁 Estrutura do Projeto

```
field-industrial/
├── app/
│   ├── layouts/
│   │   ├── default.vue          # Layout do site
│   │   └── admin.vue            # Layout do painel admin
│   ├── pages/
│   │   ├── index.vue            # Página inicial
│   │   ├── quem-somos.vue
│   │   ├── valores.vue
│   │   ├── servicos.vue
│   │   ├── projetos-a-venda.vue
│   │   ├── projetos-de-engenharia.vue
│   │   ├── agendar-reuniao.vue
│   │   └── admin/
│   │       ├── index.vue        # Home do admin
│   │       ├── login.vue
│   │       ├── dashboard.vue
│   │       ├── solicitacoes.vue
│   │       ├── calendario.vue
│   │       └── [id].vue         # Detalhe da solicitação
│   ├── components/
│   │   └── Footer.vue
│   └── middleware/
│       └── admin.ts
├── server/
│   ├── api/
│   │   ├── admins/
│   │   ├── auth/
│   │   └── meetings/
│   └── utils/
│       ├── auth.ts
│       ├── db.ts
│       └── mailer.ts
├── public/
│   └── img/
├── app.vue
└── nuxt.config.ts
```

---

## 🔐 Rotas da API

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/api/auth/login` | Login admin |
| `POST` | `/api/auth/logout` | Logout |
| `GET` | `/api/auth/me` | Admin logado |
| `GET` | `/api/meetings` | Listar solicitações |
| `POST` | `/api/meetings` | Nova solicitação |
| `GET` | `/api/meetings/:id` | Detalhe |
| `PATCH` | `/api/meetings/:id` | Atualizar status |
| `PATCH` | `/api/meetings/assign/:id` | Atribuir responsável |
| `PATCH` | `/api/meetings/notes/:id` | Salvar nota interna |
| `POST` | `/api/meetings/viewed/:id` | Marcar como visto |
| `PATCH` | `/api/meetings/reschedule/:id` | Reagendar |
| `GET` | `/api/admins` | Listar admins |

---

## 🌍 Deploy

### Variáveis de ambiente em produção

Lembre de atualizar no `.env`:

```env
# Troca localhost pela URL real
NUXT_PUBLIC_SITE_URL=https://fieldindustrial.com.br

# SMTP de produção
SMTP_HOST=smtp.seudominio.com.br
```

### Build

```bash
npm run build
node .output/server/index.mjs
```

---

## 📄 Licença

Este projeto é propriedade da **Field Industrial**. Todos os direitos reservados.

---

<div align="center">

Desenvolvido com ❤️ para **Field Industrial**

⚙️ *Engenharia com excelência e precisão*

</div>
