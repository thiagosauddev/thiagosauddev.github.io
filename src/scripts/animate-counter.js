function animateCounter(elementID, maxValue) {
	let count = 0;

	const COUNTER_ELEMENT = document.getElementById(elementID);
	const INCREMENT = maxValue / (2000 / 10);

	const ANIMATE = setInterval(() => {
		if (count < maxValue) {
			count += INCREMENT;
			COUNTER_ELEMENT.innerText = `+${Math.ceil(count)}`;
		} else {
			clearInterval(ANIMATE);
		}
	}, 10);
}

// START ANIMATION
animateCounter("animate-counter-years-experience", 15);
animateCounter("animate-counter-projects-delivered", 9);
