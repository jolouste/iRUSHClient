import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/reopenticketpage.css";
import ustLogoblck from "../images/img/UST_logoblack.png";
import Circularspinner from "../components/spinner/Circularspinner";
import ResolvedTicketsClientList from "../components/clientresolvedticket/ResolvedTicketsClientList";
import Pagebroken from "../components/Pagebroken";
import instanceNoAuth from "../axios/instanceNoAuth";

const Reopenticket = () => {
	const param = useParams();
	const [loading, setLoading] = useState(false);
	const [requestedResolvedTickets, setRequestedResolvedTickets] = useState([]);
	const [validUrl, setValidUrl] = useState(false);

	useEffect(() => {
		const verifyUrl = async () => {
			setValidUrl(true);
			try {
				setLoading(true);
				await instanceNoAuth
					.get(`/clients/client/${param.id}/${param.token}/requestedtickets`)
					.then(response => {
						let requestedTicketsData = response.data.requestedTickets;
						setRequestedResolvedTickets(requestedTicketsData);
					});
			} catch (error) {
				setValidUrl(false);
			}

			setLoading(false);
		};

		verifyUrl();
	}, [param]);

	return (
		<>
			{validUrl ? (
				<>
					<div className="reopenticket-container">
						<div className="reopenticket-container__wrapper">
							<div className="reopenticket-container__header">
								<Link to="/" style={{ color: "#000" }}>
									<div className="reopenticket-header">
										<div className="reopenticket-header__logo">
											<img
												id="reopenticket-ustlogoblck"
												src={ustLogoblck}
												alt=" "
											/>
										</div>
										<div className="reopenticket-header--text">
											<h6 id="reopenticketheader__ust">
												{" "}
												Pontifical and Royal{" "}
											</h6>
											<h1 id="reopenticketheader__ust-sch">
												University of Santo Tomas
											</h1>
											<h6 id="reopenticketheader__ust">
												The Catholic University of the Philippines
											</h6>
										</div>
									</div>
								</Link>
							</div>

							<div className="reopenticketrequest-container__form">
								<>
									{!loading ? (
										<>
											<div className="requestedtickets-table__form">
												<h2> Requested Tickets </h2>
											</div>

											<div className="requestedticket-datatablelist">
												<ResolvedTicketsClientList
													loading={loading}
													requestedResolvedTickets={requestedResolvedTickets}
													setRequestedResolvedTickets={
														setRequestedResolvedTickets
													}
													clientId={param.id}
													token={param.token}
												/>
											</div>
										</>
									) : (
										<Circularspinner />
									)}
								</>
							</div>
						</div>
					</div>
				</>
			) : (
				<Pagebroken />
			)}
		</>
	);
};

export default Reopenticket;
