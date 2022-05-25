const RaceCountdown = ({ diff }) => {
	const days = Math.floor(diff / 1000 / 60 / 60 / 24);
	const hours = Math.floor(diff / 1000 / 60 / 60 - days * 24);
	const minutes = Math.ceil(diff / 1000 / 60 - days * 24 * 60 - hours * 60);

	const formatValue = (value) => {
		return value < 10 ? '0' + value : value;
	};

	return (
		<div>
			Next race in: {formatValue(days)} days : {formatValue(hours)} hours : {''}
			{formatValue(minutes)} minutes
		</div>
	);
};

export default RaceCountdown;
