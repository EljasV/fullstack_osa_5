const ErrorNotification = ({ errorMessage }) => {
	if (!errorMessage) {
		return <></>
	}
	const errorStyle = {
		color: "red",
		borderColor: "red",
		border: "solid"
	}
	return <h2 style={errorStyle}>{errorMessage}</h2>
}

export default ErrorNotification