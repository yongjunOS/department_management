import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 세션 스토리지에서 id 확인
    const id = sessionStorage.getItem('id');
    if (!id) {
      alert('로그인이 필요합니다.');
      navigate('/');
      return;
    }

    // 직원 목록 불러오기
    fetchEmployees();
  }, [navigate]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/selectAll');
      setEmployees(response.data);
      setLoading(false);
    } catch (err) {
      setError('직원 목록을 불러오는 중 오류가 발생했습니다.');
      console.error('Error fetching employees:', err);
      setLoading(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem('id');
    navigate('/');
  };

  // 테이블 스타일
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px'
  };

  const thStyle = {
    backgroundColor: '#f2f2f2',
    padding: '12px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd'
  };

  const tdStyle = {
    padding: '12px',
    borderBottom: '1px solid #ddd'
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>직원 관리 시스템</h1>
        <button 
          onClick={logout}
          style={{ padding: '8px 16px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          로그아웃
        </button>
      </div>
      
      <h2>직원 목록</h2>
      
      {loading ? (
        <p>로딩 중...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>이름</th>
              <th style={thStyle}>부서</th>
              <th style={thStyle}>권한</th>
              <th style={thStyle}>출근 시간</th>
              <th style={thStyle}>퇴근 시간</th>
              <th style={thStyle}>비고</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((employee) => (
                <tr key={employee.id}>
                  <td style={tdStyle}>{employee.id}</td>
                  <td style={tdStyle}>{employee.username}</td>
                  <td style={tdStyle}>{employee.departmentName}</td>
                  <td style={tdStyle}>{employee.authorityId === '1' ? '매니저' : '직원'}</td>
                  <td style={tdStyle}>{employee.clockIn ? new Date(employee.clockIn).toLocaleString() : '-'}</td>
                  <td style={tdStyle}>{employee.clockOut ? new Date(employee.clockOut).toLocaleString() : '-'}</td>
                  <td style={tdStyle}>{employee.timekepping || '-'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>
                  등록된 직원이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Admin;