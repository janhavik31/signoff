import React, { useState } from 'react';
import { firestore } from './firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [empId, setEmpId] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Check if empId already exists
      const q = query(collection(firestore, 'users'), where('empId', '==', empId));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        alert('Employee ID already exists');
        return;
      }

      await addDoc(collection(firestore, 'users'), {
        name,
        empId
      });

      localStorage.setItem('userName', name);
      localStorage.setItem('empId', empId);
      navigate('/team-selection');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="w-full max-w-sm p-4 mx-auto mt-24 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form className="space-y-6" onSubmit={handleSignup}>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Create a new account</h5>
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
          <input
            type="text"
            id="name"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="empId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Employee ID</label>
          <input
            type="text"
            id="empId"
            className="input"
            value={empId}
            onChange={(e) => setEmpId(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-primary">Create Account</button>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
        Already registered? <Link to="/signin" className="text-blue-700 hover:underline dark:text-blue-500">Sign in</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;