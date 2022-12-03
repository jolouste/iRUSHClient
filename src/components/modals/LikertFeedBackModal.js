import React from "react";
import "../../styles/requestservicesuccess.css";
import ustLogo from "../../images/img/UST_logoblack.png";
import ustTiger from "../../images/img/Tiger_clipart.png";
import { Buttons } from "../../assets/buttons";
import { Link as Links } from "react-router-dom";

export const LikertFeedBackModal = () => {
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
								<h1> Thank you for your feedback </h1>
							</div>
							<div className="serviceformsuccesscontent-text__paragraph">
								<p>Your feedback is highly appreciated.</p>
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
