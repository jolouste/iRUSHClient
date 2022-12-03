import axios from "axios";

const instanceNoAuth = axios.create({
	baseURL: "http://localhost:5000/api",
	headers: {
		"Content-Type": "application/json",
	},
});

export default instanceNoAuth;
