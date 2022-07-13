import '../../index.css';

const DataList = ({ type = 'ul', children }) => {
	if (type === 'ul') {
		return <ul className="w-full px-5 mb-5">{children}</ul>;
	}
	if (type === 'ol') {
		return <ol>{children}</ol>;
	}
};

export default DataList;
