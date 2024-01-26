document.addEventListener("DOMContentLoaded", () => {
	const MARQUEE_CONTAINER = document.getElementById("animate-marquee-container");
	const MARQUEE_CHILDRENS_CLONED = MARQUEE_CONTAINER.innerHTML;
	MARQUEE_CONTAINER.innerHTML += MARQUEE_CHILDRENS_CLONED;
	MARQUEE_CONTAINER.style.willChange = "transform"; // Optimize the animation performance
	MARQUEE_CONTAINER.style.transition = "transform 0.5s ease";
	MARQUEE_CONTAINER.style.transformOrigin = "center";

	const SPEED = 1;
	let containerWidth = MARQUEE_CONTAINER.scrollWidth;
	let currentPos = 0;

	function animateMarquee() {
		currentPos -= SPEED;

		if (currentPos <= -containerWidth + MARQUEE_CONTAINER.clientWidth) {
			MARQUEE_CONTAINER.innerHTML += MARQUEE_CHILDRENS_CLONED;
			containerWidth = MARQUEE_CONTAINER.scrollWidth;
		}

		MARQUEE_CONTAINER.style.transform = "translateX(" + currentPos + "px)";

		requestAnimationFrame(animateMarquee);
	}

	function handleResizeAndOrientationChange() {
		currentPos = currentPos; // Important to prevent side effect when is scrolling
		MARQUEE_CONTAINER.style.transition = "none";
	}

	window.addEventListener("resize", handleResizeAndOrientationChange);
	window.addEventListener("orientationchange", handleResizeAndOrientationChange);

	animateMarquee();
});
