import React, { useState, useEffect } from "react";
import "../../styles/viewfile.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { Buttons } from "../../assets/buttons";
import instance from "../../axios/axios";

const ViewFile = () => {
	const param = useParams();

	const [file, setFile] = useState(null);

	useEffect(() => {
		instance
			.get(`/tickets/getfile/${param.id}`, {
				responseType: "blob",
				headers: {
					"Content-Type": "application/pdf",
				},
			})
			.then(response => {
				const file = new Blob([response.data], { type: "application/pdf" });
				const fileURL = URL.createObjectURL(file);
				setFile(fileURL);
			})
			.catch(error => {
				if (error.response.status === 401) {
					window.location.href = "/login";
				}

				if (error.response) {
					toast.error(error.response.data.message);
				}
			});
	}, [param]);

	return (
		<>
			<div className="viewfile-container">
				{file && (
					<iframe src={file} title="file" width="100%" height="100%"></iframe>
				)}

				<div className="viewfile-button-container">
					<Buttons
						buttonSize="btn--medium"
						buttonStyle="btn--primary--solid"
						onClick={() => (window.location.href = "/dashboard")}
					>
						REDIRECT TO DASHBOARD
					</Buttons>
				</div>
			</div>
		</>
	);
};

export default ViewFile;
