import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { firestore } from './firebase';
import SignOffCard from './SignOffCard';
import SignOffForm from './SignOffForm';
import { Search, Plus } from 'lucide-react';
import { doc, deleteDoc } from 'firebase/firestore';
import Header from './components/Header';


const SignOffDashboard = () => {
  const { teamName } = useParams();
  const [signOffs, setSignOffs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingSignOff, setEditingSignOff] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

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
      console.log(`Deleted sign-off with ID: ${id}`);
    } catch (error) {
      console.error('Error deleting sign-off:', error);
    }
  };
  

  const handleFormSubmit = () => {
    setShowForm(false);
    setEditingSignOff(null);
  };

  // 🔍 Filter based on search & status
  const filteredSignOffs = signOffs.filter((signOff) => {
    const matchesSearch =
      signOff.featureName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      signOff.summary?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'All' || signOff.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
      <Header />
        <button
        onClick={() => setShowForm(true)}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2">
        <Plus className="w-4 h-4" />
        Add New
        </button>

        {/* 🔍 Search & Filter Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-full md:w-1/3">
            <Search className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search by feature or summary..."
              className="flex-1 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="w-full md:w-auto">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-auto"
            >
              <option value="All">All</option>
              <option value="Pending">Blocked</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {filteredSignOffs.length === 0 ? (
          <div className="text-center py-12 text-gray-500 text-lg">
            No matching sign-offs found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSignOffs.map((signOff) => (
              <SignOffCard
                key={signOff.id}
                signOffs={signOff}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {/* 📝 SignOff Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
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
