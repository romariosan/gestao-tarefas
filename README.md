# Gestão de Tarefas

Este projeto consiste em uma aplicação de gerenciamento de tarefas com backend em Spring Boot e frontend em Angular.

## Estrutura do Projeto

- `frontend/`: Aplicação Angular para interface do usuário
- `src/`: Código-fonte do backend Spring Boot

## Requisitos

### Backend
- Java 17 ou superior
- Maven 3.6 ou superior
- Banco de dados H2 (configurado no application.yml)

### Frontend
- Node.js 16 ou superior
- npm 8 ou superior
- Angular CLI 17

## Como Executar o Projeto

### Backend (Spring Boot)

1. Navegue até a pasta raiz do projeto:
   ```
   cd gestao-tarefas
   ```

2. Compile e execute o projeto usando Maven:
   ```
   mvn spring-boot:run
   ```

   O servidor backend estará disponível em `http://localhost:8080`.

### Frontend (Angular)

1. Navegue até a pasta do frontend:
   ```
   cd frontend
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```
   npm start
   ```

   O aplicativo estará disponível em `http://localhost:4200`.

## Funcionalidades

### Autenticação
- Login com usuário e senha
- Registro de novos usuários
- Autenticação via JWT Token

### Gerenciamento de Tarefas
- Listagem de tarefas com paginação
- Filtros por status, prioridade e data
- Criação de novas tarefas
- Edição de tarefas existentes
- Exclusão de tarefas

## APIs Disponíveis

### Autenticação
- `POST /api/auth/registrar` - Registrar novo usuário
- `POST /api/auth/autenticar` - Autenticar usuário

### Tarefas
- `GET /api/tarefas` - Listar tarefas (com filtros opcionais)
- `POST /api/tarefas` - Criar nova tarefa
- `PUT /api/tarefas/{id}` - Atualizar tarefa existente
- `DELETE /api/tarefas/{id}` - Excluir tarefa

## Tecnologias Utilizadas

### Backend
- Spring Boot
- Spring Security
- Spring Data JPA
- JWT para autenticação
- Lombok

### Frontend
- Angular 17
- Angular Material
- RxJS
- TypeScript
