import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from './firebase';
import { collection, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const SignOffForm = ({ onSubmit, onCancel, initialData = null }) => {
  const { teamName } = useParams();

  const [formData, setFormData] = useState({
    teamName: teamName || '',
    issueId: '',
    summary: '',
    signoffs: {
      qa: { value: '', comment: '' },
      dev: { value: '', comment: '' },
      architect: { value: '', comment: '' },
      performance: { value: '', comment: '' },
      security: { value: '', comment: '' },
      product: { value: '', comment: '' },
    },
    signoffDate: '',
    deploymentDate: ''
  });

  // Populate form if editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        teamName: initialData.teamName || '',
        issueId: initialData.issueId || '',
        summary: initialData.summary || '',
         status: initialData.status || 'In Progress',
        signoffs: {
          qa: { value: initialData.signoffs?.qa?.value || '', comment: initialData.signoffs?.qa?.comment || '' },
          dev: { value: initialData.signoffs?.dev?.value || '', comment: initialData.signoffs?.dev?.comment || '' },
          architect: { value: initialData.signoffs?.architect?.value || '', comment: initialData.signoffs?.architect?.comment || '' },
          performance: { value: initialData.signoffs?.performance?.value || '', comment: initialData.signoffs?.performance?.comment || '' },
          security: { value: initialData.signoffs?.security?.value || '', comment: initialData.signoffs?.security?.comment || '' },
          product: { value: initialData.signoffs?.product?.value || '', comment: initialData.signoffs?.product?.comment || '' },
        },
        signoffDate: initialData.signoffDate || '',
        deploymentDate: initialData.deploymentDate || ''
      });
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignoffChange = (key, field, value) => {
    const userName = localStorage.getItem('userName');
    setFormData(prev => ({
      ...prev,
      signoffs: {
        ...prev.signoffs,
        [key]: {
          ...prev.signoffs[key],
          [field]: value,
          ...(field === 'value' && { signedBy: userName }), 
        }
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (initialData && initialData.id) {
        // Edit mode
        const docRef = doc(firestore, "signOffs", initialData.id);
        await updateDoc(docRef, formData);
        alert("Signoff updated successfully!");
      } else {
        // Create mode
        const docRef = await addDoc(collection(firestore, "signOffs"), formData);
        alert(`Signoff submitted successfully! Document ID: ${docRef.id}`);
      }

      if (onSubmit) onSubmit(formData);
      if (onCancel) onCancel();
    } catch (error) {
      console.error("Error saving signoff: ", error);
      alert("Submission failed. Try again.");
    }
  };

  const handleDelete = async () => {
    if (!initialData?.id) return;
    if (!window.confirm("Are you sure you want to delete this signoff?")) return;

    try {
      await deleteDoc(doc(firestore, "signOffs", initialData.id));
      alert("Signoff deleted successfully.");
      if (onCancel) onCancel();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Delete failed. Try again.");
    }
  };

  const renderSignoffSection = (label, key) => (
    <div key={key} className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
        {label} Signoff
      </label>
      <div className="flex space-x-2 mb-2">
        {['Yes', 'No', 'Not Needed'].map(option => (
          <button
            key={option}
            type="button"
            onClick={() => handleSignoffChange(key, 'value', option)}
            className={`px-4 py-1 rounded-md border ${
              formData.signoffs[key].value === option
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      <textarea
        placeholder="Comments (optional)"
        value={formData.signoffs[key].comment}
        onChange={(e) => handleSignoffChange(key, 'comment', e.target.value)}
        rows="2"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );

  const signoffFields = ['qa', 'dev', 'architect', 'performance', 'security', 'product'];

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 space-y-6 bg-white rounded shadow-md overflow-y-auto max-h-[90vh]">
      <h2 className="text-2xl font-semibold text-center text-blue-800">
        {initialData ? "Edit Feature Signoff" : "Feature Signoff Form"}
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Team Name</label>
        <input
          type="text"
          name="teamName"
          value={formData.teamName}
          disabled
          className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="issueId" className="block text-sm font-medium text-gray-700 mb-1">Issue ID</label>
        <input
          type="text"
          name="issueId"
          value={formData.issueId}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
        <textarea
          name="summary"
          value={formData.summary}
          onChange={handleInputChange}
          rows="3"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
  <select
    name="status"
    value={formData.status}
    onChange={handleInputChange}
    required
    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  >
    <option value="In Progress">in process</option>
    <option value="Completed">Completed</option>
    <option value="Blocked">Blocked</option>
  </select>
</div>

      {signoffFields.map(key => renderSignoffSection(key, key))}

      <div>
        <label htmlFor="signoffDate" className="block text-sm font-medium text-gray-700 mb-1">Signoff Date</label>
        <input
          type="date"
          name="signoffDate"
          value={formData.signoffDate}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="deploymentDate" className="block text-sm font-medium text-gray-700 mb-1">Deployment Date</label>
        <input
          type="date"
          name="deploymentDate"
          value={formData.deploymentDate}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-between items-center pt-4">
        <div className="flex gap-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
          {initialData && (
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          )}
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-600"
        >
          {initialData ? 'Update' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default SignOffForm;


