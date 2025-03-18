import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

const Login = () => {
	const [id, setId] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await axios.post('/login', {
				id,
				
				password
			});

			if (response.status === 200) {
				console.log("로그인계정정보", response)
				if (response.data.authorityId === '1') {
					sessionStorage.setItem('id', id);
					alert('관리자 페이지로 이동합니다.')
					navigate('/admin'); // admin.js로 이동			
				} else {
					sessionStorage.setItem('id', id);
					setId(response.data);
					alert(`"${id}"님 환영합니다.`);
					navigate('/list'); // 로그인 성공 시 리다이렉트		
				}
			}
		} catch (error) {
			alert('아이디 또는 비밀번호가 유효하지 않습니다.');
			console.error('로그인 실패: ', error);
		}
	};
	
	const inputStyle = {
		padding: '10px',
		marginBottom: '10px',
		width: '330px',
		border: '1px solid #ccc',
		borderRadius: '5px'
	};

	return (

		<div style={{ border: '2px solid #ccc', borderRadius: '10px', padding: '20px', width: 'auto', textAlign: 'center' }}>
			<h1 style={{ marginBottom: '20px' }}>로그인</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<input
						type="text"
						placeholder="아이디"
						value={id}
						onChange={(e) => setId(e.target.value)}
						required
						style={inputStyle}
					/>
				</div>
				<div>
					<input
						type="password"
						placeholder="비밀번호"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						style={inputStyle}
					/>
				</div>

				<button type="submit" style={{ padding: '10px', width: '330px', marginBottom: '10px' }}>로그인</button>
			</form>
		</div>
	);
};

export default Login;