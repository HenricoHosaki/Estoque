# MiniProjeto Estoque

## Descrição do Projeto

O projeto **MiniProjeto Estoque** é uma aplicação de backend desenvolvida em Node.js, utilizando o framework Express para roteamento e o ORM Sequelize para a gestão do banco de dados. O objetivo principal desta aplicação é fornecer uma API robusta e escalável para o gerenciamento de um sistema de estoque, permitindo operações de CRUD (Create, Read, Update, Delete) em recursos como usuários, produtos e possivelmente outros módulos relacionados a um sistema de inventário.

A arquitetura do projeto sugere uma separação clara de responsabilidades, com arquivos dedicados para a configuração do banco de dados, definição de rotas e lógica de negócio (modelos e controladores, conforme inferido pela estrutura). O uso de variáveis de ambiente (`dotenv`) e a configuração do Sequelize indicam que a aplicação está preparada para ser executada em diferentes ambientes, com suporte a bancos de dados como PostgreSQL (`pg`) e MySQL (`mysql2`), embora a configuração do Sequelize aponte para um uso mais específico de um dialeto de banco de dados definido por variável de ambiente.

O projeto inclui um `Dockerfile`, indicando que ele foi concebido para ser facilmente conteinerizado e implantado em ambientes de produção que utilizam Docker.

Link do postman para testes: https://web.postman.co/f1afd020-1a9d-4d74-8898-5d590ff989b0

## Tecnologias Utilizadas

A seguir, estão as principais tecnologias e bibliotecas utilizadas neste projeto, conforme o arquivo `package.json`:

| Tecnologia | Versão | Descrição |
| :--- | :--- | :--- |
| **Node.js** | (Inferido) | Ambiente de execução JavaScript no lado do servidor. |
| **Express** | `^5.1.0` | Framework web rápido e minimalista para Node.js. |
| **Sequelize** | `^6.37.7` | ORM (Object-Relational Mapper) para Node.js, facilitando a interação com bancos de dados relacionais. |
| **dotenv** | `^17.2.3` | Módulo para carregar variáveis de ambiente de um arquivo `.env`. |
| **bcrypt** | `^6.0.0` | Biblioteca para hash de senhas, garantindo a segurança das credenciais de usuário. |
| **jsonwebtoken** | `^9.0.2` | Implementação de JSON Web Tokens (JWT) para autenticação e autorização. |
| **pg** | `^8.16.3` | Driver para PostgreSQL, sugerindo que este é o banco de dados principal ou suportado. |
| **mysql2** | `^3.15.2` | Driver para MySQL, indicando suporte a múltiplos bancos de dados. |
| **jest** | `^30.2.0` | Framework de testes JavaScript. |

## Configuração e Instalação

Para configurar e executar o projeto localmente, siga os passos abaixo:

### 1. Pré-requisitos

Certifique-se de ter instalado em sua máquina:
*   Node.js (versão compatível com as dependências)
*   npm (gerenciador de pacotes do Node.js)
*   Um servidor de banco de dados (PostgreSQL ou MySQL, dependendo da configuração final)

### 2. Instalação de Dependências

Navegue até o diretório raiz do projeto e execute o comando:

```
npm install
```

### 3. Configuração do Banco de Dados

O projeto utiliza variáveis de ambiente para a conexão com o banco de dados. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis (exemplo para PostgreSQL):

```
# Variáveis de Ambiente
PORT=3000

# Configuração do Banco de Dados
DB_DIALECT=postgres
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
```

### 4. Execução do Projeto

O projeto pode ser executado de duas maneiras:

#### Modo de Desenvolvimento (com monitoramento de arquivos)

```
npm run dev
```

#### Modo de Produção

```
npm start
```

## Rotas Principais (Inferidas)

Com base no `app.js` e `setupRoutes.js`, as rotas são configuradas dinamicamente. As rotas principais identificadas são:

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `POST` | `/api/v1/login/` | Rota de autenticação de usuário. |
| `*` | `/api/v1/<modulo>/` | Rotas dinâmicas para os módulos (ex: `/api/v1/produtos/`, `/api/v1/usuarios/`). |

## Conteinerização (Docker)

O `Dockerfile` permite que a aplicação seja facilmente conteinerizada. Para construir a imagem Docker, execute:

```
docker build -t miniprojeto-estoque .
```

Para executar o contêiner (assumindo que o banco de dados está acessível):

```
docker run -p 3000:3000 miniprojeto-estoque
```
**Licença:** ISC

