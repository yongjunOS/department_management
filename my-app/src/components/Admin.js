import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "http://localhost:3000";


class Admin  {
	getEmployees() {
		return axios.get(EMPLOYEE_API_BASE_URL + "/selectAll")
	}
}

export default new Admin();