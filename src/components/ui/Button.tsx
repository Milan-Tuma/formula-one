import { FC } from 'react';
import '../../index.css';

interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
	children: JSX.Element;
}

const Button: FC<ButtonProps> = ({ children, title, ...delegated }) => {
	return <button {...delegated}>{children}</button>;
};

export default Button;
