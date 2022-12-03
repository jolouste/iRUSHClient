import { useAuthContext } from "../context/AuthContext";

export const useLogout = () => {
	const { dispatch } = useAuthContext();

	const logout = () => {
		sessionStorage.clear();
		window.location.pathname = "/";
		dispatch({ type: "LOGOUT" });
	};

	return { logout };
};
