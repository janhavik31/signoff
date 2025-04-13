import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Header = () => {
  const { teamName } = useParams();
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const dropdownRef = useRef(null);
  const employeeName = localStorage.getItem('userName') || 'Employee';
  
  const formattedTeamName = teamName 
    ? teamName.charAt(0).toUpperCase() + teamName.slice(1) 
    : 'Team';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('empId');
    navigate('/signin');
  };

  return (
    <header className="bg-white shadow-sm w-full py-3">
      <div className="w-full px-4 sm:px-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              {formattedTeamName} Team Sign-offs
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Track and manage all feature approvals
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="font-medium text-gray-900">{employeeName}</p>
              <p className="text-xs text-gray-500">Team Member</p>
            </div>
            
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setShowLogout(!showLogout)}
                className="group focus:outline-none transition-all duration-150"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24"
                  className={`w-13 h-13 p-2 transition-colors duration-200 ${showLogout ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'}`}
                  fill="currentColor"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
              </button>

              {showLogout && (
                <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    {/* Power icon from Flaticon */}
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24"
                      className="w-4 h-4"
                      fill="currentColor"
                    >
                      <path d="M12 3c-.6 0-1 .4-1 1v8c0 .6.4 1 1 1s1-.4 1-1V4c0-.6-.4-1-1-1zm6.5 2.5c-.3-.3-.8-.3-1.1 0-.3.3-.3.8 0 1.1 1.5 1.5 2.4 3.6 2.4 5.9 0 4.4-3.6 8-8 8s-8-3.6-8-8c0-2.3.9-4.4 2.4-5.9.3-.3.3-.8 0-1.1-.3-.3-.8-.3-1.1 0C4.1 6.8 3 9.3 3 12c0 5 4 9 9 9s9-4 9-9c0-2.7-1.1-5.2-2.5-7z"/>
                    </svg>
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;