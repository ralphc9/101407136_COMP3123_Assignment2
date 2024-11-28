import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:4000/api/v1/employee/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setName(response.data.name);
        setPosition(response.data.position);
        setDepartment(response.data.department);
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const updatedEmployee = { name, position, department };
      await axios.put(`http://localhost:4000/api/v1/employee/${id}`, updatedEmployee, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Employee updated successfully');
      navigate('/employees');
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <div>
      <h2>Edit Employee</h2>
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
        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
};

export default EditEmployee;

