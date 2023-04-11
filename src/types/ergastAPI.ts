interface DriverType {
	driverId: string;
	permanentNumber: string;
	code: string;
	url: string;
	givenName: string;
	familyName: string;
	dateOfBirth: string;
	nationality: string;
}

interface ConstructorType {
	constructorId: string;
	url: string;
	name: string;
	nationality: string;
}

interface StandingsType {
	position: string;
	positionText: string;
	points: string;
	wins: string;
}

export type raceResultType = {
	Results: Array<
		{
			number: string;
			Driver: DriverType;
			Constructor: ConstructorType;
			grid: string;
			laps: string;
			status: string;
			Time: {
				millis: string;
				time: string;
			};
			FastestLap: {
				rank: string;
				lap: string;
				Time: {
					time: string;
				};
				AverageSpeed: {
					units: string;
					speed: string;
				};
			};
		} & Omit<StandingsType, 'wins'>
	>;
};

export type driverStandingsType = {
	DriverStandings: Array<
		{
			Driver: DriverType;
			Constructor: ConstructorType;
		} & StandingsType
	>;
};

export type constructorStandingsType = {
	ConstructorStandings: Array<
		{
			Constructor: ConstructorType;
		} & StandingsType
	>;
};
