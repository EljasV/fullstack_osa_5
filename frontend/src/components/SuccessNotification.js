const SuccessNotification = ({ successInfo }) => {
	if (!successInfo) {
		return <></>
	}
	const SuccessStyle = {
		color: "green",
		borderColor: "green",
		border: "solid"

	}
	return <h2 style={SuccessStyle}>{successInfo}</h2>
}
export default SuccessNotification