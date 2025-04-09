import React from 'react';
import { useNavigate } from 'react-router-dom';

const TeamSectionCard = ({ teamName }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/dashboard/${teamName.toLowerCase()}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer max-w-sm w-full bg-white border border-black rounded-lg shadow-md p-5 transform transition duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <div>
        <h5 className="mb-4 text-2xl font-bold tracking-tight text-blue-900 dark:text-white text-center">
          {teamName} Dashboard
        </h5>
        <p className="mb-3 font-medium text-gray-700 dark:text-gray-300 text-center">
          Click to view sign-offs and progress for the {teamName} team.
        </p>
        <div className="flex justify-center">
          <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Go to Dashboard
            <svg className="w-4 h-4 ml-2 rtl:rotate-180" fill="none" viewBox="0 0 14 10" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TeamSectionCard;
