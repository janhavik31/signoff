import React from 'react';
import TeamSectionCard from './teamSelectionComponent';

const TeamSelection = () => {
  const teams = ['Waggle', 'R180', 'M180', 'ED'];

  return (
    <div className="min-h-screen flex flex-col justify-start items-center p-6">
      <h1 className="text-4xl font-bold mb-12 mt-8 text-center text-blue-900">Select a Team</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
        {teams.map(team => (
          <TeamSectionCard key={team} teamName={team} />
        ))}
      </div>
    </div>
  );
};

export default TeamSelection;


