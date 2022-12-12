import React, { useState } from "react";
import "../styles/homepage.css";
import { Buttons } from "../assets/buttons";
import { Link } from "react-router-dom";
import RequestserviceModal from "../components/modals/RequestserviceModal";
import ustBLDG from "../images/img/UST_mainbldg.JPG";
import ustLogo from "../images/img/UST_logo.png";
import loginBTN from "../images/svg/button.svg";
import logsBTN from "../images/svg/log.svg";
import ReopenticketModal from "../components/modals/ReopenticketModal";

const Homepage = () => {
	const [RequestserviceModalOpen, setRequestserviceModalOpen] = useState(false);
	const [ReopenticketModalOpen, setReopenticketModalOpen] = useState(false);

	return (
		<>
			{RequestserviceModalOpen && (
				<RequestserviceModal
					RequestserviceOpenModal={setRequestserviceModalOpen}
				/>
			)}
			{ReopenticketModalOpen && (
				<ReopenticketModal
					setReopenticketOpenModal={setReopenticketModalOpen}
				/>
			)}

			<div className="homepage-container">
				<div className="homepage-header">
					<div className="homepage-header-container">
						<div className="header-logo">
							<img id="ustlogo" src={ustLogo} alt=" " />
						</div>

						<div className="header-title">
							<h6 id="header-title__ust"> Pontifical and Royal </h6>
							<h1 id="header-title__ust-sch"> University of Santo Tomas </h1>
							<h6 id="header-title__ust">
								The Catholic University of the Philippines
							</h6>
						</div>

						<div className="header-btns">
							<Link to="/login">
								<div className="btn-login">
									<img id="loginbtn" src={loginBTN} alt=" " />
								</div>
							</Link>

							<div className="btn-log">
								<img
									id="logsbtn"
									src={logsBTN}
									alt=" "
									onClick={() => setReopenticketModalOpen(true)}
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="container_content">
					<div className="container_content-overlay">
						<div className="content-overlay__ustbldg">
							<img id="ustbldg" src={ustBLDG} alt="" />
						</div>
					</div>
					<div className="container_content-paragraph">
						<div className="container_content-paragraph--wrapper">
							<div className="content-paragraph__header">
								{" "}
								Service Helpdesk{" "}
							</div>
							<div className="content-paragraph__text">
								This is the official service help desk of the University of
								Santo Tomas - Office of the Registrar, the custodian of academic
								records of students.
							</div>
							<div className="content-paragraph__buttons">
								<div className="btn-servicerequest">
									<Buttons
										buttonSize="btn--servicereqs"
										buttonStyle="btn--solid__servicerequest"
										className="paragraph__buttons--servicerequest"
										onClick={() => setRequestserviceModalOpen(true)}
									>
										CREATE NEW SERVICE REQUEST
									</Buttons>
								</div>
								<div className="btn-requestreopenticket">
									<Buttons
										buttonSize="btn--servicereqs"
										buttonStyle="btn--solid__reopenticket"
										className="paragraph__buttons--reopenticket"
										onClick={() => setReopenticketModalOpen(true)}
									>
										REQUEST TO REOPEN TICKET
									</Buttons>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="footer">
					<div className="footer-container">
						<span className="footer-container__copyright">
							&copy; copyright {new Date().getFullYear()}, University of Santo
							Tomas. All rights Reserved.
						</span>

						<span className="footer-container__poweredby">
							powered by: iRUSH Capstone Team
						</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default Homepage;
