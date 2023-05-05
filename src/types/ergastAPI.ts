export interface DriverType {
	driverId: string;
	permanentNumber: string;
	code: string;
	url: string;
	givenName: string;
	familyName: string;
	dateOfBirth: string;
	nationality: string;
}

export interface ConstructorType {
	constructorId: string;
	url: string;
	name: string;
	nationality: string;
}

export interface StandingsType {
	position: string;
	positionText: string;
	points: string;
	wins: string;
}

export interface FastestLapType {
	AverageSpeed: {
		units: 'kph';
		speed: string;
	};
	Time: TimeType;
	lap: string;
	rank: string;
}

export interface TimeType {
	millis: string;
	time: string;
}

export type raceResultType = {
	MRData: {
		xmlns: string;
		series: string;
		url: string;
		limit: string;
		offset: string;
		total: string;
		RaceTable: {
			season: string;
			round: string;
			Races: [
				{
					season: string;
					round: string;
					url: string;
					raceName: string;
					Circuit: {
						circuitId: string;
						url: string;
						circuitName: string;
						Location: {
							lat: string;
							long: string;
							locality: string;
							country: string;
						};
					};
					date: string;
					time: string;
					Results: [
						{
							number: string;
							Driver: DriverType;
							Constructor: ConstructorType;
							grid: string;
							laps: string;
							status: string;
							Time: TimeType;
							FastestLap: FastestLapType;
						} & Omit<StandingsType, 'wins'>
					];
				}
			];
		};
	};
};

export type driverStandingsType = {
	MRData: {
		xmlns: string;
		series: string;
		url: string;
		limit: string;
		offset: string;
		total: string;
		StandingsTable: {
			season: string;
			round: string;
			StandingsLists: [
				{
					season: string;
					round: string;
					DriverStandings: [
						{
							Driver: DriverType;
							Constructor: ConstructorType;
						} & StandingsType
					];
				}
			];
		};
	};
};

export type constructorStandingsType = {
	MRData: {
		xmlns: string;
		series: string;
		url: string;
		limit: string;
		offset: string;
		total: string;
		StandingsTable: {
			season: string;
			round: string;
			StandingsLists: [
				{
					season: string;
					round: string;
					ConstructorStandings: [
						{
							Constructor: ConstructorType;
						} & StandingsType
					];
				}
			];
		};
	};
};
