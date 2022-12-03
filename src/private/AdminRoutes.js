import { Outlet, Navigate } from "react-router-dom";
import Pagebroken from "../components/Pagebroken";

const AdminRoutes = () => {
	const token = sessionStorage.getItem("authToken");
	const tokenRole = sessionStorage.getItem("clerkRole");

	if (!token && !tokenRole) {
		return <Pagebroken />;
	} else if (
		token &&
		(tokenRole === "USER_ADMIN" || tokenRole === "USER_SUPERADMIN")
	) {
		return <Outlet />;
	} else if ((token && !tokenRole) || (!token && tokenRole)) {
		return <Navigate to="/login" />;
	} else if (
		token &&
		(!tokenRole !== "USER_ADMIN" || tokenRole !== "USER_SUPERADMIN")
	) {
		return <Pagebroken />;
	}
};

export default AdminRoutes;
