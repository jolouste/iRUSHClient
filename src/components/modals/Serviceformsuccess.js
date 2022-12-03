import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../styles/serviceformsuccess.css";
import ustLogo from "../../images/img/UST_logoblack.png";
import ustTiger from "../../images/img/Tiger_clipart.png";
import { Buttons } from "../../assets/buttons";
import { Link as Links } from "react-router-dom";
import instanceNoAuth from "../../axios/instanceNoAuth";

export const Serviceformsuccess = () => {
	const param = useParams();

	const [data, setData] = useState({
		referenceNumber: "",
	});

	useEffect(() => {
		const fetchServiceData = async () => {
			try {
				await instanceNoAuth
					.get(`/clients/clientrequest/${param.id}`)
					.then(response => {
						console.log(response.data);
						let clientData = response.data.client;
						setData(clientData);
					});
			} catch (error) {
				console.log(error);
			}
		};

		fetchServiceData();
	}, [param]);

	return (
		<>
			<div className="container-serviceformsuccess">
				<div className="container-serviceformsuccess__wrapper">
					<div className="serviceformsuccess--container__header">
						<div className="serviceformsuccessheader__logo">
							<img id="serviceformsuccess-ustlogoblck" src={ustLogo} alt="" />
						</div>

						<div className="serviceformsuccessheader__text">
							<h6 id="serviceformsuccessheader__ust"> Pontifical and Royal </h6>
							<h1 id="serviceformsuccessheader__ust-sch">
								University of Santo Tomas
							</h1>
							<h6 id="serviceformsuccessheader__ust">
								The Catholic University of the Philippines
							</h6>
						</div>
					</div>

					<div className="serviceformsuccess--container__content">
						<div className="serviceformsuccesscontent__tiger">
							<img id="serviceformsuccess-tiger" src={ustTiger} alt="" />
						</div>

						<div className="serviceformsuccesscontent__texts">
							<div className="serviceformsuccesscontent-text__header">
								<h1> Successfully requested a service </h1>
								<h1>
									<span> Reference No.: </span>
									{data.referenceNumber}
								</h1>
							</div>

							<div className="serviceformsuccesscontent-text__paragraph">
								<p>
									Please do check your mail inbox for the updates regarding your
									ticket.
								</p>
								<p>Thank you for your patience.</p>
							</div>

							<div className="serviceformsuccesscontent-text__buttons">
								<Links to="/">
									<div className="serviceformsuccess-button">
										<Buttons
											buttonSize="btn--medium__average"
											buttonStyle="btn--longhead__success"
										>
											REDIRECT ME TO HOMEPAGE
										</Buttons>
									</div>
								</Links>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
