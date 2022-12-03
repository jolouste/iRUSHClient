import axios from "axios";

const instanceNoAuth = axios.create({
	baseURL: "http://54.161.202.78/",
	headers: {
		"Content-Type": "application/json",
	},
});

export default instanceNoAuth;
