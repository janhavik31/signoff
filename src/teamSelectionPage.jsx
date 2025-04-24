import React from 'react';
import TeamSectionCard from './teamSelectionComponent';
import UserAvatar from './components/UserAvatar';

const TeamSelection = () => {
  const teams = ['Waggle', 'R180', 'M180', 'ED'];
  const userName = localStorage.getItem('userName') || 'User';

  return (
    <div className="min-h-screen flex flex-col justify-start items-center p-6">
      {/* Header with user info in top right */}
      <div className="w-full flex justify-end items-center mb-12">
        <div className="flex items-center gap-4">
          <span className="text-lg font-medium text-gray-700">{userName}</span>
          <UserAvatar name={userName} size="md" />
        </div>
      </div>

      {/* Centered title */}
      <h1 className="text-4xl font-bold text-blue-900 mb-12">Select a Team</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
        {teams.map(team => (
          <TeamSectionCard key={team} teamName={team} />
        ))}
      </div>
    </div>
  );
};

export default TeamSelection;
