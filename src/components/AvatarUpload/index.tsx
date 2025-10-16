import React, { useState, useRef } from 'react';
import { Camera, User, X } from 'lucide-react';
import { avatarService } from '../../services/avatarService';
import { useAuth } from '../../hooks/userAuth';

interface AvatarUploadProps {
  currentAvatar?: string;
  onAvatarUpdate?: (avatarUrl: string) => void;
  size?: 'sm' | 'md' | 'lg';
  showUploadButton?: boolean;
  className?: string;
}

export const AvatarUpload: React.FC<AvatarUploadProps> = ({
  currentAvatar,
  onAvatarUpdate,
  size = 'md',
  showUploadButton = true,
  className = ''
}) => {
  const { user, updateProfile } = useAuth();
  const [preview, setPreview] = useState<string | null>(currentAvatar || null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  const buttonSizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);

    // Validar arquivo
    const validation = avatarService.validateImageFile(file);
    if (!validation.isValid) {
      setError(validation.error || 'Arquivo inválido');
      return;
    }

    // Preview local
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Upload
    await uploadAvatar(file);
  };

  const uploadAvatar = async (file: File) => {
    setUploading(true);
    setError(null);
    
    try {
      const avatarUrl = await avatarService.uploadAvatar(file);
      
      // Atualizar perfil do usuário com a nova URL do avatar
      await updateProfile({ avatarUrl });
      
      // Atualizar preview com a URL completa
      const fullAvatarUrl = avatarService.getAvatarUrl(avatarUrl);
      setPreview(fullAvatarUrl);
      
      // Callback para componente pai
      if (onAvatarUpdate) {
        onAvatarUpdate(fullAvatarUrl || avatarUrl);
      }
      
    } catch (error: any) {
      console.error('Erro no upload do avatar:', error);
      setError(error.response?.data?.message || 'Erro no upload do avatar');
      
      // Reverter preview em caso de erro
      setPreview(currentAvatar || null);
    } finally {
      setUploading(false);
    }
  };

  const removeAvatar = async () => {
    try {
      await updateProfile({ avatarUrl: '' });
      setPreview(null);
      
      if (onAvatarUpdate) {
        onAvatarUpdate('');
      }
    } catch (error) {
      console.error('Erro ao remover avatar:', error);
      setError('Erro ao remover avatar');
    }
  };

  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return 'U';
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Avatar Container */}
      <div className={`${sizeClasses[size]} rounded-full overflow-visible border-2 border-gray-200 bg-gray-100 flex items-center justify-center relative`}>
        {preview ? (
          <img 
            src={preview} 
            alt="Avatar" 
            className="w-full h-full object-cover"
            onError={() => setPreview(null)} // Fallback para iniciais se imagem falhar
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <User className={`${size === 'sm' ? 'w-6 h-6' : size === 'md' ? 'w-8 h-8' : 'w-10 h-10'} text-gray-500`} />
          </div>
        )}
        
        {/* Iniciais como fallback */}
        {!preview && (
          <div className="absolute inset-0 flex items-center justify-center bg-blue-100 text-blue-700 font-semibold text-lg rounded-full">
            {getInitials(user?.firstName, user?.lastName)}
          </div>
        )}
        
        {/* Botão de Upload */}
        {showUploadButton && (
          <button 
            className={`absolute bottom-0 right-0 ${buttonSizeClasses[size]} bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition-colors transform translate-x-1 translate-y-1 z-10`}
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            title="Alterar foto"
          >
            {uploading ? (
              <div className="animate-spin rounded-full border-2 border-white border-t-transparent w-4 h-4" />
            ) : (
              <Camera className="w-4 h-4" />
            )}
          </button>
        )}

        {/* Botão de Remover */}
        {preview && showUploadButton && (
          <button
            className={`absolute top-0 right-0 ${buttonSizeClasses[size]} bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-lg transition-colors transform translate-x-1 -translate-y-1 z-10`}
            onClick={removeAvatar}
            title="Remover foto"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      
      {/* Input de Arquivo */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      {/* Mensagem de Erro */}
      {error && (
        <div className="absolute top-full left-0 mt-2 p-2 bg-red-100 border border-red-300 rounded text-red-700 text-sm whitespace-nowrap z-10">
          {error}
        </div>
      )}
    </div>
  );
};
