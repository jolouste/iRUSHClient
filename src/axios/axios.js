import axios from "axios";

const instance = axios.create({
	baseURL: "http://54.86.88.74/api",
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
	},
});

export default instance;
