import React, { useState } from 'react';
import { Palette } from 'lucide-react';
import { useAuth } from '../../hooks/userAuth';

interface AvatarColorPickerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onColorChange?: (color: string) => void;
}

export const AvatarColorPicker: React.FC<AvatarColorPickerProps> = ({
  size = 'lg',
  className = '',
  onColorChange
}) => {
  const { user } = useAuth();
  const [backgroundColor, setBackgroundColor] = useState(user?.avatarColor || '#3B82F6'); // Cor do usuário ou azul padrão
  const [showColorPalette, setShowColorPalette] = useState(false);

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

  const colorOptions = [
    '#3B82F6', // Azul
    '#10B981', // Verde
    '#F59E0B', // Amarelo
    '#EF4444', // Vermelho
    '#8B5CF6', // Roxo
    '#06B6D4', // Ciano
    '#F97316', // Laranja
    '#84CC16', // Lima
    '#EC4899', // Rosa
    '#6B7280', // Cinza
  ];

  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return 'U';
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  const handleColorSelect = (color: string) => {
    setBackgroundColor(color);
    setShowColorPalette(false);
    if (onColorChange) {
      onColorChange(color);
    }
  };

  // Atualizar cor quando o usuário mudar
  React.useEffect(() => {
    if (user?.avatarColor) {
      setBackgroundColor(user.avatarColor);
    }
  }, [user?.avatarColor]);

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Avatar Container */}
      <div className={`${sizeClasses[size]} rounded-full overflow-visible border-2 border-gray-200 flex items-center justify-center relative`}>
        {/* Avatar com cor personalizada */}
        <div 
          className="absolute inset-0 flex items-center justify-center font-semibold text-white text-lg rounded-full"
          style={{ backgroundColor }}
        >
          {getInitials(user?.firstName, user?.lastName)}
        </div>

        {/* Botão de seleção de cor */}
        <button
          className={`absolute bottom-0 right-0 ${buttonSizeClasses[size]} bg-white hover:bg-gray-100 text-gray-600 rounded-full flex items-center justify-center shadow-lg transition-colors transform translate-x-1 translate-y-1 z-10 border border-gray-300`}
          onClick={() => setShowColorPalette(!showColorPalette)}
          title="Escolher cor"
        >
          <Palette className="w-4 h-4" />
        </button>

        {/* Paleta de cores */}
        {showColorPalette && (
          <div className="absolute bottom-full right-0 mb-2 p-3 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
            <div className="grid grid-cols-5 gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${
                    backgroundColor === color ? 'border-gray-800' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorSelect(color)}
                  title={color}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
