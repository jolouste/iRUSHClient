import { Outlet, Navigate } from "react-router-dom";
import Pagebroken from "../components/Pagebroken";

const HelpdeskRoutes = () => {
	const token = sessionStorage.getItem("authToken");
	const tokenRole = sessionStorage.getItem("clerkRole");

	if (!token && !tokenRole) {
		return <Pagebroken />;
	} else if (token && tokenRole === "CLERK_HELPDESKSUPPORT") {
		return <Outlet />;
	} else if ((token && !tokenRole) || (!token && tokenRole)) {
		return <Navigate to="/login" />;
	} else if (token && !tokenRole !== "CLERK_HELPDESKSUPPORT") {
		return <Pagebroken />;
	}
};

export default HelpdeskRoutes;
