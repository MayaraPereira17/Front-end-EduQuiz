# 📚 **Guia de Integração - EduQuiz API com React**

## 🌐 **URL da API**
```
https://eduquiz-back-end-production.up.railway.app
```

---

## 🔐 **ENDPOINTS DE AUTENTICAÇÃO**

### **1. REGISTRO DE USUÁRIO**
```http
POST https://eduquiz-back-end-production.up.railway.app/api/Auth/register
```

**Headers:**
```json
{
  "Content-Type": "application/json"
}
```

**Body:**
```json
{
  "username": "maria.aluna",
  "email": "maria@email.com",
  "password": "senha123",
  "firstName": "Maria",
  "lastName": "Santos",
  "cpf": "987.654.321-00",
  "dataNascimento": "2001-03-20T00:00:00.000Z",
  "role": "0"
}
```

**Resposta de Sucesso (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "expiresAt": "2024-01-15T10:30:00.000Z",
  "user": {
    "id": 1,
    "username": "maria.aluna",
    "email": "maria@email.com",
    "firstName": "Maria",
    "lastName": "Santos",
    "fullName": "Maria Santos",
    "cpf": "987.654.321-00",
    "dataNascimento": "2001-03-20T00:00:00.000Z",
    "role": 0,
    "isActive": true,
    "createdAt": "2024-01-14T10:30:00.000Z",
    "isAdmin": false,
    "isTeacher": false,
    "isStudent": true
  }
}
```

**Resposta de Erro (400):**
```json
{
  "message": "Email ou username já existem"
}
```

---

### **2. LOGIN DE USUÁRIO**
```http
POST https://eduquiz-back-end-production.up.railway.app/api/Auth/login
```

**Headers:**
```json
{
  "Content-Type": "application/json"
}
```

**Body:**
```json
{
  "email": "maria@email.com",
  "password": "senha123"
}
```

**Resposta de Sucesso (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "expiresAt": "2024-01-15T10:30:00.000Z",
  "user": {
    "id": 1,
    "username": "maria.aluna",
    "email": "maria@email.com",
    "firstName": "Maria",
    "lastName": "Santos",
    "fullName": "Maria Santos",
    "cpf": "987.654.321-00",
    "dataNascimento": "2001-03-20T00:00:00.000Z",
    "role": 0,
    "isActive": true,
    "createdAt": "2024-01-14T10:30:00.000Z",
    "isAdmin": false,
    "isTeacher": false,
    "isStudent": true
  }
}
```

**Resposta de Erro (401):**
```json
{
  "message": "Email ou senha incorretos"
}
```

---

### **3. OBTER PERFIL DO USUÁRIO**
```http
GET https://eduquiz-back-end-production.up.railway.app/api/Auth/profile
```

**Headers:**
```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "Content-Type": "application/json"
}
```

**Resposta de Sucesso (200):**
```json
{
  "id": 1,
  "username": "maria.aluna",
  "email": "maria@email.com",
  "firstName": "Maria",
  "lastName": "Santos",
  "fullName": "Maria Santos",
  "cpf": "987.654.321-00",
  "dataNascimento": "2001-03-20T00:00:00.000Z",
  "role": 0,
  "isActive": true,
  "createdAt": "2024-01-14T10:30:00.000Z",
  "isAdmin": false,
  "isTeacher": false,
  "isStudent": true
}
```

---

### **4. ATUALIZAR PERFIL**
```http
PUT https://eduquiz-back-end-production.up.railway.app/api/Auth/profile
```

**Headers:**
```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "Content-Type": "application/json"
}
```

**Body:**
```json
{
  "firstName": "Maria",
  "lastName": "Santos Silva",
  "email": "maria.santos@email.com",
  "cpf": "987.654.321-00",
  "dataNascimento": "2001-03-20T00:00:00.000Z"
}
```

---

### **5. ALTERAR SENHA**
```http
PUT https://eduquiz-back-end-production.up.railway.app/api/Auth/change-password
```

**Headers:**
```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "Content-Type": "application/json"
}
```

**Body:**
```json
{
  "currentPassword": "senha123",
  "newPassword": "novaSenha456"
}
```

**Resposta de Sucesso (200):**
```json
{
  "message": "Senha alterada com sucesso"
}
```

---

## 🎯 **CÓDIGOS DE FUNÇÃO (ROLE)**

| Valor | String | Descrição |
|-------|--------|-----------|
| `"0"` | `"Aluno"` | Estudante |
| `"1"` | `"Professor"` | Professor/Instrutor |
| `"2"` | `"TecnicoFutebol"` | Técnico de Futebol (Admin) |

---

## ⚠️ **CÓDIGOS DE STATUS HTTP**

| Código | Significado | Quando Ocorre |
|--------|-------------|---------------|
| `200` | OK | Operação realizada com sucesso |
| `400` | Bad Request | Dados inválidos ou usuário já existe |
| `401` | Unauthorized | Token inválido ou credenciais incorretas |
| `403` | Forbidden | Usuário não tem permissão |
| `404` | Not Found | Usuário não encontrado |
| `500` | Internal Server Error | Erro interno do servidor |

---

## 🔧 **IMPLEMENTAÇÃO EM REACT**

### **1. Configuração do Axios**

```javascript
// services/api.js
import axios from 'axios';

const API_BASE_URL = 'https://eduquiz-back-end-production.up.railway.app';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token automaticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### **2. Serviço de Autenticação**

```javascript
// services/authService.js
import api from './api';

export const authService = {
  // Registrar usuário
  async register(userData) {
    try {
      const response = await api.post('/api/Auth/register', userData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao registrar usuário');
    }
  },

  // Fazer login
  async login(email, password) {
    try {
      const response = await api.post('/api/Auth/login', { email, password });
      
      // Salvar token e dados do usuário
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao fazer login');
    }
  },

  // Obter perfil do usuário
  async getProfile() {
    try {
      const response = await api.get('/api/Auth/profile');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao obter perfil');
    }
  },

  // Atualizar perfil
  async updateProfile(profileData) {
    try {
      const response = await api.put('/api/Auth/profile', profileData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao atualizar perfil');
    }
  },

  // Alterar senha
  async changePassword(currentPassword, newPassword) {
    try {
      const response = await api.put('/api/Auth/change-password', {
        currentPassword,
        newPassword
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao alterar senha');
    }
  },

  // Fazer logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Verificar se usuário está logado
  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  // Obter usuário atual
  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};
```

### **3. Hook de Autenticação**

```javascript
// hooks/useAuth.js
import { useState, useEffect, createContext, useContext } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há usuário logado ao carregar a aplicação
    const currentUser = authService.getCurrentUser();
    if (currentUser && authService.isAuthenticated()) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await authService.login(email, password);
      setUser(response.user);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authService.register(userData);
      setUser(response.user);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      const updatedUser = await authService.updateProfile(profileData);
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```

### **4. Componente de Login**

```jsx
// components/Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      // Redirecionar para dashboard
      window.location.href = '/dashboard';
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login - EduQuiz</h2>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="seu@email.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Sua senha"
            minLength="6"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="login-button"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
};

export default Login;
```

### **5. Componente de Registro**

```jsx
// components/Register.jsx
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    cpf: '',
    dataNascimento: '',
    role: '0' // Aluno por padrão
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register(formData);
      // Redirecionar para dashboard
      window.location.href = '/dashboard';
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Cadastro - EduQuiz</h2>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">Nome:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              maxLength="50"
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Sobrenome:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              maxLength="50"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            maxLength="50"
            placeholder="usuario123"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            maxLength="100"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="cpf">CPF (opcional):</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              maxLength="14"
              placeholder="000.000.000-00"
            />
          </div>

          <div className="form-group">
            <label htmlFor="dataNascimento">Data de Nascimento (opcional):</label>
            <input
              type="date"
              id="dataNascimento"
              name="dataNascimento"
              value={formData.dataNascimento}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="role">Tipo de Usuário:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="0">Aluno</option>
            <option value="1">Professor</option>
            <option value="2">Técnico de Futebol</option>
          </select>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="register-button"
        >
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
};

export default Register;
```

### **6. Proteção de Rotas**

```jsx
// components/ProtectedRoute.jsx
import React from 'react';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!isAuthenticated) {
    return <div>Você precisa estar logado para acessar esta página.</div>;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <div>Você não tem permissão para acessar esta página.</div>;
  }

  return children;
};

export default ProtectedRoute;
```

### **7. App.js Principal**

```jsx
// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/" element={<Login />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
```

---

## 📋 **INSTALAÇÃO DE DEPENDÊNCIAS**

```bash
npm install axios react-router-dom
```

---

## 🎨 **EXEMPLO DE CSS**

```css
/* styles/auth.css */
.login-container,
.register-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-row {
  display: flex;
  gap: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.login-button,
.register-button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover,
.register-button:hover {
  background-color: #0056b3;
}

.login-button:disabled,
.register-button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
  border: 1px solid #f5c6cb;
}
```

---

## ✅ **TESTE DOS ENDPOINTS**

### **Usuário Técnico Padrão:**
- **Email:** `tecnico@eduquiz.com`
- **Senha:** `admin123`
- **Função:** Técnico de Futebol (Admin)

### **Exemplo de Teste com cURL:**

```bash
# Login
curl -X POST "https://eduquiz-back-end-production.up.railway.app/api/Auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "tecnico@eduquiz.com",
    "password": "admin123"
  }'

# Registro de novo usuário
curl -X POST "https://eduquiz-back-end-production.up.railway.app/api/Auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "teste.aluno",
    "email": "teste@email.com",
    "password": "senha123",
    "firstName": "Teste",
    "lastName": "Aluno",
    "role": "0"
  }'
```

---

## 🚀 **PRÓXIMOS PASSOS**

1. **Implementar Refresh Token** para renovação automática
2. **Adicionar validações** no frontend
3. **Implementar recuperação de senha**
4. **Adicionar loading states** e feedback visual
5. **Implementar testes unitários**

---

**Documento criado para integração da API EduQuiz com React!** 🎉
