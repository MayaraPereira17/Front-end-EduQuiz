import { useState, useEffect } from "react";
import { UserPlus, GraduationCap, CircleUser, Edit, Trash2 } from "lucide-react";
import { tecnicoService, type AlunoRankingDTO, type ProfessorDTO } from "../../../../services/tecnicoService";
import { getInitialLetter } from "../../../../utils/getInitialLetters";
import { EditUserModal } from "./EditUserModal";
import { DeleteUserModal } from "./DeleteUserModal";
import { EditProfessorModal } from "./EditProfessorModal";

interface UserListProps {
  onOpenRegister: () => void;
}

export function UserList({ onOpenRegister }: UserListProps) {
  const [alunos, setAlunos] = useState<AlunoRankingDTO[]>([]);
  const [professores, setProfessores] = useState<ProfessorDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<AlunoRankingDTO | null>(null);
  const [editingProfessor, setEditingProfessor] = useState<ProfessorDTO | null>(null);
  const [deletingUser, setDeletingUser] = useState<AlunoRankingDTO | null>(null);
  const [deletingProfessor, setDeletingProfessor] = useState<ProfessorDTO | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const loadAlunos = async () => {
    try {
      const response = await tecnicoService.getAlunos();
      setAlunos(response.alunos || []);
    } catch (error: any) {
      throw new Error(error.message || "Erro ao carregar alunos");
    }
  };

  const loadProfessores = async () => {
    try {
      const response = await tecnicoService.getProfessores();
      setProfessores(response.professores || []);
    } catch (error: any) {
      // Se houver erro, apenas não carrega professores
      setProfessores([]);
    }
  };

  const loadAllUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      // Carregar alunos e professores em paralelo
      await Promise.allSettled([loadAlunos(), loadProfessores()]);
    } catch (error: any) {
      setError(error.message || "Erro ao carregar usuários");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllUsers();
  }, []);

  const handleEditUser = (aluno: AlunoRankingDTO) => {
    setEditingUser(aluno);
  };

  const handleEditProfessor = (professor: ProfessorDTO) => {
    setEditingProfessor(professor);
  };

  const handleDeleteUser = (aluno: AlunoRankingDTO) => {
    setDeletingUser(aluno);
  };

  const handleDeleteProfessor = (professor: ProfessorDTO) => {
    setDeletingProfessor(professor);
  };

  const handleConfirmDelete = async () => {
    if (deletingUser) {
      setDeleteLoading(true);
      try {
        await tecnicoService.deleteAluno(deletingUser.id);
        await loadAllUsers();
        setDeletingUser(null);
        setDeleteLoading(false);
      } catch (error: any) {
        setError(error.message || "Erro ao excluir aluno. Tente novamente.");
        setDeleteLoading(false);
      }
    } else if (deletingProfessor) {
      setDeleteLoading(true);
      try {
        await tecnicoService.deleteProfessor(deletingProfessor.id);
        await loadAllUsers();
        setDeletingProfessor(null);
        setDeleteLoading(false);
      } catch (error: any) {
        setError(error.message || "Erro ao excluir professor. Tente novamente.");
        setDeleteLoading(false);
      }
    }
  };

  const handleUserUpdated = async () => {
    await loadAllUsers();
    setEditingUser(null);
  };

  const handleProfessorUpdated = async () => {
    await loadAllUsers();
    setEditingProfessor(null);
  };

  if (loading) {
    return (
      <div className="px-4 sm:px-6 py-6 sm:py-8">
        <div className="text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-300 rounded-full mx-auto mb-4 animate-pulse"></div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Carregando usuários...</h3>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 sm:px-6 py-6 sm:py-8">
        <div className="text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-500 rounded-full mx-auto mb-4"></div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Erro ao carregar usuários</h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4">{error}</p>
          <button 
            onClick={loadAllUsers}
            className="bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-700 text-sm sm:text-base"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 h-full overflow-auto bg-[#EBF1F4] px-4 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 md:py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header com Botão */}
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">Usuários</h2>
            <p className="text-sm sm:text-base text-gray-600">
              Gerencie alunos e professores cadastrados no sistema
            </p>
          </div>
          <button
            onClick={onOpenRegister}
            className="flex items-center gap-2 bg-[#3182BD] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base w-full sm:w-auto justify-center"
          >
            <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
            Cadastrar Usuário
          </button>
        </div>

        {/* Lista de Professores */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
              Professores ({professores.length})
            </h3>
          </div>
          
          {professores.length === 0 ? (
            <div className="bg-white rounded-lg p-6 sm:p-8 text-center border border-gray-200">
              <GraduationCap className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm sm:text-base text-gray-600">Nenhum professor cadastrado</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {professores.map((professor) => (
                <div
                  key={professor.id}
                  className="bg-white rounded-lg p-4 sm:p-5 md:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold text-base sm:text-lg">
                        {getInitialLetter(professor.nome)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                        {professor.nome}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">{professor.email}</p>
                    </div>
                  </div>
                  <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                    {professor.instituicao && (
                      <div className="text-xs sm:text-sm text-gray-600 truncate">
                        <span className="font-medium">Instituição:</span> {professor.instituicao}
                      </div>
                    )}
                    {professor.areaEspecializacao && (
                      <div className="text-xs sm:text-sm text-gray-600 truncate">
                        <span className="font-medium">Área:</span> {professor.areaEspecializacao}
                      </div>
                    )}
                    {professor.totalQuizzes !== undefined && (
                      <div className="text-xs sm:text-sm text-gray-600">
                        <span className="font-medium">Quizzes:</span> {professor.totalQuizzes}
                      </div>
                    )}
                  </div>
                  
                  {/* Botões de Ação */}
                  <div className="flex gap-2 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
                    <button
                      onClick={() => handleEditProfessor(professor)}
                      className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteProfessor(professor)}
                      className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Lista de Alunos */}
        <div>
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <CircleUser className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
              Alunos ({alunos.length})
            </h3>
          </div>
          
          {alunos.length === 0 ? (
            <div className="bg-white rounded-lg p-6 sm:p-8 text-center border border-gray-200">
              <CircleUser className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm sm:text-base text-gray-600">Nenhum aluno cadastrado</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {alunos.map((aluno) => (
                <div
                  key={aluno.id}
                  className="bg-white rounded-lg p-4 sm:p-5 md:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-bold text-base sm:text-lg">
                        {getInitialLetter(aluno.nome)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                        {aluno.nome}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">{aluno.email}</p>
                    </div>
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-gray-600">Idade: {aluno.idade} anos</span>
                      <span className="text-gray-600">#{aluno.posicao}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-gray-600">Quizzes: {aluno.totalQuizzes}</span>
                      <span className="text-blue-600 font-semibold">Score: {aluno.scoreGeral}%</span>
                    </div>
                  </div>
                  
                  {/* Botões de Ação */}
                  <div className="flex gap-2 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
                    <button
                      onClick={() => handleEditUser(aluno)}
                      className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteUser(aluno)}
                      className="flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal de Edição de Aluno */}
      <EditUserModal
        isOpen={editingUser !== null}
        onClose={() => setEditingUser(null)}
        user={editingUser}
        onUserUpdated={handleUserUpdated}
      />

      {/* Modal de Edição de Professor */}
      <EditProfessorModal
        isOpen={editingProfessor !== null}
        onClose={() => setEditingProfessor(null)}
        professor={editingProfessor}
        onProfessorUpdated={handleProfessorUpdated}
      />

      {/* Modal de Exclusão */}
      <DeleteUserModal
        isOpen={deletingUser !== null || deletingProfessor !== null}
        onClose={() => {
          setDeletingUser(null);
          setDeletingProfessor(null);
        }}
        userName={deletingUser?.nome || deletingProfessor?.nome || ""}
        onConfirm={handleConfirmDelete}
        loading={deleteLoading}
      />
    </div>
  );
}

