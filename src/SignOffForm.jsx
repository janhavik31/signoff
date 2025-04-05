import React, { useState } from 'react';
import { firestore } from './firebase'; 
import { collection, addDoc } from 'firebase/firestore';

const SignOffForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    sprintId: '',
    featureName: '',
    sprintGoal: '',
    status: 'Completed',
    checkpoints: {
      qeValidation: false,
      devValidation: false
    },
    comments: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      checkpoints: {
        ...formData.checkpoints,
        [name]: checked
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(firestore, "signOffs"), formData);
      alert(`Form submitted successfully! Document ID: ${docRef.id}`);
      if (onSubmit) onSubmit(formData);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to submit form.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Sprint ID */}
      <div>
        <label htmlFor="sprintId" className="block text-sm font-medium text-gray-700 mb-1">
          Sprint ID
        </label>
        <input
          type="text"
          id="sprintId"
          name="sprintId"
          value={formData.sprintId}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Status */}
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
        </select>
      </div>

      {/* Feature Name */}
      <div>
        <label htmlFor="featureName" className="block text-sm font-medium text-gray-700 mb-1">
          Feature Name
        </label>
        <input
          type="text"
          id="featureName"
          name="featureName"
          value={formData.featureName}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

  
      <div>
        <label htmlFor="sprintGoal" className="block text-sm font-medium text-gray-700 mb-1">
          Sprint Goal
        </label>
        <textarea
          id="sprintGoal"
          name="sprintGoal"
          value={formData.sprintGoal}
          onChange={handleInputChange}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Checkpoints */}
      <div>
        <span className="block text-sm font-medium text-gray-700 mb-2">
          Checkpoints
        </span>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="qeValidation"
              name="qeValidation"
              checked={formData.checkpoints.qeValidation}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="qeValidation" className="ml-2 block text-sm text-gray-700">
              QE validation
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="devValidation"
              name="devValidation"
              checked={formData.checkpoints.devValidation}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="devValidation" className="ml-2 block text-sm text-gray-700">
              Dev validation
            </label>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
          Comments (Optional)
        </label>
        <textarea
          id="comments"
          name="comments"
          value={formData.comments}
          onChange={handleInputChange}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>


      <div className="flex justify-end space-x-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default SignOffForm;
