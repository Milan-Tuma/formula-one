import { useState } from 'react';

import DataList from '../data-list/DataList';
import RaceDetail from '../race-detail/RaceDetail';
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
		<div className="md:hidden sm:block px-5 my-5">
			<p
				className="flex flex-col items-center"
				onClick={() => setOpenModal(!openModal)}
			>
				<span className="font-bold border border-solid border-gray-800 px-2 py-1 rounded-md bg-gray-100 shadow">
					Click here to select race
				</span>
				<span className="text-gray-600 mt-1">
					Current race:{' '}
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
