import axios from "axios";

const instanceNoAuth = axios.create({
	baseURL: "http://54.161.202.78/api/",
	headers: {
		"Content-Type": "application/json",
		"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
		"Access-Control-Allow-Origin:": "*",
	},
});

export default instanceNoAuth;
