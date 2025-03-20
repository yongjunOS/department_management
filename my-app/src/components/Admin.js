import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  //상태변수를 정의
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  //직원등록 상태변수
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    authorityId: "2",
  });

  //직원 삭제를 위한 상태변수
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // 수정 상태 변수
  const [editMode, setEditMode] = useState(false);
  const [editEmployee, setEditEmployee] = useState({
    id: "",
    authorityId: "",
    username: "",
    password: "",
    departmentName: "",
  });


  //컴포넌트가 처음 마운트될때 직원 목록을 로드하는 useEffect 훅을 선언한다
  useEffect(() => {
    const id = sessionStorage.getItem("id");
    if (!id) {
      alert("로그인이 필요합니다");
      navigate("/");
      return;
    }
  }, [navigate]);

  // 직원목록을 가져오는 함수
  const fetchEmployees = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await axios.get("http://localhost:8080/selectAll");
      setEmployees(response.data);
      console.log("서버에서가져온직원목록", response.data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  // useEffect에서 호출
  useEffect(() => {
    fetchEmployees();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prev) => ({
      // 올바른 상태 업데이트 함수
      ...prev,
      [name]: value,
    }));
  };

   // 직원 수정 폼 입력 핸들러
   const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  // 직원 등록 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/register",
        newEmployee
      );
      alert("직원이 성공적으로 등록되었습니다.");
      // 폼 초기화
      setNewEmployee({
        id: "",
        authorityId: "2",
        username: "",
        password: "",
        departmentName: "",
      });
      setShowRegistrationForm(false);
      // 직원 목록 다시 불러오기
      fetchEmployees();
    } catch (error) {
      alert("직원 등록 실패: " + (error.response?.data || error.message));
    }
  };

   // 수정 모드 활성화 핸들러
   const handleEditMode = (employee) => {
    setEditMode(true);
    setEditEmployee({
      id: employee.id,
      authorityId: employee.authorityId || "2",
      username: employee.username || "",
      password: "", // 수정 시 비밀번호는 빈 값으로 시작
      departmentName: employee.departmentName || "",
    });
  };

  // 수정 취소 핸들러
  const handleCancelEdit = () => {
    setEditMode(false);
    setEditEmployee({
      id: "",
      authorityId: "",
      username: "",
      password: "",
      departmentName: "",
    });
  };

  // 직원 수정 폼 제출 핸들러
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:8080/update",
        editEmployee
      );
      alert("직원 정보가 성공적으로 수정되었습니다.");
      setEditMode(false);
      // 직원 목록 다시 불러오기
      fetchEmployees();
    } catch (error) {
      alert("직원 정보 수정 실패: " + (error.response?.data || error.message));
    }
  };

  //직원 삭제 확인 핸들러
  const handleDeleteConfirm = (id) => {
    setDeleteConfirmId(id);
  }

    // 직원 삭제 실행 핸들러
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/delete/${id}`);
      alert("직원이 성공적으로 삭제되었습니다.");
      // 직원 목록 다시 불러오기
      fetchEmployees();
    } catch (error) {
      alert("직원 삭제 실패: " + (error.response?.data || error.message));
    } finally {
      // 확인 상태 초기화
      setDeleteConfirmId(null);
    }
  };

  // 삭제 취소 핸들러
  const handleCancelDelete = () => {
    setDeleteConfirmId(null);
  };



  return (
    <div>
      {/* 직원 등록 버튼 */}
      <button
        onClick={() => setShowRegistrationForm(!showRegistrationForm)}
        style={{
          padding: "10px 15px",
          backgroundColor: showRegistrationForm ? "#f44336" : "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        {showRegistrationForm ? "취소" : "직원 등록"}
      </button>


      {/* 직원 등록 폼 */}
      {showRegistrationForm && (
        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "5px",
            marginBottom: "20px",
          }}
        >
          <h1 style={{ marginBottom: "15px" }}>새 직원 등록</h1>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                ID:
              </label>
              <input
                type="text"
                name="id"
                value={newEmployee.id}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                권한:
              </label>
              <select
                name="authorityId"
                value={newEmployee.authorityId}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
              >
                <option value="1">관리자</option>
                <option value="2">일반 직원</option>
              </select>
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                이름:
              </label>
              <input
                type="text"
                name="username"
                value={newEmployee.username}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                비밀번호:
              </label>
              <input
                type="password"
                name="password"
                value={newEmployee.password}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                부서:
              </label>
              <input
                type="text"
                name="departmentName"
                value={newEmployee.departmentName}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                padding: "10px 15px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              등록하기
            </button>
          </form>
        </div>
      )}

         {/* 직원 수정 폼 */}
         {editMode && (
        <div>
          <h2>직원 정보 수정</h2>
          <form onSubmit={handleEditSubmit}>
            <div>
              <label>ID:</label>
              <input
                type="text"
                name="id"
                value={editEmployee.id}
                readOnly
              />
            </div>
            <div>
              <label>권한:</label>
              <select
                name="authorityId"
                value={editEmployee.authorityId}
                onChange={handleEditChange}
                required
              >
                <option value="1">관리자</option>
                <option value="2">일반 직원</option>
              </select>
            </div>
            <div>
              <label>이름:</label>
              <input
                type="text"
                name="username"
                value={editEmployee.username}
                onChange={handleEditChange}
                required
              />
            </div>
            <div>
              <label>비밀번호 (변경하지 않으려면 빈칸으로 두세요):</label>
              <input
                type="password"
                name="password"
                value={editEmployee.password}
                onChange={handleEditChange}
              />
            </div>
            <div>
              <label>부서:</label>
              <input
                type="text"
                name="departmentName"
                value={editEmployee.departmentName}
                onChange={handleEditChange}
                required
              />
            </div>
            <button type="submit">저장하기</button>
            <button type="button" onClick={handleCancelEdit}>취소하기</button>
          </form>
        </div>
      )}

      <h1>직원관리 시스템</h1>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Department</th>
            <th>Timekeeping</th>
            <th>Clock In</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => {
            console.log("직원map형태", employee);
            return (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.username}</td>
                <td>{employee.departmentName}</td>
                <td>{employee.timekepping}</td>
                <td>{employee.clockIn}</td>
                <td>
                <button onClick={() => handleEditMode(employee)}>수정</button>
                {deleteConfirmId === employee.id ? (
                  <div>
                    <span style={{ color: 'red', marginRight: '10px' }}>정말 삭제하시겠습니까?</span>
                    <button
                      onClick={() => handleDelete(employee.id)}
                  
                    >
                      예
                    </button>
                    <button
                      onClick={handleCancelDelete}
                     
                    >
                      아니오
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleDeleteConfirm(employee.id)}
                  
                  >
                    삭제
                  </button>
                )}
              </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
