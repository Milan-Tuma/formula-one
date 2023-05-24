import { FC } from 'react';

type ModalProps = {
	children: JSX.Element;
	closeModal: () => void;
	title?: string;
};

const Modal: FC<ModalProps> = ({ children, closeModal, title }) => {
	return (
		<div className="fixed z-10 inset-0 bg-gray-900 h-full text-white overflow-y-scroll">
			<div className="flex w-full justify-between px-5 py-2">
				{title && <div className="font-bold text-xl">{title}</div>}
				<button
					className="border border-solid border-white px-2 rounded-md ml-auto"
					onClick={closeModal}
				>
					Close
				</button>
			</div>
			<div className="border-t border-solid border-gray-600">{children}</div>
		</div>
	);
};

export default Modal;
