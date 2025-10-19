# 📚 **Integração Completa - API do Professor - EduQuiz**

## 🔐 **1. Autenticação**

### **Login do Professor:**
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "professor@teste.com",
  "password": "senha123"
}
```

**Resposta:**
```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "refresh_token_here",
    "user": {
      "id": 1,
      "firstName": "João",
      "lastName": "Silva",
      "email": "professor@teste.com",
      "role": "Professor"
    }
  }
}
```

### **Registro do Professor:**
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "professor@teste.com",
  "email": "professor@teste.com",
  "password": "senha123",
  "confirmPassword": "senha123",
  "firstName": "João",
  "lastName": "Silva",
  "role": "Professor"
}
```

---

## 📊 **2. Dashboard do Professor**

### **Obter Dashboard:**
```http
GET /api/professor/dashboard
Authorization: Bearer {token}
```

**Resposta:**
```json
{
  "quizzesCriados": 12,
  "mediaDosAlunos": 74.2,
  "totalAlunos": 45,
  "totalTentativas": 156,
  "quizzesRecentes": [
    {
      "id": 1,
      "titulo": "Equações do 2º Grau",
      "categoria": "Matemática",
      "totalTentativas": 17,
      "mediaPontuacao": 78.5,
      "dataCriacao": "2024-01-15T10:30:00Z",
      "publicado": true
    }
  ]
}
```

---

## 🎯 **3. Gerenciamento de Quizzes**

### **3.1 Listar Quizzes:**
```http
GET /api/professor/quizzes
Authorization: Bearer {token}

# Com busca
GET /api/professor/quizzes?busca=equações
Authorization: Bearer {token}
```

**Resposta:**
```json
[
  {
    "id": 1,
    "titulo": "Equações do 2º Grau",
    "descricao": "Quiz sobre resolução de equações quadráticas",
    "categoria": "Matemática",
    "dificuldade": "Médio",
    "tempoLimite": 30,
    "totalQuestoes": 2,
    "totalTentativas": 17,
    "publicado": true,
    "dataCriacao": "2024-01-15T10:30:00Z",
    "mediaPontuacao": 78.5
  }
]
```

### **3.2 Obter Quiz Específico:**
```http
GET /api/professor/quizzes/1
Authorization: Bearer {token}
```

**Resposta:**
```json
{
  "id": 1,
  "titulo": "Equações do 2º Grau",
  "descricao": "Quiz sobre resolução de equações quadráticas",
  "categoriaId": 1,
  "categoria": "Matemática",
  "dificuldade": "Médio",
  "tempoLimite": 30,
  "maxTentativas": 1,
  "ativo": true,
  "publico": true,
  "dataCriacao": "2024-01-15T10:30:00Z",
  "dataAtualizacao": "2024-01-15T10:30:00Z",
  "totalQuestoes": 2,
  "questoes": [
    {
      "id": 1,
      "textoQuestao": "Qual é a fórmula de Bhaskara?",
      "tipoQuestao": "MultiplaEscolha",
      "pontos": 1,
      "ordemIndice": 1,
      "ativo": true,
      "opcoes": [
        {
          "id": 1,
          "textoOpcao": "x = -b ± √(b²-4ac) / 2a",
          "correta": true,
          "ordemIndice": 1
        },
        {
          "id": 2,
          "textoOpcao": "x = -b ± √(b²+4ac) / 2a",
          "correta": false,
          "ordemIndice": 2
        }
      ]
    }
  ]
}
```

### **3.3 Criar Novo Quiz:**
```http
POST /api/professor/quizzes
Authorization: Bearer {token}
Content-Type: application/json

{
  "titulo": "Equações do 2º Grau",
  "descricao": "Quiz sobre resolução de equações quadráticas",
  "categoriaId": 1,
  "dificuldade": "Médio",
  "tempoLimite": 30,
  "maxTentativas": 1,
  "publico": true,
  "questoes": [
    {
      "textoQuestao": "Qual é a fórmula de Bhaskara?",
      "tipoQuestao": "MultiplaEscolha",
      "pontos": 1,
      "ordemIndice": 1,
      "opcoes": [
        {
          "textoOpcao": "x = -b ± √(b²-4ac) / 2a",
          "correta": true,
          "ordemIndice": 1
        },
        {
          "textoOpcao": "x = -b ± √(b²+4ac) / 2a",
          "correta": false,
          "ordemIndice": 2
        }
      ]
    }
  ]
}
```

**Resposta:**
```json
{
  "id": 1,
  "titulo": "Equações do 2º Grau",
  "mensagem": "Quiz criado com sucesso!",
  "sucesso": true
}
```

### **3.4 Atualizar Quiz:**
```http
PUT /api/professor/quizzes/1
Authorization: Bearer {token}
Content-Type: application/json

{
  "titulo": "Equações do 2º Grau - Atualizado",
  "descricao": "Quiz atualizado sobre resolução de equações quadráticas",
  "categoriaId": 1,
  "dificuldade": "Médio",
  "tempoLimite": 35,
  "maxTentativas": 2,
  "ativo": true,
  "publico": true,
  "questoes": [
    {
      "id": 1,
      "textoQuestao": "Qual é a fórmula de Bhaskara?",
      "tipoQuestao": "MultiplaEscolha",
      "pontos": 1,
      "ordemIndice": 1,
      "opcoes": [
        {
          "id": 1,
          "textoOpcao": "x = -b ± √(b²-4ac) / 2a",
          "correta": true,
          "ordemIndice": 1
        }
      ]
    }
  ]
}
```

### **3.5 Deletar Quiz:**
```http
DELETE /api/professor/quizzes/1
Authorization: Bearer {token}
```

**Resposta:**
```json
{
  "id": 1,
  "titulo": "Equações do 2º Grau",
  "mensagem": "Quiz deletado com sucesso!",
  "sucesso": true
}
```

### **3.6 Publicar Quiz:**
```http
POST /api/professor/quizzes/1/publicar
Authorization: Bearer {token}
```

**Resposta:**
```json
{
  "id": 1,
  "titulo": "Equações do 2º Grau",
  "mensagem": "Quiz publicado com sucesso!",
  "sucesso": true
}
```

### **3.7 Despublicar Quiz:**
```http
POST /api/professor/quizzes/1/despublicar
Authorization: Bearer {token}
```

**Resposta:**
```json
{
  "id": 1,
  "titulo": "Equações do 2º Grau",
  "mensagem": "Quiz despublicado com sucesso!",
  "sucesso": true
}
```

---

## 📈 **4. Estatísticas**

### **4.1 Estatísticas do Quiz:**
```http
GET /api/professor/quizzes/1/estatisticas
Authorization: Bearer {token}
```

**Resposta:**
```json
{
  "quizId": 1,
  "tituloQuiz": "Equações do 2º Grau",
  "totalTentativas": 17,
  "totalAlunos": 15,
  "mediaPontuacao": 78.5,
  "mediaTempo": 1200.5,
  "totalQuestoes": 2,
  "estatisticasQuestoes": [
    {
      "questaoId": 1,
      "textoQuestao": "Qual é a fórmula de Bhaskara?",
      "totalRespostas": 17,
      "respostasCorretas": 14,
      "respostasErradas": 3,
      "percentualAcerto": 82.4
    }
  ],
  "tentativasRecentes": [
    {
      "tentativaId": 123,
      "nomeAluno": "Lucas Ribeiro",
      "pontuacao": 2,
      "pontuacaoMaxima": 2,
      "percentual": 100.0,
      "tempoGasto": 900,
      "dataConclusao": "2024-01-15T14:30:00Z"
    }
  ]
}
```

### **4.2 Estatísticas das Questões:**
```http
GET /api/professor/quizzes/1/estatisticas/questoes
Authorization: Bearer {token}
```

**Resposta:**
```json
[
  {
    "questaoId": 1,
    "textoQuestao": "Qual é a fórmula de Bhaskara?",
    "totalRespostas": 17,
    "respostasCorretas": 14,
    "respostasErradas": 3,
    "percentualAcerto": 82.4
  }
]
```

### **4.3 Tentativas do Quiz:**
```http
GET /api/professor/quizzes/1/tentativas
Authorization: Bearer {token}
```

**Resposta:**
```json
[
  {
    "tentativaId": 123,
    "nomeAluno": "Lucas Ribeiro",
    "pontuacao": 2,
    "pontuacaoMaxima": 2,
    "percentual": 100.0,
    "tempoGasto": 900,
    "dataConclusao": "2024-01-15T14:30:00Z"
  }
]
```

---

## 👤 **5. Perfil do Professor**

### **5.1 Obter Perfil:**
```http
GET /api/professor/perfil
Authorization: Bearer {token}
```

**Resposta:**
```json
{
  "id": 1,
  "nome": "João",
  "sobrenome": "Silva",
  "nomeCompleto": "João Silva",
  "email": "professor@demo.com",
  "funcao": "Professor",
  "cpf": "123.456.789-00",
  "dataNascimento": "1980-05-15T00:00:00Z",
  "escola": "Escola Estadual XYZ",
  "disciplina": "Matemática",
  "dataCriacao": "2023-01-01T10:00:00Z",
  "estatisticas": {
    "quizzesCriados": 12,
    "mediaDosAlunos": 74.2,
    "totalAlunos": 45,
    "totalTentativas": 156,
    "quizzesPublicados": 10
  }
}
```

### **5.2 Atualizar Perfil:**
```http
PUT /api/professor/perfil
Authorization: Bearer {token}
Content-Type: application/json

{
  "nome": "João",
  "sobrenome": "Silva",
  "cpf": "123.456.789-00",
  "dataNascimento": "1980-05-15T00:00:00Z",
  "escola": "Escola Estadual XYZ",
  "disciplina": "Matemática"
}
```

**Resposta:**
```json
{
  "id": 1,
  "nome": "João",
  "sobrenome": "Silva",
  "nomeCompleto": "João Silva",
  "email": "professor@demo.com",
  "funcao": "Professor",
  "cpf": "123.456.789-00",
  "dataNascimento": "1980-05-15T00:00:00Z",
  "escola": "Escola Estadual XYZ",
  "disciplina": "Matemática",
  "dataCriacao": "2023-01-01T10:00:00Z",
  "estatisticas": {
    "quizzesCriados": 12,
    "mediaDosAlunos": 74.2,
    "totalAlunos": 45,
    "totalTentativas": 156,
    "quizzesPublicados": 10
  }
}
```

---

## 📚 **6. Categorias**

### **6.1 Listar Categorias:**
```http
GET /api/professor/categorias
Authorization: Bearer {token}
```

**Resposta:**
```json
[
  {
    "id": 1,
    "nome": "Matemática",
    "descricao": "Quizzes sobre matemática",
    "ativo": true
  },
  {
    "id": 2,
    "nome": "Português",
    "descricao": "Quizzes sobre língua portuguesa",
    "ativo": true
  }
]
```

### **6.2 Obter Categoria Específica:**
```http
GET /api/professor/categorias/1
Authorization: Bearer {token}
```

**Resposta:**
```json
{
  "id": 1,
  "nome": "Matemática",
  "descricao": "Quizzes sobre matemática",
  "ativo": true
}
```

---

## 🔧 **7. Estrutura dos DTOs**

### **7.1 CriarQuizRequestDTO:**
```json
{
  "titulo": "string (obrigatório, max 200 caracteres)",
  "descricao": "string (opcional)",
  "categoriaId": "integer (obrigatório)",
  "dificuldade": "string (obrigatório: Fácil, Médio, Difícil)",
  "tempoLimite": "integer (opcional, em minutos)",
  "maxTentativas": "integer (padrão: 1)",
  "publico": "boolean (padrão: false)",
  "questoes": [
    {
      "textoQuestao": "string (obrigatório)",
      "tipoQuestao": "string (obrigatório: MultiplaEscolha)",
      "pontos": "integer (padrão: 1)",
      "ordemIndice": "integer (obrigatório)",
      "opcoes": [
        {
          "textoOpcao": "string (obrigatório)",
          "correta": "boolean (padrão: false)",
          "ordemIndice": "integer (obrigatório)"
        }
      ]
    }
  ]
}
```

### **7.2 AtualizarQuizRequestDTO:**
```json
{
  "titulo": "string (obrigatório, max 200 caracteres)",
  "descricao": "string (opcional)",
  "categoriaId": "integer (obrigatório)",
  "dificuldade": "string (obrigatório)",
  "tempoLimite": "integer (opcional)",
  "maxTentativas": "integer",
  "ativo": "boolean",
  "publico": "boolean",
  "questoes": [
    {
      "id": "integer (opcional, null para novas questões)",
      "textoQuestao": "string (obrigatório)",
      "tipoQuestao": "string (obrigatório)",
      "pontos": "integer",
      "ordemIndice": "integer (obrigatório)",
      "opcoes": [
        {
          "id": "integer (opcional, null para novas opções)",
          "textoOpcao": "string (obrigatório)",
          "correta": "boolean",
          "ordemIndice": "integer (obrigatório)"
        }
      ]
    }
  ]
}
```

---

## 🔒 **8. Segurança e Validações**

### **Headers Obrigatórios:**
```http
Authorization: Bearer {token}
Content-Type: application/json
```

### **Política de Autorização:**
- Todas as rotas do professor exigem autenticação JWT
- Token deve conter a função "Professor"
- Política: `ProfessorOnly`

### **Validações de Negócio:**
- Professor só pode editar/deletar seus próprios quizzes
- Quizzes com tentativas não podem ser deletados, apenas desativados
- Categoria deve existir e estar ativa
- Uma resposta correta por questão de múltipla escolha
- Ordem das questões e opções é mantida conforme especificado

### **Códigos de Status HTTP:**
- `200 OK`: Operação realizada com sucesso
- `201 Created`: Recurso criado com sucesso
- `400 Bad Request`: Dados inválidos na requisição
- `401 Unauthorized`: Token JWT inválido ou ausente
- `403 Forbidden`: Usuário não tem permissão (não é professor)
- `404 Not Found`: Recurso não encontrado
- `500 Internal Server Error`: Erro interno do servidor

---

## 🌐 **9. URLs de Ambiente**

### **Desenvolvimento:**
- Base URL: `http://localhost:5034`
- Swagger: `http://localhost:5034/swagger`

### **Produção:**
- Base URL: `https://eduquiz-back-end-production.up.railway.app`
- Swagger: `https://eduquiz-back-end-production.up.railway.app/swagger`

---

## 🚀 **10. Fluxo Completo de Uso**

### **1. Autenticação:**
1. Fazer login: `POST /api/auth/login`
2. Armazenar token JWT
3. Usar token em todas as requisições seguintes

### **2. Dashboard:**
1. Obter dashboard: `GET /api/professor/dashboard`
2. Visualizar estatísticas gerais

### **3. Gerenciamento de Quizzes:**
1. Listar categorias: `GET /api/professor/categorias`
2. Criar quiz: `POST /api/professor/quizzes`
3. Publicar quiz: `POST /api/professor/quizzes/{id}/publicar`
4. Acompanhar estatísticas: `GET /api/professor/quizzes/{id}/estatisticas`

### **4. Perfil:**
1. Visualizar perfil: `GET /api/professor/perfil`
2. Atualizar dados: `PUT /api/professor/perfil`

---

## 📋 **11. Exemplos de Requisições Completas**

### **Quiz de Matemática - Equações do 2º Grau:**
```http
POST /api/professor/quizzes
Authorization: Bearer {token}
Content-Type: application/json

{
  "titulo": "Equações do 2º Grau",
  "descricao": "Quiz sobre resolução de equações quadráticas e suas aplicações",
  "categoriaId": 1,
  "dificuldade": "Médio",
  "tempoLimite": 30,
  "maxTentativas": 1,
  "publico": true,
  "questoes": [
    {
      "textoQuestao": "Qual é a fórmula de Bhaskara?",
      "tipoQuestao": "MultiplaEscolha",
      "pontos": 1,
      "ordemIndice": 1,
      "opcoes": [
        {
          "textoOpcao": "x = -b ± √(b²-4ac) / 2a",
          "correta": true,
          "ordemIndice": 1
        },
        {
          "textoOpcao": "x = -b ± √(b²+4ac) / 2a",
          "correta": false,
          "ordemIndice": 2
        },
        {
          "textoOpcao": "x = b ± √(b²-4ac) / 2a",
          "correta": false,
          "ordemIndice": 3
        }
      ]
    },
    {
      "textoQuestao": "O que é o discriminante?",
      "tipoQuestao": "MultiplaEscolha",
      "pontos": 1,
      "ordemIndice": 2,
      "opcoes": [
        {
          "textoOpcao": "b² - 4ac",
          "correta": true,
          "ordemIndice": 1
        },
        {
          "textoOpcao": "b² + 4ac",
          "correta": false,
          "ordemIndice": 2
        },
        {
          "textoOpcao": "4ac - b²",
          "correta": false,
          "ordemIndice": 3
        }
      ]
    }
  ]
}
```

### **Quiz de Português - Gramática:**
```http
POST /api/professor/quizzes
Authorization: Bearer {token}
Content-Type: application/json

{
  "titulo": "Gramática Básica",
  "descricao": "Quiz sobre regras gramaticais fundamentais",
  "categoriaId": 2,
  "dificuldade": "Fácil",
  "tempoLimite": 25,
  "maxTentativas": 1,
  "publico": true,
  "questoes": [
    {
      "textoQuestao": "Qual é a classificação da palavra 'rapidamente'?",
      "tipoQuestao": "MultiplaEscolha",
      "pontos": 1,
      "ordemIndice": 1,
      "opcoes": [
        {
          "textoOpcao": "Adjetivo",
          "correta": false,
          "ordemIndice": 1
        },
        {
          "textoOpcao": "Advérbio",
          "correta": true,
          "ordemIndice": 2
        },
        {
          "textoOpcao": "Substantivo",
          "correta": false,
          "ordemIndice": 3
        }
      ]
    }
  ]
}
```

---

## ⚠️ **12. Observações Importantes**

### **Regras de Negócio:**
- Todas as questões valem 1 ponto
- Apenas uma resposta correta por questão de múltipla escolha
- Quizzes com tentativas não podem ser deletados, apenas desativados
- Professor só pode gerenciar seus próprios quizzes

### **Validações:**
- Título do quiz é obrigatório (máximo 200 caracteres)
- Categoria deve existir e estar ativa
- Pelo menos uma questão é obrigatória
- Cada questão deve ter pelo menos 2 opções
- Ordem das questões e opções deve ser única

### **Performance:**
- Use paginação para listas grandes
- Cache as categorias (raramente mudam)
- Implemente retry para requisições que falham

---

## 📞 **13. Suporte**

Para dúvidas ou problemas com a API:
1. Verifique se o token JWT está válido
2. Confirme se o usuário tem função "Professor"
3. Valide os dados de entrada conforme os DTOs
4. Consulte os logs do servidor para erros internos

---

**Documento criado em:** `{DateTime.Now:dd/MM/yyyy HH:mm}`  
**Versão da API:** 1.0  
**Última atualização:** Sistema de avatares implementado
