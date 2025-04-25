import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { firestore } from './firebase';
import SignOffCard from './SignOffCard';
import SignOffForm from './SignOffForm';
import { Search, Plus, ChevronDown } from 'lucide-react';
import { doc, deleteDoc } from 'firebase/firestore';
import UserAvatar from './components/UserAvatar';

const SignOffDashboard = () => {
  const { teamName } = useParams();
  const [signOffs, setSignOffs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingSignOff, setEditingSignOff] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const userName = localStorage.getItem('userName') || 'User';

  useEffect(() => {
    const q = query(
      collection(firestore, 'signOffs'),
      where('teamName', '==', teamName.toLowerCase())
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setSignOffs(items);
    });

    return () => unsubscribe();
  }, [teamName]);

  const handleEdit = (signOff) => {
    setEditingSignOff(signOff);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(firestore, 'signOffs', id));
    } catch (error) {
      console.error('Error deleting sign-off:', error);
    }
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setEditingSignOff(null);
  };

  const filteredSignOffs = signOffs.filter((signOff) => {
    const matchesSearch =
      signOff.featureName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      signOff.summary?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      signOff.issueId?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'All' || signOff.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const statusOptions = ['All', 'In Progress', 'Completed', 'Blocked'];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">Sprint Sign-Off Dashboard</h1>
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <span className="text-sm font-medium">{userName}</span>
                <span className="text-gray-300 mx-2">|</span>
                <span className="text-sm text-gray-500">{teamName} Team</span>
              </div>
              <UserAvatar name={userName} />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search features or goals..."
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative">
              <button 
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="px-4 py-2 text-sm border border-gray-200 rounded-lg inline-flex items-center gap-2 hover:bg-gray-50"
              >
                {filterStatus}
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
              
              {showFilterDropdown && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                  {statusOptions.map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setFilterStatus(status);
                        setShowFilterDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm ${
                        filterStatus === status
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSignOffs.map((signOff) => (
            <SignOffCard
              key={signOff.id}
              signOffs={signOff}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {/* Floating Action Button */}
        <button
          onClick={() => setShowForm(true)}
          className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="w-5 h-5" />
        </button>

        {/* Form Modal */}
        {showForm && (
          <div 
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ 
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)'
            }}
          >
            <div className="absolute inset-0 bg-gray-500/20 transition-opacity"></div>
            <div 
              className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative transform transition-all duration-300 ease-in-out"
              style={{ 
                animation: 'modal-pop 0.3s ease-out forwards'
              }}
            >
              <SignOffForm
                onSubmit={handleFormSubmit}
                onCancel={() => {
                  setShowForm(false);
                  setEditingSignOff(null);
                }}
                initialData={editingSignOff}
                team={teamName}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );  
};

export default SignOffDashboard;
