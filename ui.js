"use strict";
const React = require("react");
const { Text, Box, useApp, useInput } = require("ink");

const Brushing = (time, color, text, brushLocation) => (
	<Box flexDirection="column">
		<Box>
			<Text color="yellow" bold>
				Brushing Location: {brushLocation}
			</Text>
		</Box>
		<Box>
			<Text color="green" bold>
				{time}
			</Text>
			<Text color={color}>{text}</Text>
		</Box>
	</Box>
);

const Time = {
	Prep: 6,
	Brushing: 10,
	Swap: 3,
	Congratulation: 10,
};

const State = {
	Welcome: "welcome",
	Init: "init",
	BrushingTop: "brushingTop",
	BrushingBottom: "brushingBottom",
	SwapConfirmation: "swap",
	Congratulation: "congrats",
};

const useCounter = () => {
	const [counter, setCounter] = React.useState(0);

	React.useEffect(() => {
		const timer = setInterval(() => {
			setCounter((prevCounter) => prevCounter + 1); // eslint-disable-line unicorn/prevent-abbreviations
		}, 500);

		return () => {
			clearInterval(timer);
		};
	}, [setCounter]);

	const resetCount = React.useCallback(() => setCounter(0), [setCounter]);

	return [counter, resetCount];
};

const useBrushState = () => {
	const { exit } = useApp();
	const [counter, resetCount] = useCounter();

	const [brushState, setBrushState] = React.useState(State.Welcome);

	useInput(
		(input) => {
			if (input === "y") {
				if (brushState === State.Welcome) {
					resetCount();
					setBrushState(State.Init);
				}

				if (brushState === State.SwapConfirmation) {
					resetCount();
					setBrushState(State.BrushingBottom);
				}
			}
		},
		[resetCount]
	);

	if (brushState === State.Init && counter > Time.Prep) {
		resetCount();
		setBrushState(State.BrushingTop);
	}

	if (brushState === State.BrushingTop && counter > Time.Brushing) {
		resetCount();
		setBrushState(State.SwapConfirmation);
	}

	if (brushState === State.BrushingBottom && counter > Time.Brushing) {
		resetCount();
		setBrushState(State.Congratulation);
	}

	if (brushState === State.Congratulation && counter > Time.Congratulation) {
		// This exit function doesn't really work well on Windows...
		exit();
	}

	return [brushState, counter];
};

const App = () => {
	const [state, count] = useBrushState();

	if (state === State.Welcome) {
		return (
			<Text color="yellow">
				Welcome to <Text color="green">Brish</Text>{" "}
				<Text color="blue">Brush</Text>. You'll be brushing the top of your
				mouth to begin with. Press 'y' to begin!
			</Text>
		);
	}

	if (state === State.Init) {
		if (count < 2) {
			return <Text color="blue">On your marks</Text>;
		}

		if (count < 4) {
			return <Text color="green">Get set</Text>;
		}

		if (count < 6) {
			return <Text color="blue">Brush!</Text>;
		}
	}

	if (state === State.BrushingTop || state === State.BrushingBottom) {
		const secondsLeft =
			state === State.BrushingTop
				? Time.Brushing - count / 2
				: Time.Brushing / 2 - count / 2;

		const locationText =
			state === State.BrushingTop ? "Top of Mouth" : "Bottom of Mouth";

		return count % 2 == 0
			? Brushing(secondsLeft, "green", " brish", locationText)
			: Brushing(secondsLeft - 0.5, "blue", "      brush", locationText);
	}

	if (state === State.SwapConfirmation) {
		return (
			<Text color="yellow">
				Please start to brush the other side of your mouth. Press 'y' to
				continue.
			</Text>
		);
	}

	if (state === State.Congratulation) {
		return (
			<Text color="green">
				Great brushing! Make sure to brush every morning and night
			</Text>
		);
	}

	return null;
};

module.exports = App;
