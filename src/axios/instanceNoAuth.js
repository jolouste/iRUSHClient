import axios from "axios";

const instanceNoAuth = axios.create({
	baseURL: "http://54.86.88.74/api/",
	headers: {
		"Content-Type": "application/json",
	},
});

export default instanceNoAuth;
