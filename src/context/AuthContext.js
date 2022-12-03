import { createContext, useReducer, useContext, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			return { user: action.payload };
		case "LOGOUT":
			return { user: null };
		default:
			return state;
	}
};

export const useAuthContext = () => {
	const context = useContext(AuthContext);
	return context;
};

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(authReducer, {
		user: null,
	});

	useEffect(() => {
		const user = JSON.parse(sessionStorage.getItem("user"));
		if (user) {
			dispatch({ type: "LOGIN", payload: user });
		}
		const userLogged = JSON.parse(sessionStorage.getItem("loggedAt"));

		if (userLogged) {
			const currentTime = Date.now();
			const timeDifference = currentTime - userLogged;
			const minutes = Math.floor(timeDifference / 1000 / 60);
			if (minutes >= 60) {
				sessionStorage.removeItem("authToken");
				sessionStorage.removeItem("loggedAt");
			}

			console.log("Your session will expire within 1 hour");
			console.log("Session time: " + minutes + " minutes");
		}
	}, []);

	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};
