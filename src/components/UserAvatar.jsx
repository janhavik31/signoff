import React from 'react';

const getInitials = (name) => {
  if (!name) return 'U';
  const parts = name.trim().split(' ');
  if (parts.length === 0) return 'U';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

const sizeClasses = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl'
};

const UserAvatar = ({ name, size = 'md' }) => {
  const initials = getInitials(name);
  const sizeClass = sizeClasses[size] || sizeClasses.md;

  return (
    <div 
      className={`${sizeClass} rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold`}
    >
      {initials}
    </div>
  );
};

export default UserAvatar; 