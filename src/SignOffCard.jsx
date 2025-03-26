import React from 'react';

const SignOffCard = ({ signOff }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'bg-purple-100 text-purple-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-5">
        <div className="text-sm text-gray-500 mb-1">{signOff.sprintId}</div>
        <h3 className="text-xl font-bold mb-3">{signOff.featureName}</h3>
        
        <div className="mb-3">
          <div className="text-sm font-medium text-gray-500 mb-1">Goal</div>
          <p className="text-gray-900">{signOff.sprintGoal}</p>
        </div>
        
        <div className="mb-3">
          <div className="text-sm font-medium text-gray-500 mb-1">Status</div>
          <span className={`px-3 py-1 inline-block rounded-full text-sm font-medium ${getStatusColor(signOff.status)}`}>
            {signOff.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignOffCard;