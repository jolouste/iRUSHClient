import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//PAGES FOR CLIENT
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Forgotpassword from "./pages/Forgotpassword";
import Servicerequest from "./pages/Servicerequest";
import Reopenticket from "./pages/Reopenticket";
import Passwordreset from "./pages/Passwordreset";
import Pagebroken from "./components/Pagebroken";
import ReopenticketData from "./pages/ReopenticketData";
import LikertSurvey from "./pages/LikertSurvey";
//ROUTES FOR ADMIN, HELPDESK, IT SUPPORT. (PRIVATE ROUTES)
import AdminRoutes from "./private/AdminRoutes";
import HelpdeskRoutes from "./private/HelpdeskRoutes";
import ItsupportRoutes from "./private/ItsupportRoutes";
//ADMIN ROUTES
import Dashboard from "./pages/admin/Dashboard";
import Requests from "./pages/admin/Requests";
import Settings from "./pages/admin/Settings";
import CategoryData from "./components/settings/CategoryData";
import Tickets from "./pages/admin/Tickets";
import RequestedTicket from "./pages/admin/RequestedTicket";
import NewServiceRequests from "./pages/admin/NewServiceRequests";
import RejectedServiceRequests from "./pages/admin/RejectedServiceRequests";
import ReopenedServicecRequests from "./pages/admin/ReopenedServiceRequests";
import RejectReasonData from "./components/settings/RejectReasonData";
import SolutionData from "./components/settings/SolutionData";
import VoidReasonData from "./components/settings/VoidReasonData";
import UserData from "./components/settings/UserData";
import Profile from "./components/userprofilecomponent/Profile";
//HELPDESK SUPPORT ROUTES
import HelpdeskDashboard from "./pages/helpdesksupport/HelpdeskDashboard";
import HelpdeskTickets from "./pages/helpdesksupport/HelpdeskTickets";
import HelpdeskRequests from "./pages/helpdesksupport/HelpdeskRequests";
import HelpdeskProfile from "./components/userprofilecomponent/HelpdeskProfile";
import TicketData from "./pages/helpdesksupport/TicketData";
import HelpdeskNewServiceRequestsData from "./pages/helpdesksupport/requests/HelpdeskNewServiceRequestsData";
import HelpdeskRejectedServiceRequestsData from "./pages/helpdesksupport/requests/HelpdeskRejectedServiceRequestsData";
import HelpdeskReopenedTicketRequestsData from "./pages/helpdesksupport/requests/HelpdeskReopenedTicketRequestsData";
import HelpdeskViewFile from "./pages/helpdesksupport/HelpdeskViewFile";

//IT SUPPORT ROUTES
import ItDashboard from "./pages/itsupport/ItDashboard";
import ItTickets from "./pages/itsupport/ItTickets";
import ItProfile from "./components/userprofilecomponent/ItProfile";
import ItTicketData from "./pages/itsupport/ItTicketData";
import ViewFile from "./pages/admin/ViewFile";

function App() {
	const [loading, setLoading] = useState(true);
	const spinner = document.getElementById("spinner");

	if (spinner) {
		setTimeout(() => {
			spinner.style.display = "none";
			setLoading(false);
		}, 800);
	}

	return (
		!loading && (
			<div className="App">
				<Router>
					<Routes>
						<Route exact path="/" element={<Homepage />} />
						<Route exact path="/login" element={<Login />} />
						<Route exact path="/forgotpassword" element={<Forgotpassword />} />
						<Route
							exact
							path="/resetpassword/:id/verify/:token"
							element={<Passwordreset />}
						/>

						<Route
							exact
							path="/clientrequest/:id/request/:token"
							element={<Servicerequest />}
						/>

						<Route
							exact
							path="/client/:id/:token/requestedtickets"
							element={<Reopenticket />}
						/>
						<Route
							exact
							path="/client/:id/:token/requestedtickets/:ticketId"
							element={<ReopenticketData />}
						/>
						<Route
							exact
							path="/likertscale/:id/:token"
							element={<LikertSurvey />}
						/>
						{/* ADMIN ROUTES */}

						<Route element={<AdminRoutes />}>
							<Route exact path="/dashboard" element={<Dashboard />} />
							<Route exact path="/servicerequests" element={<Requests />} />
							<Route
								exact
								path="/servicerequests/:id"
								element={<NewServiceRequests />}
							/>
							<Route
								exact
								path="/rejectedservicerequests/:id"
								element={<RejectedServiceRequests />}
							/>
							<Route
								exact
								path="/reopenedticketrequests/:id"
								element={<ReopenedServicecRequests />}
							/>
							<Route exact path="/settings" element={<Settings />} />
							<Route
								exact
								path="/settings/category/:id"
								element={<CategoryData />}
							/>
							<Route exact path="/settings/user/:id" element={<UserData />} />
							<Route
								exact
								path="/settings/rejectreason/:id"
								element={<RejectReasonData />}
							/>
							<Route
								exact
								path="/settings/resolvingsolution/:id"
								element={<SolutionData />}
							/>
							<Route
								exact
								path="/settings/voidreason/:id"
								element={<VoidReasonData />}
							/>
							<Route
								exact
								path="/servicerequests/getfile/:id"
								element={<ViewFile />}
							/>
							<Route exact path="/tickets" element={<Tickets />} />
							<Route exact path="/tickets/:id" element={<RequestedTicket />} />
							<Route exact path="/profile/:id" element={<Profile />} />
							<Route exact path="*" element={<Pagebroken />} />
						</Route>

						{/* HELPDESK ROUTES */}

						<Route element={<HelpdeskRoutes />}>
							<Route
								exact
								path="/helpdesksupport/dashboard"
								element={<HelpdeskDashboard />}
							/>
							<Route
								exact
								path="/helpdesksupport/servicerequests"
								element={<HelpdeskRequests />}
							/>
							<Route
								exact
								path="/helpdesksupport/tickets"
								element={<HelpdeskTickets />}
							/>
							<Route
								exact
								path="/helpdesksupport/tickets/:id"
								element={<TicketData />}
							/>
							<Route
								exact
								path="/helpdesksupport/profile/:id"
								element={<HelpdeskProfile />}
							/>
							<Route
								exact
								path="/helpdesksupport/servicerequests/:id"
								element={<HelpdeskNewServiceRequestsData />}
							/>
							<Route
								exact
								path="/helpdesksupport/rejectedservicerequests/:id"
								element={<HelpdeskRejectedServiceRequestsData />}
							/>
							<Route
								exact
								path="/helpdesksupport/reopenedticketrequests/:id"
								element={<HelpdeskReopenedTicketRequestsData />}
							/>
							<Route
								exact
								path="/helpdesksupport/servicerequests/getfile/:id"
								element={<HelpdeskViewFile />}
							/>
							<Route exact path="*" element={<Pagebroken />} />
						</Route>

						{/* ITSUPPORT ROUTES */}

						<Route element={<ItsupportRoutes />}>
							<Route
								exact
								path="/itsupport/dashboard"
								element={<ItDashboard />}
							/>
							<Route exact path="/itsupport/tickets" element={<ItTickets />} />
							<Route
								exact
								path="/itsupport/profile/:id"
								element={<ItProfile />}
							/>
							<Route
								exact
								path="/itsupport/tickets/:id"
								element={<ItTicketData />}
							/>
						</Route>

						<Route path="*" element={<Pagebroken />} />
					</Routes>
				</Router>

				<ToastContainer />
			</div>
		)
	);
}

export default App;
