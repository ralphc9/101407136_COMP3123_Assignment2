import React, { useState } from 'react';
import axios from 'axios';

const AddEmployee = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Get token from localStorage

    if (!name || !position || !department) {
      setError('All fields are required!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/api/v1/employee', { 
        name, 
        position, 
        department 
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the headers
        },
      });

      // Handle successful response
      console.log('Employee added:', response.data);
      alert('Employee added successfully');
      window.location.href = '/employees'; // Redirect to the employee list
    } catch (error) {
      console.error('Error adding employee:', error);
      setError('Failed to add employee. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add Employee</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
