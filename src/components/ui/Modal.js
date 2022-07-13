const Modal = ({ children, closeModal, title = '' }) => {
	return (
		<div className="fixed inset-0 bg-gray-900 h-full text-white overflow-y-scroll">
			<div className="flex w-full justify-between px-5 py-2">
				<div className="font-bold text-xl">{title}</div>
				<button
					className="border border-solid border-white px-2 rounded-md"
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
