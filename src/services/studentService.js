import axios from 'axios';

const API_URL = 'http://localhost:5000/api/students';

export const getStudents = (search = '') => axios.get(search ? `${API_URL}?search=${search}` : API_URL);
export const addStudent = (studentData) => axios.post(API_URL, studentData);
export const updateStudent = (id, studentData) => axios.put(`${API_URL}/${id}`, studentData);
export const deleteStudent = (id) => axios.delete(`${API_URL}/${id}`);
