import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  //상태변수를 정의
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //컴포넌트가 처음 마운트될때 직원 목록을 로드하는 useEffect 훅을 선언한다
  useEffect(() => {
    const id = sessionStorage.getItem("id");
    if (!id) {
      alert("로그인이 필요합니다");
      navigate("/");
      return;
    }
  }, [navigate]);

  //직원목록을 가져오는 함수 선언

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setError(null);

        // loading 상태를 true 로 바꿉니다.
        setLoading(true);
        const response = await axios.get("http://localhost:8080/selectAll");
        console.log("response", response.data);
        setEmployees(response.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>직원관리 시스템</h1>
      <div>
        <ul>
          {employees.map((item) => {
            console.log("현재 item:", item); // 콘솔에 item 출력
            return (
              <li key={item.id}>
                {item.username} <br/>
                {item.departmentName} <br />
                {item.timekepping} <br />
                {item.clockIn}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Admin;
