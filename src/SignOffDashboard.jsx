import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from './firebase';
import SignOffCard from './SignOffCard';
import SignOffForm from './SignOffForm';
import { Search, Plus, X } from 'lucide-react';

const SignOffDashboard = () => {
  const [signOffs, setSignOffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchSignOffs = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'signOffs'));
        const fetchedData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setSignOffs(fetchedData);
      } catch (error) {
        console.error("Error fetching sign-offs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSignOffs();
  }, []);

  const filteredSignOffs = signOffs.filter(signOff => {
    const matchesSearch = signOff.featureName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || signOff.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        {/* Search Input */}
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-full md:w-1/3">
          <Search className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by feature name..."
            className="flex-1 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Dropdown */}
        <div className="w-full md:w-auto">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-auto"
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Add New Button */}
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <Plus className="w-4 h-4" />
          Add New
        </button>
      </div>

      {/* Cards Grid */}
      {loading ? (
        <div className="text-center mt-10">Loading sign-offs...</div>
      ) : filteredSignOffs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSignOffs.map((signOff) => (
            <SignOffCard key={signOff.id} signOff={signOff} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10">No sign-offs found.</div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowForm(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <SignOffForm onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SignOffDashboard;
