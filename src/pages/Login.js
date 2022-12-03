import React, { useState } from "react";
import "../styles/login.css";
import { Link } from "react-router-dom";
import { Buttons } from "../assets/buttons";
import ustLogoblck from "../images/img/UST_logoblack.png";
import Textfield from "@mui/material/TextField";
import Circularspinner from "../components/spinner/Circularspinner";
import { useLogin } from "../hooks/useLogin";

function Login() {
	const blueishLink = { color: "#00A0E4" };
	const defaultLink = { color: "#000" };
	const [userData, setUserData] = useState({ email: "", password: "" });
	const { login, loading, error } = useLogin();

	const handleChange = ({ currentTarget: input }) => {
		setUserData({ ...userData, [input.name]: input.value });
	};

	const handleSubmit = async e => {
		e.preventDefault();
		await login(userData.email, userData.password);
	};

	return (
		<>
			<div className="login-container">
				<div className="login-container__wrapper">
					<Link style={defaultLink} to="/">
						<div className="container-loginheader">
							<div className="loginheader__logo">
								<img id="login-ustlogoblck" src={ustLogoblck} alt=" " />
							</div>
							<div className="loginheader--text">
								<h6 id="loginheader__ust"> Pontifical and Royal </h6>
								<h1 id="loginheader__ust-sch"> University of Santo Tomas </h1>
								<h6 id="loginheader__ust">
									The Catholic University of the Philippines
								</h6>
							</div>
						</div>
					</Link>
					{!loading ? (
						<>
							<form onSubmit={handleSubmit}>
								<div className="login-container__user">
									<div className="login-container__user--wrapper">
										<>
											<div className="container-user__emailaddress">
												<div className="user-input__emailaddress">
													<Textfield
														className="userinput__emailaddress"
														label="EMAIL ADDRESS"
														type="email"
														name="email"
														onChange={handleChange}
														value={userData.email}
													/>
												</div>
											</div>
											<div className="container-user__password">
												<div className="user-input__password">
													<Textfield
														className="userinput__password"
														label="PASSWORD"
														type="password"
														name="password"
														onChange={handleChange}
														value={userData.password}
													/>
												</div>
											</div>
											{error && <div className="error_message">{error}</div>}
											<div className="login-container__button">
												<div className="button-user__login">
													<Buttons
														buttonSize="btn--medium"
														buttonStyle="btn--longhead__solid"
													>
														LOGIN
													</Buttons>
												</div>
											</div>
											<div className="login-container__forgotpass">
												<Link style={blueishLink} to="/forgotpassword">
													<div className="forgotpass-text">
														Forgot Password?
													</div>
												</Link>
											</div>
										</>
									</div>
								</div>
							</form>
						</>
					) : (
						<div className="login-container__loading">
							<Circularspinner />
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default Login;
