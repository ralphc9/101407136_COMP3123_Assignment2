import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          window.location.href = '/login';
          return;
        }
        const response = await axios.get('http://localhost:4000/api/v1/employee', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:4000/api/v1/employee/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(employees.filter((emp) => emp._id !== id));
      alert('Employee deleted successfully');
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:4000/api/v1/employee/search', {
        params: { name: searchTerm },
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(response.data);
    } catch (error) {
      console.error('Error searching employees:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; 
  };

  return (
    <div>
      <h2>Employee List</h2>
      
      {/* Logout Button positioned at the top-right */}
      <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
      
      {/* Add Employee Button */}
      <button onClick={() => window.location.href = '/employees/add'}>Add Employee</button>

      {/* Search Employee */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {/* Employee Table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.position}</td>
              <td>{employee.department}</td>
              <td>
                <button onClick={() => window.location.href = `/employees/edit/${employee._id}`}>Edit</button>
                <button onClick={() => handleDelete(employee._id)}>Delete</button>
                <button onClick={() => window.location.href = `/employees/view/${employee._id}`}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  logoutButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  }
};

export default EmployeeList;

