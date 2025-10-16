import { useAuth } from "../../hooks/userAuth";
import { getRoleDisplayName } from "../../utils/authRedirect";

export function AdminDashboard() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">EduQuiz - Administração</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Olá, {user?.firstName} ({getRoleDisplayName(user?.role || "")})
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Painel de Administração
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Estatísticas */}
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-blue-900">Usuários</h3>
                  <p className="text-3xl font-bold text-blue-600 mt-2">0</p>
                  <p className="text-sm text-blue-700">Total de usuários cadastrados</p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-green-900">Quizzes</h3>
                  <p className="text-3xl font-bold text-green-600 mt-2">0</p>
                  <p className="text-sm text-green-700">Quizzes criados</p>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-purple-900">Atividades</h3>
                  <p className="text-3xl font-bold text-purple-600 mt-2">0</p>
                  <p className="text-sm text-purple-700">Atividades realizadas</p>
                </div>
              </div>

              {/* Funcionalidades */}
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Funcionalidades Administrativas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium text-gray-900">Gerenciar Usuários</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Visualizar, editar e gerenciar usuários do sistema
                    </p>
                    <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
                      Acessar
                    </button>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium text-gray-900">Relatórios</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Gerar relatórios de uso e performance
                    </p>
                    <button className="mt-3 bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700">
                      Gerar
                    </button>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium text-gray-900">Configurações</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Configurações gerais do sistema
                    </p>
                    <button className="mt-3 bg-gray-600 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-700">
                      Configurar
                    </button>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium text-gray-900">Suporte</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Central de suporte e tickets
                    </p>
                    <button className="mt-3 bg-purple-600 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-700">
                      Acessar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
