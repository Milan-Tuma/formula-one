import { FC } from 'react';
import '../../index.css';

type DataListProps = {
	children: JSX.Element;
	type?: string;
};

const DataList: FC<DataListProps> = ({ type = 'ul', children }) => {
	if (type === 'ul') {
		return <ul className="w-full px-5 mb-5">{children}</ul>;
	}
	if (type === 'ol') {
		return <ol>{children}</ol>;
	}
	return <></>;
};

export default DataList;
