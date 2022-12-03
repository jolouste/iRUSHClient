import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/likertsurvey.css";
import { Buttons } from "../assets/buttons";
import ustLogoblck from "../images/img/UST_logoblack.png";
import { useParams, Link } from "react-router-dom";
import Circularspinner from "../components/spinner/Circularspinner";
import { LikertFeedBackModal } from "../components/modals/LikertFeedBackModal";
import Pagebroken from "../components/Pagebroken";
import instanceNoAuth from "../axios/instanceNoAuth";

const LikertSurvey = () => {
	const [loading, setLoading] = useState(false);
	const [validUrl, setValidUrl] = useState(false);
	const param = useParams();
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [likertData, setLikertData] = useState({
		rating: "",
	});
	useEffect(() => {
		const getSurvey = async () => {
			setValidUrl(true);

			try {
				setLoading(true);
				await instanceNoAuth

					.get(`/tickets/likertscale/${param.id}/${param.token}`)
					.then(response => {
						console.log(response.data);
					});
			} catch (error) {
				setValidUrl(false);
			}

			setLoading(false);
		};

		getSurvey();
	}, [param]);

	const handleChange = ({ currentTarget: input }) => {
		setLikertData({ ...likertData, [input.name]: input.value });
	};

	const likertScaleOption = [
		{
			id: 1,
			value: "Excellent",
			label: "Excellent",
		},
		{
			id: 2,
			value: "Good",
			label: "Good",
		},
		{
			id: 3,
			value: "Poor",
			label: "Poor",
		},
		{
			id: 4,
			value: "Bad",
			label: "Bad",
		},
	];

	const handleSubmit = async e => {
		e.preventDefault();
		setLoading(true);
		try {
			await instanceNoAuth.post(
				`/tickets/likertscale/${param.id}/${param.token}`,
				likertData
			);
			setIsSubmitted(true);
			toast.success("Thank you for your feedback!");
		} catch (error) {
			toast.error(error.response.data.message);
		}
		setLoading(false);
	};

	return (
		<>
			{validUrl ? (
				<div className="likert-container">
					{!isSubmitted ? (
						<>
							<div className="likert-container__wrapper">
								<div
									className="servicerequest-container__header"
									style={{ paddingTop: "50px" }}
								>
									<Link to="/" style={{ color: "#000" }}>
										<div className="servicerequest-header">
											<div className="servicerequest-header__logo">
												<img
													id="servicereq-ustlogoblck"
													src={ustLogoblck}
													alt=" "
												/>
											</div>

											<div className="servicerequest-header--text">
												<h6 id="servicereqheader__ust">
													{" "}
													Pontifical and Royal{" "}
												</h6>
												<h1 id="servicereqheader__ust-sch">
													University of Santo Tomas
												</h1>
												<h6 id="servicereqheader__ust">
													The Catholic University of the Philippines
												</h6>
											</div>
										</div>
									</Link>
								</div>

								{!loading ? (
									<>
										<div className="likert-container__form">
											<div className="likert-container__form__wrapper">
												<div className="likert-form__clientdetails">
													<div className="clientdetails-thirdlayer">
														<div className="container-clientdetails__category">
															<div
																className="clientdetails__category"
																style={{ textAlign: "center" }}
															>
																<label>HELP US IMPROVE</label>
															</div>
															<br />
															<div className="clientdetails__category">
																<label>
																	For further improvements, please rate our
																	services.
																</label>
															</div>
															<div className="cotainer-course__clientinput">
																<div className="clientcategory-input">
																	<select
																		className="form-client__input--category"
																		onChange={handleChange}
																		name="rating"
																		value={likertData.rating}
																	>
																		<option
																			disabled
																			label="Choose one"
																		></option>
																		{likertScaleOption.map(likert => (
																			<option
																				key={likert.id}
																				name="rating"
																				value={likert.value}
																			>
																				{likert.label}
																			</option>
																		))}
																	</select>
																</div>
															</div>
														</div>
													</div>

													<div className="container-clientdetails__formbutton">
														<div className="clientdetails__formbutton">
															<Buttons
																buttonSize="btn--medium"
																buttonStyle="btn--primary__solid"
																onClick={handleSubmit}
															>
																Submit
															</Buttons>
														</div>
													</div>
												</div>
											</div>
										</div>
									</>
								) : (
									<Circularspinner />
								)}
							</div>
						</>
					) : (
						<LikertFeedBackModal />
					)}
				</div>
			) : (
				<Pagebroken />
			)}
		</>
	);
};

export default LikertSurvey;
