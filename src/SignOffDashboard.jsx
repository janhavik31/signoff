import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Plus, X } from 'lucide-react';
import SignOffCard from './SignOffCard';
import SignOffForm from './SignOffForm';

const SignOffDashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sprintFilter, setSprintFilter] = useState('All Sprints');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [showMoreCards, setShowMoreCards] = useState(false);
  const [modalAnimation, setModalAnimation] = useState(''); // For animation states
  
  // Sample data
  const [signOffs, setSignOffs] = useState([
    {
      id: 1,
      sprintId: 'SP-2025-01',
      featureName: 'User Authentication',
      sprintGoal: 'Implement secure login system with 2FA',
      status: 'Completed',
      checkpoints: { qeValidation: true, devValidation: true },
      timestamp: '2025-03-01'
    },
    {
      id: 2,
      sprintId: 'SP-2025-01',
      featureName: 'Dashboard Analytics',
      sprintGoal: 'Create data visualization components',
      status: 'Pending',
      checkpoints: { qeValidation: true, devValidation: false },
      timestamp: '2025-03-05'
    },
    {
      id: 3,
      sprintId: 'SP-2025-02',
      featureName: 'Payment Integration',
      sprintGoal: 'Connect with payment gateway APIs',
      status: 'In Progress',
      checkpoints: { qeValidation: false, devValidation: false },
      timestamp: '2025-03-08'
    },
    {
      id: 4,
      sprintId: 'SP-2025-02',
      featureName: 'User Profile',
      sprintGoal: 'Build user profile management screens',
      status: 'Completed',
      checkpoints: { qeValidation: true, devValidation: true },
      timestamp: '2025-03-02'
    }
  ]);
  
  // Handle smooth modal appearance and disappearance
  useEffect(() => {
    if (showForm) {
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
      setModalAnimation('fade-in');
    } else {
      document.body.style.overflow = '';
      setModalAnimation('fade-out');
    }
  }, [showForm]);

  // Close modal with animation
  const closeModalWithAnimation = () => {
    setModalAnimation('fade-out');
    setTimeout(() => {
      setShowForm(false);
    }, 300); // Match the animation duration
  };
  
  // Filter logic
  const filteredSignOffs = signOffs.filter(signOff => {
    const matchesSearch = 
      searchQuery === '' || 
      signOff.featureName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      signOff.sprintGoal.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesSprint = 
      sprintFilter === 'All Sprints' || 
      signOff.sprintId === sprintFilter;
      
    const matchesStatus = 
      statusFilter === 'All Status' || 
      signOff.status === statusFilter;
      
    return matchesSearch && matchesSprint && matchesStatus;
  });
  
  // Get unique sprint IDs for filter
  const sprintOptions = ['All Sprints', ...new Set(signOffs.map(item => item.sprintId))];
  const statusOptions = ['All Status', 'Completed', 'Pending', 'In Progress'];
  
  // Handle form submission
  const handleFormSubmit = (formData) => {
    const newEntry = {
      id: signOffs.length + 1,
      ...formData,
      timestamp: new Date().toISOString().slice(0, 10)
    };
    
    setSignOffs([...signOffs, newEntry]);
    closeModalWithAnimation();
  };

  // Display limited cards and show more on button click
  const displayedSignOffs = showMoreCards 
    ? filteredSignOffs 
    : filteredSignOffs.slice(0, 2);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold">Sprint Sign-Off Dashboard</h1>
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-grow md:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search features or goals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Sprint Filter */}
          <div className="relative w-full md:w-64">
            <select
              value={sprintFilter}
              onChange={(e) => setSprintFilter(e.target.value)}
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {sprintOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
          </div>
          
          {/* Status Filter */}
          <div className="relative w-full md:w-64">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statusOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
          </div>
        </div>
        
        {/* Cards grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {displayedSignOffs.map(signOff => (
            <SignOffCard key={signOff.id} signOff={signOff} />
          ))}
        </div>
        
        {/* View More button */}
        {filteredSignOffs.length > 2 && !showMoreCards && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowMoreCards(true)}
              className="px-6 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              View More
            </button>
          </div>
        )}
        
        {/* Floating Add Button */}
        <button
          onClick={() => setShowForm(true)}
          className="fixed bottom-8 right-8 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
          aria-label="Add new sign-off"
        >
          <Plus size={24} />
        </button>
      </main>
      
      {/* Improved Modal for form with animations */}
      {showForm && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
            modalAnimation === 'fade-in' ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Modal backdrop with blur effect */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={closeModalWithAnimation}
          ></div>
          
          {/* Modal content */}
          <div 
            className={`bg-white rounded-lg shadow-xl w-full max-w-2xl relative transition-transform duration-300 max-h-screen ${
              modalAnimation === 'fade-in' ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
            }`}
          >
            {/* Modal header */}
            <div className="p-4 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white rounded-t-lg z-10">
              <h2 className="text-xl font-semibold">New Sign-Off Entry</h2>
              <button
                onClick={closeModalWithAnimation}
                className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full p-1"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Modal body with scrollable content */}
            <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 70px)' }}>
              <SignOffForm 
                onSubmit={handleFormSubmit} 
                onCancel={closeModalWithAnimation} 
              />
            </div>
          </div>
        </div>
      )}

      {/* CSS for modal animations */}
      <style jsx>{`
        /* Add CSS styles for animation classes */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .fade-in {
          animation: fadeIn 0.3s ease forwards;
        }
        
        .fade-out {
          animation: fadeIn 0.3s ease backwards reverse;
        }
      `}</style>
    </div>
  );
};

export default SignOffDashboard;