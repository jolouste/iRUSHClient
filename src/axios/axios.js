import axios from "axios";

const instance = axios.create({
	baseURL: "http://54.161.202.78/api",
	headers: {
		"Content-Type": "application/json",
		"Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
		"Access-Control-Allow-Origin:": "*",
		Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
	},
});

export default instance;
