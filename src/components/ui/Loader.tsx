import { FC } from 'react';
import './Loader.css';

const Loader: FC = () => {
	return (
		<div className="lds-ring" aria-hidden="true">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};

export default Loader;
