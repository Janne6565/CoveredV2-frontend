import { useState, useEffect } from "react";

export function useCurrentLocation() {
	const [location, setLocation] = useState({
		pathname: window.location.pathname,
		search: window.location.search,
		hash: window.location.hash,
	});

	useEffect(() => {
		const updateLocation = () => {
			setLocation({
				pathname: window.location.pathname,
				search: window.location.search,
				hash: window.location.hash,
			});
		};

		window.addEventListener("popstate", updateLocation);
		window.addEventListener("hashchange", updateLocation);

		return () => {
			window.removeEventListener("popstate", updateLocation);
			window.removeEventListener("hashchange", updateLocation);
		};
	}, []);

	return location;
}
