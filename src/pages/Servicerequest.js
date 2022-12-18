import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/servicerequest.css";
import { Buttons } from "../assets/buttons";
import ustLogoblck from "../images/img/UST_logoblack.png";
import { useParams, useNavigate as navigate, Link } from "react-router-dom";
import Circularspinner from "../components/spinner/Circularspinner";
import { Serviceformsuccess } from "../components/modals/Serviceformsuccess";
import Pagebroken from "../components/Pagebroken";
import instanceNoAuth from "../axios/instanceNoAuth";

function Servicerequest() {
	const subject = [
		{ _id: 1, title: "Submission of missing documents" },
		{ _id: 2, title: "Shifting/Transfer" },
		{ _id: 3, title: "Transcripts of Records" },
		{ _id: 4, title: "Updating Information" },
	];

	const [validUrl, setValidUrl] = useState(false);
	const [clientData, setClientData] = useState({
		firstName: "",
		lastName: "",
		contactNum: "",
		unit: "",
		course: " ",
	});

	const [category, setCategory] = useState([]);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [formCategory, setFormCategory] = useState("");
	const [formSubject, setFormSubject] = useState("");
	const [formDescription, setFormDescription] = useState("");
	const [attachments, setAttachments] = useState("");

	const param = useParams();

	useEffect(() => {
		instanceNoAuth.get(`/settings/fetchcategory`).then(response => {
			setCategory(response.data);
		});
	}, []);

	useEffect(() => {
		const verifyEmailUrl = async () => {
			setValidUrl(true);
			try {
				setIsLoading(true);
				await instanceNoAuth
					.get(`/clients/clientrequest/${param.id}/request/${param.token}`)
					.then(response => {
						let client = response.data.client;
						setClientData(client);
					});
			} catch (error) {
				setValidUrl(false);
			}

			setIsLoading(false);
		};

		verifyEmailUrl();
	}, [param]);

	const onFileChange = e => {
		setAttachments(e.target.files[0]);
	};

	const handleSubmit = async e => {
		e.preventDefault();

		const formData = new FormData();

		formData.append("category", formCategory);
		formData.append("description", formDescription);
		formData.append("subject", formSubject);
		formData.append("attachments", attachments);
		setFormCategory("");
		setFormDescription("");
		setFormSubject("");
		setAttachments("");
		setIsLoading(true);

		try {
			await instanceNoAuth.post(
				`/clients/clientrequest/${param.id}/request/${param.token}`,
				formData
			);
			setIsSubmitted(true);
			navigate(`/clientrequest/${param.id}`);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				toast.error(error.response.data.message);
			}
		}

		setIsLoading(false);
	};

	return (
		<>
			{validUrl ? (
				<div className="servicerequest-container">
					{!isSubmitted ? (
						<>
							<div className="servicerequest-container__wrapper">
								<div className="servicerequest-container__header">
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

								<form onSubmit={handleSubmit} encType="multipart/form-data">
									{!isLoading ? (
										<>
											<div className="servicerequest-container__form">
												<div className="servicerequest-form">
													<h2> Service Request </h2>
												</div>

												<div className="servicerequest-form__note">
													<div className="servicerequest-note__reminder">
														<h6>
															<span id="asterisk"> &lowast; </span> Implies
															required field
														</h6>
													</div>
												</div>

												<div className="servicerequest-form__clientdetails">
													<div className="clientdetails-firstlayer">
														<div className="container-clientdetails__name">
															<div className="clientdetails__name">
																<label> Name </label>
															</div>
															<div className="cotainer-name__clientinput">
																<div className="clientname-input">
																	<p className="form-client__input">
																		{clientData.lastName},{" "}
																		{clientData.firstName}
																	</p>
																</div>
															</div>
														</div>
														<div className="container-clientdetails__contactnum">
															<div className="clientdetails__contactnumber">
																<label> Contact Number </label>
															</div>

															<div className="cotainer-contactnumber__clientinput">
																<div className="clientcontactnumber-input">
																	<p className="form-client__input">
																		{clientData.contactNum}
																	</p>
																</div>
															</div>
														</div>
													</div>

													<div className="clientdetails-secondlayer">
														<div className="container-clientdetails__unit">
															<div className="clientdetails__unit">
																<label> Unit </label>
															</div>
															<div className="cotainer-unit__clientinput">
																<div className="clientunit-input">
																	<p className="form-client__input">
																		{clientData.unit}
																	</p>
																</div>
															</div>
														</div>

														<div className="container-clientdetails__course">
															<div className="clientdetails__course">
																<label> Program </label>
															</div>
															<div className="cotainer-course__clientinput">
																<div className="clientcourse-input">
																	<p className="form-client__input">
																		{clientData.course}
																	</p>
																</div>
															</div>
														</div>
													</div>

													<div className="clientdetails-thirdlayer">
														<div className="container-clientdetails__category">
															<div className="clientdetails__category">
																<label>
																	Category <span id="asterisk"> &lowast;</span>
																</label>
															</div>
															<div className="cotainer-category__clientinput">
																<div className="clientcategory-input">
																	<select
																		className="form-client__input--category"
																		name="category"
																		value={formCategory}
																		onChange={e =>
																			setFormCategory(e.target.value)
																		}
																	>
																		<option
																			disabled
																			label="Choose one"
																		></option>
																		{category.map(category => (
																			<option
																				key={category._id}
																				name="category"
																				value={category.value}
																			>
																				{category.categoryName}
																			</option>
																		))}
																	</select>
																</div>
															</div>
														</div>
													</div>

													<div className="clientdetails-fourthlayer">
														<div className="container-clientdetails__subject">
															<div className="clientdetails__subject">
																<label>
																	Subject <span id="asterisk"> &lowast;</span>
																</label>
															</div>
															<div className="cotainer-subject__clientinput">
																<div className="clientsubject-input">
																	<select
																		className="form-client__input--subject"
																		name="subject"
																		value={formSubject}
																		onChange={e =>
																			setFormSubject(e.target.value)
																		}
																	>
																		<option
																			disabled
																			label="Choose one"
																		></option>
																		{subject.map(subject => (
																			<option
																				key={subject._id}
																				name="subject"
																				value={subject.value}
																			>
																				{subject.title}
																			</option>
																		))}
																	</select>
																</div>
															</div>
														</div>
													</div>

													<div className="clientdetails-fifthlayer">
														<div className="container-clientdetails__description">
															<div className="clientdetails__description">
																<label>
																	Description{" "}
																	<span id="asterisk"> &lowast;</span>
																</label>
															</div>
															<div className="cotainer-description__clientinput">
																<div className="clientdescription-input">
																	<input
																		className="form-client__input--description"
																		placeholder="Briefly discuss your concern"
																		type="text"
																		name="description"
																		value={formDescription}
																		onChange={e =>
																			setFormDescription(e.target.value)
																		}
																	/>
																</div>
															</div>
														</div>
													</div>

													<div className="clientdetails-sixthlayer">
														<div className="container-clientdetails__uploadpdf">
															<div className="clientdetails__upload">
																<label>Upload Attachments </label>
															</div>
															<div className="cotainer-upload__clientinput">
																<div className="clientupload-input">
																	<input
																		className="form-client__input--upload"
																		placeholder="Choose One"
																		id="upload-memofile"
																		type="file"
																		filename="attachments"
																		onChange={onFileChange}
																	/>
																</div>
															</div>
														</div>
													</div>

													<div className="container-clientdetails__formbutton">
														<div className="clientdetails__formbutton">
															<Buttons
																buttonSize="btn--medium"
																buttonStyle="btn--primary__solid"
															>
																Submit
															</Buttons>
														</div>
													</div>
												</div>
											</div>
										</>
									) : (
										<Circularspinner />
									)}
								</form>
							</div>
						</>
					) : (
						<Serviceformsuccess />
					)}
				</div>
			) : (
				<Pagebroken />
			)}
		</>
	);
}

export default Servicerequest;
