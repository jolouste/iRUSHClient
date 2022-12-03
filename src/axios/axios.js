import axios from "axios";

const instance = axios.create({
	baseURL: "http://54.161.202.78/",
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
	},
});

export default instance;
