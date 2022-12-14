import React, { useState, useEffect } from "react";
import "../../styles/viewfile.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { Buttons } from "../../assets/buttons";
import instance from "../../axios/axios";
import Header from "../../components/Header";
import AdminNavbar from "../../components/navbar/AdminNavbar";

const ViewFile = () => {
	const param = useParams();

	const [file, setFile] = useState(null);

	useEffect(() => {
		instance
			.get(`/tickets/getfile/${param.id}`, {
				responseType: "blob",

				headers: {
					"Content-Type":
						"application/pdf" ||
						"image/png" ||
						"image/jpeg" ||
						"image/jpg" ||
						"application/vnd.ms-excel" ||
						"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
						"text/csv",
				},
			})
			.then(response => {
				const file = new Blob([response.data], {
					//check the file type and set the correct mime type
					type: response.headers["content-type"],
				});
				const fileURL = URL.createObjectURL(file);
				setFile(fileURL);

				console.log(file);
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
			<div className="requestservice-container">
				<div className="requestservice-container__wrapper">
					<div className="requestservice-container__nav">
						<AdminNavbar />
					</div>
					<div className="requestservice-container__content">
						<div className="requestservice-container__header">
							<Header />
						</div>

						<div className="viewfile-container__content__wrapper">
							<div className="viewfile-container">
								{file && (
									<iframe
										src={file}
										title="file"
										width="100%"
										height="100%"
										frameBorder="0"
									></iframe>
								)}
								<div className="viewfile-button-container">
									<Buttons
										buttonSize="btn--medium"
										buttonStyle="btn--primary--solid"
										onClick={() => window.open(file, "_blank")}
									>
										OPEN FILE IN NEW TAB
									</Buttons>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ViewFile;
