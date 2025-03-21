import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

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

  // Admin 컴포넌트 내부에서 이 함수 추가
  const handleLogout = () => {
    // 세션 스토리지에서 사용자 정보 삭제
    sessionStorage.removeItem("id");
    alert("로그아웃 되었습니다.");
    // 로그인 페이지로 리다이렉트
    navigate("/");
  };

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
  };

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
      {/* Admin 컴포넌트 return 문 최상단에 추가 */}
      <Navbar bg="dark" variant="dark" className="mb-1 px-0">
        <Container fluid className="px-5">
          <Navbar.Brand className="ms-0 ps-2">
            <h1>직원관리 페이지</h1>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className="me-2">
              <strong>{sessionStorage.getItem("id")}</strong>님 로그인 중
            </Navbar.Text>
            <Button variant="outline-light" onClick={handleLogout}>
              로그아웃
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* 직원 등록 버튼 */}
      <Button
        variant={showRegistrationForm ? "danger" : "success"}
        onClick={() => setShowRegistrationForm(!showRegistrationForm)}
        className="mb-3"
      >
        {showRegistrationForm ? "취소" : "직원 등록"}
      </Button>
      {/* 직원 등록 폼 */}
      {showRegistrationForm && (
        <Card className="mb-4">
          <Card.Header>
            <h3>새 직원 등록</h3>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>ID:</Form.Label>
                <Form.Control
                  type="text"
                  name="id"
                  value={newEmployee.id}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>권한:</Form.Label>
                <Form.Select
                  name="authorityId"
                  value={newEmployee.authorityId}
                  onChange={handleChange}
                  required
                >
                  <option value="1">관리자</option>
                  <option value="2">일반 직원</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>이름:</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={newEmployee.username}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>비밀번호:</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={newEmployee.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>부서:</Form.Label>
                <Form.Control
                  type="text"
                  name="departmentName"
                  value={newEmployee.departmentName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                등록하기
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
      {/* 직원 수정 폼 */}
      {editMode && (
        <Card className="mb-4">
          <Card.Header>
            <h2>직원 정보 수정</h2>
          </Card.Header>
          <Card.Body>
            <form onSubmit={handleEditSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>ID:</Form.Label>
                <Form.Control
                  type="text"
                  name="id"
                  value={editEmployee.id}
                  readOnly
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>권한:</Form.Label>
                <Form.Select
                  name="authorityId"
                  value={editEmployee.authorityId}
                  onChange={handleEditChange}
                  required
                >
                  <option value="1">관리자</option>
                  <option value="2">일반 직원</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>이름:</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={editEmployee.username}
                  onChange={handleEditChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  비밀번호 (변경하지 않으려면 빈칸으로 두세요):
                </Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={editEmployee.password}
                  onChange={handleEditChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>부서:</Form.Label>
                <Form.Control
                  type="text"
                  name="departmentName"
                  value={editEmployee.departmentName}
                  onChange={handleEditChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="me-2">
                저장하기
              </Button>
              <Button variant="secondary" onClick={handleCancelEdit}>
                취소하기
              </Button>
            </form>
          </Card.Body>
        </Card>
      )}
    
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>이름</th>
            <th>권한</th>
            <th>부서</th>
            <th>근태상태</th>
            <th>출근시간</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => {
            console.log("직원map형태", employee);
            return (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.username}</td>
                <td>{employee.authorityId === "1" ? "관리자" : "일반직원"}</td>
                <td>{employee.departmentName}</td>
                <td>{employee.timekepping}</td>
                <td>{employee.clockIn}</td>
                <td>
                  <Button
                    variant="primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEditMode(employee)}
                  >
                    수정
                  </Button>
                  {deleteConfirmId === employee.id ? (
                    <div>
                      <span style={{ color: "red", marginRight: "10px" }}>
                        정말 삭제하시겠습니까?
                      </span>
                      <Button
                        variant="danger"
                        size="sm"
                        className="me-2"
                        onClick={() => handleDelete(employee.id)}
                      >
                        예
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={handleCancelDelete}
                      >
                        아니오
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteConfirm(employee.id)}
                    >
                      삭제
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Admin;
