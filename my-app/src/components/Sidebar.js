import React from 'react';
import { Nav, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Sidebar = ({ activeKey, onSelect }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("id");
    swal("로그아웃 되었습니다.");
    navigate("/");
  };

  return (
    <div 
      className="bg-dark text-white" 
      style={{ 
        height: '100vh', 
        width: '250px', 
        position: 'fixed', 
        left: 0, 
        top: 0,
        paddingTop: '20px',
        zIndex: 100
      }}
    >
      <div className="px-3 py-4">
        <h3 className="text-center mb-4">관리자 페이지</h3>
        <div className="text-center mb-4">
          <div className="mb-2">{sessionStorage.getItem("id")}님</div>
          <Button variant="outline-light" size="md" onClick={handleLogout}>
            로그아웃
          </Button>
        </div>
      </div>
      
      <Nav className="flex-column" activeKey={activeKey} onSelect={onSelect}>
        <Nav.Link 
          eventKey="employees" 
          className="text-white py-3 px-4 hover-bg-secondary"
        >
          직원 관리
        </Nav.Link>
       
      </Nav>
      
      <div className="mt-auto text-center p-3" style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <small>© 2025 부서관리 시스템</small>
      </div>
    </div>
  );
};

export default Sidebar;