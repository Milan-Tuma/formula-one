import { localizeDate } from './localizeDate';

it('should correctly format the date', () => {
	expect(localizeDate('10/12/2021')).toBe('12 October 2021');
	expect(localizeDate('10.21.2022')).toBe('21 October 2022');
});

it('should return invalid date', () => {
	expect(localizeDate('125541165')).toBe('Invalid Date');
	expect(localizeDate('10/2023')).toBe('Invalid Date');
	expect(localizeDate('13/10/2022')).toBe('Invalid Date');
});
