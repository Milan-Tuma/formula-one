export const finishedRaces = (data: any) => {
	if (!data) return;
	return data.Races.filter((race: any) => new Date(race.date) < new Date())
		.length;
};
