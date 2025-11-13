import React from 'react';
import { useAuth } from '../../../../../../hooks/userAuth';

interface AvatarProps {
  currentAvatar?: string;
  size?: 'sm' | 'md' | 'lg';
  showUploadButton?: boolean;
  showColorPicker?: boolean;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  currentAvatar: _currentAvatar,
  size = 'md',
  showUploadButton: _showUploadButton = false,
  showColorPicker: _showColorPicker = false,
  className = ''
}) => {
  const { user } = useAuth();

  const sizeClasses = {
    sm: 'w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16',
    md: 'w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24',
    lg: 'w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32'
  };

  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return 'U';
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  const backgroundColor = user?.avatarColor || '#3B82F6';

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Avatar Container - Sempre mostra iniciais */}
      <div className={`${sizeClasses[size]} rounded-full overflow-hidden border-2 border-gray-200 flex items-center justify-center relative`}>
        {/* Avatar com cor personalizada */}
        <div 
          className="absolute inset-0 flex items-center justify-center font-semibold text-white text-xs sm:text-sm md:text-base lg:text-lg rounded-full"
          style={{ backgroundColor }}
        >
          {getInitials(user?.firstName, user?.lastName)}
        </div>
      </div>
    </div>
  );
};
