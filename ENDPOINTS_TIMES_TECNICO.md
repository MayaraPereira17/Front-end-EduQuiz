# 📋 Endpoints Necessários - Gerenciamento de Times pelo Técnico

## 🎯 Objetivo

Este documento descreve os endpoints necessários para que o técnico possa **gerenciar times de futebol**, escalar jogadores, criar múltiplos times, excluir times e exportar relatórios com quantidade específica de alunos.

---

## 🔐 Autenticação

Todos os endpoints devem exigir:
- Token JWT válido no header `Authorization: Bearer {token}`
- Role "Técnico" (role = "2") no token JWT
- Autenticação obrigatória

---

## 📝 Endpoints Necessários

### 1. **Listar Times**

#### **Endpoint**
```http
GET /api/tecnico/times
```

#### **Headers**
```http
Authorization: Bearer {token}
```

#### **Resposta de Sucesso (200)**
```json
{
  "times": [
    {
      "id": 1,
      "nome": "Time Principal",
      "dataCriacao": "2024-01-15T10:30:00Z",
      "jogadores": [
        {
          "id": 1,
          "alunoId": 5,
          "nome": "João Silva",
          "email": "joao@email.com",
          "posicao": 1,
          "scoreGeral": 92.0
        },
        {
          "id": 2,
          "alunoId": 8,
          "nome": "Maria Santos",
          "email": "maria@email.com",
          "posicao": 2,
          "scoreGeral": 89.0
        }
      ]
    }
  ],
  "totalTimes": 1
}
```

---

### 2. **Criar Time**

#### **Endpoint**
```http
POST /api/tecnico/times
```

#### **Headers**
```http
Authorization: Bearer {token}
Content-Type: application/json
```

#### **Body (JSON)**
```json
{
  "nome": "Time Principal",
  "jogadoresIds": [5, 8, 12, 15, 20, 22, 25, 30, 35, 40, 45]
}
```

#### **Campos do Body**
| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `nome` | string | Sim | Nome do time |
| `jogadoresIds` | number[] | Sim | Array de IDs dos alunos/jogadores |

#### **Resposta de Sucesso (200)**
```json
{
  "id": 1,
  "nome": "Time Principal",
  "dataCriacao": "2024-01-15T10:30:00Z",
  "jogadores": [
    {
      "id": 1,
      "alunoId": 5,
      "nome": "João Silva",
      "email": "joao@email.com",
      "posicao": 1,
      "scoreGeral": 92.0
    }
  ]
}
```

#### **Validações**
- ✅ Validar se usuário é técnico (role = "2")
- ✅ Validar se nome do time não está vazio
- ✅ Validar se há pelo menos 1 jogador
- ✅ Validar se os alunos existem
- ✅ Validar se os alunos já estão em outro time (opcional - decidir se aluno pode estar em múltiplos times)
- ✅ **Notificar alunos** quando escalados:
  - Incluir informação de times escalados no endpoint `/api/aluno/dashboard` (campo `timesEscalados`)
  - Enviar email para o aluno (opcional, backend)

---

### 3. **Adicionar Jogador ao Time**

#### **Endpoint**
```http
POST /api/tecnico/times/{timeId}/jogadores
```

#### **Headers**
```http
Authorization: Bearer {token}
Content-Type: application/json
```

#### **Parâmetros de Rota**
- `timeId` (obrigatório) - ID do time

#### **Body (JSON)**
```json
{
  "alunoId": 10
}
```

#### **Resposta de Sucesso (200)**
```json
{
  "id": 1,
  "nome": "Time Principal",
  "dataCriacao": "2024-01-15T10:30:00Z",
  "jogadores": [
    {
      "id": 1,
      "alunoId": 5,
      "nome": "João Silva",
      "email": "joao@email.com",
      "posicao": 1,
      "scoreGeral": 92.0
    },
    {
      "id": 2,
      "alunoId": 10,
      "nome": "Pedro Costa",
      "email": "pedro@email.com",
      "posicao": 3,
      "scoreGeral": 85.0
    }
  ]
}
```

#### **Validações**
- ✅ Validar se usuário é técnico (role = "2")
- ✅ Validar se time existe
- ✅ Validar se aluno existe
- ✅ Validar se aluno já está no time
- ✅ **Notificar aluno** quando escalado:
  - Atualizar informação no endpoint `/api/aluno/dashboard` (campo `timesEscalados`)
  - Enviar email para o aluno (opcional, backend)

---

### 4. **Remover Jogador do Time**

#### **Endpoint**
```http
DELETE /api/tecnico/times/{timeId}/jogadores/{jogadorId}
```

#### **Headers**
```http
Authorization: Bearer {token}
```

#### **Parâmetros de Rota**
- `timeId` (obrigatório) - ID do time
- `jogadorId` (obrigatório) - ID do jogador no time

#### **Resposta de Sucesso (200)**
```json
{
  "message": "Jogador removido do time com sucesso"
}
```

**Ou:** `204 No Content` (sem body)

---

### 5. **Deletar Time**

#### **Endpoint**
```http
DELETE /api/tecnico/times/{timeId}
```

#### **Headers**
```http
Authorization: Bearer {token}
```

#### **Parâmetros de Rota**
- `timeId` (obrigatório) - ID do time

#### **Resposta de Sucesso (200)**
```json
{
  "message": "Time excluído com sucesso",
  "timeId": 1
}
```

**Ou:** `204 No Content` (sem body)

#### **Validações**
- ✅ Validar se usuário é técnico (role = "2")
- ✅ Validar se time existe
- ✅ **Notificar alunos** quando time é excluído (opcional)

---

### 6. **Exportar Relatório**

#### **Endpoint**
```http
GET /api/tecnico/relatorio-desempenho/exportar?formato={pdf|excel}&quantidade={numero}
```

#### **Headers**
```http
Authorization: Bearer {token}
Accept: application/pdf ou application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
```

#### **Parâmetros de Query**
- `formato` (obrigatório) - "pdf" ou "excel"
- `quantidade` (opcional) - Número de alunos a incluir (top N do ranking). Se não informado, exporta todos.

#### **Exemplos**
```http
GET /api/tecnico/relatorio-desempenho/exportar?formato=pdf
GET /api/tecnico/relatorio-desempenho/exportar?formato=pdf&quantidade=10
GET /api/tecnico/relatorio-desempenho/exportar?formato=excel&quantidade=20
```

#### **Resposta de Sucesso (200)**
- **Content-Type:** `application/pdf` ou `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
- **Content-Disposition:** `attachment; filename="relatorio-desempenho.pdf"`
- **Body:** Arquivo binário (PDF ou Excel)

#### **Validações**
- ✅ Validar se usuário é técnico (role = "2")
- ✅ Validar formato (apenas "pdf" ou "excel")
- ✅ Validar quantidade (se fornecida, deve ser número positivo)
- ✅ Se quantidade fornecida, retornar apenas os top N alunos do ranking
- ✅ Se quantidade não fornecida, retornar todos os alunos

---

## 🔔 Notificações para Alunos

### **Quando um aluno é escalado:**
- ✅ Enviar notificação no sistema (se houver sistema de notificações)
- ✅ Enviar email para o aluno informando que foi escalado
- ✅ Mensagem: "Você foi escalado para o time '{nomeTime}' pelo técnico {nomeTecnico}"

### **Quando um time é excluído:**
- ✅ Enviar notificação para todos os jogadores do time
- ✅ Mensagem: "O time '{nomeTime}' foi removido. Você não está mais escalado."

---

## 📊 Estrutura de Dados

### **TimeDTO**
```typescript
interface TimeDTO {
  id: number;
  nome: string;
  dataCriacao: string;
  jogadores: JogadorTimeDTO[];
}
```

### **JogadorTimeDTO**
```typescript
interface JogadorTimeDTO {
  id: number;           // ID do registro na tabela de jogadores do time
  alunoId: number;      // ID do aluno
  nome: string;         // Nome do aluno
  email: string;        // Email do aluno
  posicao: number;      // Posição no ranking
  scoreGeral: number;   // Score geral do aluno
}
```

### **CriarTimeDTO**
```typescript
interface CriarTimeDTO {
  nome: string;
  jogadoresIds: number[];  // Array de IDs dos alunos
}
```

---

## 🗃️ Estrutura do Banco de Dados (Sugestão)

### **Tabela: Times**
```sql
CREATE TABLE Times (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Nome NVARCHAR(100) NOT NULL,
    TecnicoId INT NOT NULL,
    DataCriacao DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (TecnicoId) REFERENCES Users(Id)
);
```

### **Tabela: JogadoresTime**
```sql
CREATE TABLE JogadoresTime (
    Id INT PRIMARY KEY IDENTITY(1,1),
    TimeId INT NOT NULL,
    AlunoId INT NOT NULL,
    DataEscalacao DATETIME NOT NULL DEFAULT GETDATE(),
    FOREIGN KEY (TimeId) REFERENCES Times(Id),
    FOREIGN KEY (AlunoId) REFERENCES Users(Id),
    UNIQUE(TimeId, AlunoId) -- Um aluno pode estar em apenas um time por vez (ou remover se permitir múltiplos times)
);
```

---

## ✅ Validações e Regras de Negócio

### **Criar Time:**
1. ✅ Nome do time é obrigatório
2. ✅ Deve ter pelo menos 1 jogador
3. ✅ Alunos devem existir no sistema
4. ✅ Alunos devem estar ativos (IsActive = true)
5. ⚠️ **Decisão necessária:** Um aluno pode estar em múltiplos times simultaneamente?
   - Opção A: Sim (permitir)
   - Opção B: Não (um aluno apenas em um time)

### **Adicionar Jogador:**
1. ✅ Time deve existir
2. ✅ Aluno deve existir
3. ✅ Aluno deve estar ativo
4. ✅ Aluno não deve estar no time (se regra for um time por aluno)

### **Deletar Time:**
1. ✅ Time deve existir
2. ✅ Apenas o técnico que criou o time pode deletar (ou qualquer técnico?)
3. ✅ Notificar alunos quando time é excluído

---

## 🧪 Exemplos de Uso

### **Exemplo 1: Criar Time com 11 Jogadores**
```http
POST /api/tecnico/times
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "nome": "Time Titular",
  "jogadoresIds": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
}
```

### **Exemplo 2: Adicionar Jogador a um Time Existente**
```http
POST /api/tecnico/times/1/jogadores
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "alunoId": 12
}
```

### **Exemplo 3: Exportar Relatório PDF com Top 10**
```http
GET /api/tecnico/relatorio-desempenho/exportar?formato=pdf&quantidade=10
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Accept: application/pdf
```

### **Exemplo 4: Exportar Relatório Excel com Todos os Alunos**
```http
GET /api/tecnico/relatorio-desempenho/exportar?formato=excel
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Accept: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
```

### **Exemplo 5: Deletar Time**
```http
DELETE /api/tecnico/times/1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🔄 Integração com Frontend

### **Como o frontend está chamando:**

#### **Listar Times**
```typescript
const response = await tecnicoService.getTimes();
// Retorna: { times: [...], totalTimes: number }
```

#### **Criar Time**
```typescript
await tecnicoService.criarTime({
  nome: "Time Principal",
  jogadoresIds: [1, 2, 3, 4, 5]
});
```

#### **Adicionar Jogador**
```typescript
await tecnicoService.adicionarJogadorAoTime(timeId, alunoId);
```

#### **Deletar Time**
```typescript
await tecnicoService.deleteTime(timeId);
```

#### **Exportar Relatório**
```typescript
const blob = await tecnicoService.exportarRelatorio('pdf', 10); // Top 10
// ou
const blob = await tecnicoService.exportarRelatorio('excel'); // Todos
```

---

## ❓ Decisões Necessárias

### **1. Múltiplos Times por Aluno**
- **Pergunta:** Um aluno pode estar em múltiplos times simultaneamente?
- **Opção A:** Sim (mais flexível)
- **Opção B:** Não (um aluno apenas em um time)

### **2. Notificações**
- **Pergunta:** Como notificar os alunos quando são escalados?
- **Opção A:** Email apenas
- **Opção B:** Notificação no sistema + Email
- **Opção C:** Apenas notificação no sistema

### **3. Limite de Jogadores por Time**
- **Pergunta:** Deve haver um limite de jogadores por time?
- **Opção A:** Sem limite
- **Opção B:** Limite fixo (ex: 11, 22, etc.)
- **Opção C:** Limite configurável

### **4. Permissões para Deletar Time**
- **Pergunta:** Qual técnico pode deletar um time?
- **Opção A:** Apenas o técnico que criou
- **Opção B:** Qualquer técnico

---

## ✅ Checklist de Implementação

- [ ] Implementar `GET /api/tecnico/times`
- [ ] Implementar `POST /api/tecnico/times`
- [ ] Implementar `POST /api/tecnico/times/{timeId}/jogadores`
- [ ] Implementar `DELETE /api/tecnico/times/{timeId}/jogadores/{jogadorId}`
- [ ] Implementar `DELETE /api/tecnico/times/{timeId}`
- [ ] Implementar `GET /api/tecnico/relatorio-desempenho/exportar`
- [ ] Adicionar validações de permissão (apenas técnicos)
- [ ] Adicionar validações de dados de entrada
- [ ] Implementar notificações para alunos
- [ ] Implementar geração de PDF
- [ ] Implementar geração de Excel
- [ ] Implementar filtro por quantidade no relatório
- [ ] Adicionar logs de auditoria
- [ ] Testar endpoints com diferentes cenários
- [ ] Documentar no Swagger/OpenAPI (se aplicável)

---

## 📱 Notificação para Alunos - Integração com Dashboard

### **Como Funciona**

Quando um aluno é escalado para um time, a informação deve ser incluída no endpoint `/api/aluno/dashboard` no campo `timesEscalados`. O frontend exibirá uma notificação no dashboard do aluno.

#### **Endpoint Modificado**
```http
GET /api/aluno/dashboard
```

#### **Resposta de Sucesso (200) - Adicionar campo `timesEscalados`**
```json
{
  "data": {
    "quizzesCompletos": 10,
    "pontos": 850,
    "mediaGeral": 85.5,
    "posicaoRanking": 5,
    "sequencia": 7,
    "totalUsuarios": 50,
    "quizzesRecentes": [...],
    "timesEscalados": [
      {
        "id": 1,
        "nome": "Time Principal",
        "dataCriacao": "2024-01-15T10:30:00Z",
        "dataEscalacao": "2024-01-15T10:35:00Z"
      }
    ]
  }
}
```

#### **Estrutura do Campo `timesEscalados`**
```typescript
interface TimeEscalacao {
  id: number;           // ID do time
  nome: string;         // Nome do time
  dataCriacao: string;  // Data de criação do time
  dataEscalacao: string; // Data em que o aluno foi escalado
}
```

#### **Regras**
- ✅ `timesEscalados` é um array opcional (pode ser `null` ou `[]` se não houver times)
- ✅ Deve retornar apenas times em que o aluno está atualmente escalado
- ✅ Deve incluir a data de escalação para mostrar quando o aluno foi escalado
- ✅ Se o aluno foi removido do time, não deve aparecer mais neste array
- ✅ Ordenar por `dataEscalacao` (mais recente primeiro)

#### **Comportamento no Frontend**
- O frontend exibirá uma notificação visual no dashboard do aluno
- O aluno pode fechar a notificação (armazenado no `localStorage`)
- A notificação é exibida apenas para times novos (não fechados pelo aluno)

---

**Data de Criação:** Janeiro 2024  
**Versão:** 1.1  
**Status:** Aguardando implementação no backend

