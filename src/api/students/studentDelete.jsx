import { useState, useEffect } from 'react';
import axios from 'axios';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/Students');
      setStudents(response.data);
    } catch (error) {
      console.log('Error fetching student list:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/Student/${id}`);
      setStudents((prevStudents) => prevStudents.filter((student) => student.id !== id));
    } catch (error) {
      console.log('Error deleting student:', error);
    }
  };

  return (
    <div>
      <h1>Student List</h1>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name}
            <button onClick={() => handleDelete(student.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default StudentList;
