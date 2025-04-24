import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserAvatar from './components/UserAvatar';

const TeamSelection = () => {
  // ... existing state and effects ...

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <UserAvatar name={userName} size="lg" />
        </div>
        <h2 className="text-2xl font-semibold text-center mb-6">Welcome{userName ? `, ${userName}` : ''}</h2>
        
        {/* Rest of the component remains the same ... */}
      </div>
    </div>
  );
};

export default TeamSelection; 