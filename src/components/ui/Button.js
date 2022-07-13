import '../../index.css';

const Button = (props) => {
	const { children } = props;

	return (
		<button className="w-full border shadow-md py-3" {...props}>
			{children}
		</button>
	);
};

export default Button;
