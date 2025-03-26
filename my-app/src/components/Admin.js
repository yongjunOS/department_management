import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card"; // Card대신 Modal 사용
import Navbar from "react-bootstrap/Navbar"; // Navbar대신에 sidebar로 사용
import Container from "react-bootstrap/Container"; // Navbar대신에 sidebar로 사용
import Modal from "react-bootstrap/Modal"; // 모달 컴포넌트 추가
import swal from "sweetalert";
import Sidebar from "./Sidebar";
import Pagination from "react-bootstrap/Pagination";
import "./pagination.css";

const Admin = () => {
  //상태변수를 정의
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // 기존 직원등록 상태변수
  // const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  const [activeSection, setActiveSection] = useState("employees"); // 기본 활성 섹션

  // 모달 직원등록 상태변수
  const [showModal, setShowModal] = useState(false);

  const [newEmployee, setNewEmployee] = useState({
    authorityId: "2",
  });

  //직원 삭제를 위한 상태변수
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // 기존 수정 상태 변수
  const [editMode, setEditMode] = useState(false);
  const [editEmployee, setEditEmployee] = useState({
    id: "",
    authorityId: "",
    username: "",
    password: "",
    departmentName: "",
  });

  // 모달 직원수정 상태변수
  const [showEditModal, setShowEditModal] = useState(false);

  // 직원 상세 정보 모달 상태변수
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  //페이징네이션 상태변수
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2); // 페이지당 표시할 항목 수

  // Admin 컴포넌트 내부에서 이 함수 추가
  const handleLogout = () => {
    // 세션 스토리지에서 사용자 정보 삭제
    sessionStorage.removeItem("id");
    swal("로그아웃 되었습니다.");
    // 로그인 페이지로 리다이렉트
    navigate("/");
  };

  // 모달 열기/닫기 핸들러
  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => {
    setShowModal(false);
    // 폼 초기화
    setNewEmployee({
      id: "",
      authorityId: "2",
      username: "",
      password: "",
      departmentName: "",
    });
  };

  // 직원 상세 정보 모달 열기/닫기 핸들러
  const handleDetailModalOpen = (employee) => {
    setSelectedEmployee(employee);
    setShowDetailModal(true);
  };

  // 직원 상세 정보 모달 열기/닫기 핸들러
  const handleDetailModalClose = () => {
    setShowDetailModal(false);
    setSelectedEmployee(null);
  };

  // 사이드바 탭 변경 핸들러
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  //컴포넌트가 처음 마운트될때 직원 목록을 로드하는 useEffect 훅을 선언한다
  useEffect(() => {
    const id = sessionStorage.getItem("id");
    if (!id) {
      swal("로그인이 필요합니다");
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
      [name]: value, // "name" 속성을 사용하여 어떤 상태 속성을 업데이트할지 결정
    }));
  };

  // 기존 직원 수정 폼 입력 핸들러
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // // 수정 모드 활성화 핸들러
  // const handleEditMode = (employee) => {
  //   setEditMode(true);
  //   setEditEmployee({
  //     id: employee.id,
  //     authorityId: employee.authorityId || "2",
  //     username: employee.username || "",
  //     password: "", // 수정 시 비밀번호는 빈 값으로 시작
  //     departmentName: employee.departmentName || "",
  //   });
  // };

  // 수정 모달 열기/닫기 핸들러
  const handleEditModalOpen = (employee) => {
    setEditEmployee({
      id: employee.id,
      authorityId: employee.authorityId || "2",
      username: employee.username || "",
      password: "", // 수정 시 비밀번호는 빈 값으로 시작
      departmentName: employee.departmentName || "",
    });
    setShowEditModal(true);
  };

  // // 수정 취소 핸들러
  // const handleCancelEdit = () => {
  //   setEditMode(false);
  //   setEditEmployee({
  //     id: "",
  //     authorityId: "",
  //     username: "",
  //     password: "",
  //     departmentName: "",
  //   });
  // };

  const handleEditModalClose = () => {
    setShowEditModal(false);
    setEditEmployee({
      id: "",
      authorityId: "",
      username: "",
      password: "",
      departmentName: "",
    });
  };

  // // 기존 직원 등록 폼 제출 핸들러
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8080/register",
  //       newEmployee
  //     );

  //     swal("직원이 성공적으로 등록되었습니다.");
  //     // 폼 초기화
  //     setNewEmployee({
  //       id: "",
  //       authorityId: "2",
  //       username: "",
  //       password: "",
  //       departmentName: "",
  //     });
  //     setShowRegistrationForm(false);
  //     // 직원 목록 다시 불러오기
  //     fetchEmployees();
  //   } catch (error) {
  //     swal("직원 등록 실패: " + (error.response?.data || error.message));
  //   }
  // };

  // 등록 모달로 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/register",
        newEmployee
      );

      swal("직원이 성공적으로 등록되었습니다.");
      // 모달 닫기 (이 부분이 추가됨)
      handleModalClose();
      // 직원 목록 다시 불러오기
      fetchEmployees();
    } catch (error) {
      swal("직원 등록 실패: " + (error.response?.data || error.message));
    }
  };

  // // 기존 직원 수정 폼 제출 핸들러
  // const handleEditSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.put(
  //       "http://localhost:8080/update",
  //       editEmployee
  //     );
  //     swal("직원 정보가 성공적으로 수정되었습니다.");
  //     setEditMode(false);
  //     // 직원 목록 다시 불러오기
  //     fetchEmployees();
  //   } catch (error) {
  //     swal("직원 정보 수정 실패: " + (error.response?.data || error.message));
  //   }
  // };

  // 직원 수정 폼 제출 핸들러 수정
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:8080/update",
        editEmployee
      );
      swal("직원 정보가 성공적으로 수정되었습니다.");
      // 모달 닫기 (이 부분이 추가됨)
      handleEditModalClose();
      // 직원 목록 다시 불러오기
      fetchEmployees();
    } catch (error) {
      swal("직원 정보 수정 실패: " + (error.response?.data || error.message));
    }
  };

  // //이전 직원 삭제 확인 핸들러
  // const handleDeleteConfirm = (id) => {
  //   setDeleteConfirmId(id);
  // };

  // 직원 삭제 확인 및 실행 핸들러 (swal 사용)
  const handleDeleteConfirm = (id, username) => {
    // 디버깅을 위해 username 값 확인
    console.log("삭제할 직원 정보:", id, username);
    swal({
      title: "직원 삭제",
      text: `"${username}" 직원을 정말 삭제하시겠습니까?`,
      icon: "warning",
      buttons: ["취소", "삭제"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        handleDelete(id);
      }
    });
  };

  // // 이전 직원 삭제 실행 핸들러
  // const handleDelete = async (id) => {
  //   try {
  //     const response = await axios.delete(`http://localhost:8080/delete/${id}`);
  //     swal("직원이 성공적으로 삭제되었습니다.");
  //     // 직원 목록 다시 불러오기
  //     fetchEmployees();
  //   } catch (error) {
  //     swal("직원 삭제 실패: " + (error.response?.data || error.message));
  //   } finally {
  //     // 확인 상태 초기화
  //     setDeleteConfirmId(null);
  //   }
  // };

  // swal 적용 직원 삭제 실행 핸들러
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8080/delete/${id}`);
      swal({
        title: "삭제 완료!",
        text: "직원이 성공적으로 삭제되었습니다.",
        icon: "success",
        timer: 2000,
      });
      // 직원 목록 다시 불러오기
      fetchEmployees();
    } catch (error) {
      swal({
        title: "삭제 실패!",
        text: "직원 삭제 실패: " + (error.response?.data || error.message),
        icon: "error",
      });
    }
  };

  // 삭제 취소 핸들러
  const handleCancelDelete = () => {
    setDeleteConfirmId(null);
  };

  // 섹션에 따른 컨텐츠 렌더링
  const renderContent = () => {
    switch (activeSection) {
      case "employees":
        return renderEmployeesSection();
      case "departments":
        return (
          <div className="p-4">
            <h2>부서 관리</h2>
            <p>부서 관리 기능은 개발 중입니다.</p>
          </div>
        );
      case "attendance":
        return (
          <div className="p-4">
            <h2>근태 관리</h2>
            <p>근태 관리 기능은 개발 중입니다.</p>
          </div>
        );
      case "reports":
        return (
          <div className="p-4">
            <h2>보고서</h2>
            <p>보고서 기능은 개발 중입니다.</p>
          </div>
        );
      case "settings":
        return (
          <div className="p-4">
            <h2>설정</h2>
            <p>설정 기능은 개발 중입니다.</p>
          </div>
        );
      default:
    }
  };

  // 페이지네이션 컴포넌트 추가
  const PaginationComponent = ({
    totalItems,
    itemsPerPage,
    currentPage,
    onPageChange,
  }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // 많은 페이지가 있을 경우 페이지 범위를 제한
    const pageRange = 5;
    let startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
    let endPage = Math.min(totalPages, startPage + pageRange - 1);

    // 시작 페이지 조정
    if (endPage - startPage + 1 < pageRange && startPage > 1) {
      startPage = Math.max(1, endPage - pageRange + 1);
    }

    const pages = [];

    // 첫 페이지로 이동 버튼
    pages.push(
      <Pagination.First
        key="first"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      />
    );

    // 이전 페이지 버튼
    pages.push(
      <Pagination.Prev
        key="prev"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
    );

    // 페이지 번호 버튼들
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    // 다음 페이지 버튼
    pages.push(
      <Pagination.Next
        key="next"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    );

    // 마지막 페이지로 이동 버튼
    pages.push(
      <Pagination.Last
        key="last"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      />
    );

    return <Pagination>{pages}</Pagination>;
  };

  // 직원 관리 섹션 렌더링
  const renderEmployeesSection = () => {
    // 현재 페이지에 표시할 데이터 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentEmployees = employees.slice(indexOfFirstItem, indexOfLastItem);

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    return (
      <div className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>직원 관리</h2>
          <Button variant="success" onClick={handleModalOpen}>
            직원 등록
          </Button>
        </div>

        {loading ? (
          <p>데이터를 불러오는 중...</p>
        ) : error ? (
          <p>에러 발생: {error.message}</p>
        ) : (
          <>
            <Table striped bordered hover responsive>
              <thead className="bg-dark text-white">
                <tr>
                  <th>ID</th>
                  <th>이름</th>
                  <th>권한</th>
                  <th>부서</th>
                  <th>근태상태</th>
                  <th>출근시간</th>
                  <th style={{ width: "200px" }}>작업</th>
                </tr>
              </thead>
              <tbody>
                {currentEmployees.map((employee) => (
                  <tr
                    key={employee.id}
                    onClick={() => handleDetailModalOpen(employee)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{employee.id}</td>
                    <td>{employee.username}</td>
                    <td>
                      {employee.authorityId === "1" ? "관리자" : "일반직원"}
                    </td>
                    <td>{employee.departmentName}</td>
                    <td>{employee.timekepping}</td>
                    <td>{employee.clockIn}</td>
                    <td>
                      <Button
                        variant="primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEditModalOpen(employee)}
                      >
                        수정
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() =>
                          handleDeleteConfirm(employee.id, employee.username)
                        }
                      >
                        삭제
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div className="d-flex justify-content-center mt-4">
              <PaginationComponent
                totalItems={employees.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div>
      {/* 사이드바 추가로 네비게이션바는 더이상 안씀씀
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
      </Navbar> */}
      {/* 사이드바 */}
      <Sidebar activeKey={activeSection} onSelect={handleSectionChange} />
      메인 컨텐츠
      <div style={{ marginLeft: "250px", width: "calc(100% - 250px)" }}>
        {renderContent()}
      </div>
      {/* 직원 등록 버튼
      <Button
        variant={showRegistrationForm ? "danger" : "success"}
        onClick={() => setShowRegistrationForm(!showRegistrationForm)}
        className="mb-3"
      >
        {showRegistrationForm ? "취소" : "직원 등록"}
      </Button> */}
      {/* // 새 코드 */}
      <Button variant="success" onClick={handleModalOpen} className="mb-3">
        직원 등록
      </Button>
      {/* 이전 직원 등록 폼
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
      )} */}
      {/* 직원 등록 모달 */}
      <Modal show={showModal} onHide={handleModalClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>새 직원 등록</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            취소
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            등록하기
          </Button>
        </Modal.Footer>
      </Modal>
      {/* 기존 직원 수정 폼
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
      )} */}
      {/* 직원 수정 모달 */}
      <Modal show={showEditModal} onHide={handleEditModalClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>직원 정보 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>
            취소
          </Button>
          <Button variant="primary" onClick={handleEditSubmit}>
            저장하기
          </Button>
        </Modal.Footer>
      </Modal>
      {/* 기존 테이블 코드는 지웠음 */}
      {/* 직원 상세 정보 모달 */}
      <Modal show={showDetailModal} onHide={handleDetailModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>직원 상세 정보</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEmployee && (
            <div>
              <h5 className="mb-4 text-center">
                {selectedEmployee.username} 님의 상세 정보
              </h5>

              <Table bordered>
                <tbody>
                  <tr>
                    <th style={{ width: "30%" }}>ID</th>
                    <td>{selectedEmployee.id}</td>
                  </tr>
                  <tr>
                    <th>이름</th>
                    <td>{selectedEmployee.username}</td>
                  </tr>
                  <tr>
                    <th>권한</th>
                    <td>
                      {selectedEmployee.authorityId === "1"
                        ? "관리자"
                        : "일반직원"}
                    </td>
                  </tr>
                  <tr>
                    <th>부서</th>
                    <td>{selectedEmployee.departmentName}</td>
                  </tr>
                  <tr>
                    <th>근태상태</th>
                    <td>{selectedEmployee.timekepping || "기록 없음"}</td>
                  </tr>
                  <tr>
                    <th>출근시간</th>
                    <td>{selectedEmployee.clockIn || "기록 없음"}</td>
                  </tr>
                  <tr>
                    <th>퇴근시간</th>
                    <td>{selectedEmployee.clockOut || "기록 없음"}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleDetailModalClose();
              handleEditModalOpen(selectedEmployee);
            }}
          >
            정보 수정
          </Button>
          <Button variant="secondary" onClick={handleDetailModalClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Admin;
