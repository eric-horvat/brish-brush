'use strict';
const React = require('react');
const {Text} = require('ink');

const Brushing = () => {
	const [counter, setCounter] = React.useState(0);
	const prepTime = 6;
	const brushingTime = 60;
	const congratulationTime = 10;

	React.useEffect(() => {
		const timer = setInterval(() => {
			setCounter(prevCounter => prevCounter + 1); // eslint-disable-line unicorn/prevent-abbreviations
		}, 500);

		return () => {
			clearInterval(timer);
		};
	}, []);

	if (counter < 2)
		return <Text color="blue">On your marks</Text>;
	else if (counter < 4)
		return <Text color="green">Get set</Text>;
	else if (counter < 6)
		return <Text color="blue">Brush!</Text>;
	else {
		if (counter < prepTime + brushingTime) {
			if (counter % 2 == 0)
				return <Text color="green" bold>brish</Text>;
			else
				return <Text color="blue" >     brush</Text>;
		}
		else if (counter < prepTime + brushingTime + congratulationTime)
			return <Text color="green" >Great brushing! Make sure to brush every morning and night</Text>;
		return null;
	}
};

module.exports = Brushing;
