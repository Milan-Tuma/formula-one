import { useState } from 'react';

import DataList from '../DataList/DataList';
import RaceDetail from '../RaceDetail/RaceDetail';
import Modal from '../ui/Modal';

import '../../index.css';

const RaceSelector = ({ setRace, racesData, currRace }) => {
	const [openModal, setOpenModal] = useState(false);

	const season = racesData.season;

	const raceCalendar = racesData.Races.map((race, i) => {
		return (
			<RaceDetail key={i} setRaceData={setRace} raceData={race} index={i + 1} />
		);
	});

	return (
		<div className="md:hidden block px-5 mt-5 mb-2">
			<p
				className="flex max-w-fit mx-auto text-gray-600"
				onClick={() => setOpenModal(!openModal)}
			>
				Data for:
				<span className="ml-1 text-black underline">
					{currRace && racesData.Races[currRace - 1].Circuit.circuitName}
				</span>
			</p>
			{openModal && (
				<Modal closeModal={() => setOpenModal(false)} title={season}>
					<DataList>{raceCalendar}</DataList>
				</Modal>
			)}
		</div>
	);
};

export default RaceSelector;
