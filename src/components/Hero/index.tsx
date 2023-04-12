import Modal from '../ui/Modal';
import { FC, useState } from 'react';

type HeroProps = {
	headline: string;
	year?: number;
};

const Hero: FC<HeroProps> = ({ headline, year }) => {
	const [openModal, setOpenModal] = useState<boolean>(false);

	return (
		<>
			<div className="w-full bg-red-600 py-2 px-4">
				<div className="flex justify-between text-white text-xl">
					<h1 className="font-bold">{headline}</h1>
					<div className="" onClick={() => setOpenModal(true)}>
						<i className="fa-solid fa-bars" />
					</div>
				</div>
				{year && (
					<div className="text-neutral-200 mt-2">
						Race calendar for <span className="font-bold">{year}</span>
					</div>
				)}
			</div>
			{openModal && (
				<Modal closeModal={() => setOpenModal(false)} title={`${year}` ?? ''}>
					<div>
						<input
							type="number"
							value={year}
							onChange={(e) => console.log(e.target.value)}
						/>
					</div>
				</Modal>
			)}
		</>
	);
};

export default Hero;
