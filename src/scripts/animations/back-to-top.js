const BUTTON = document.getElementById("animation-back-to-top");

window.addEventListener("scroll", () => {
	const SCROLL_HEIGHT = document.documentElement.scrollHeight;
	const SCROLL_POSITION = window.innerHeight + window.scrollY;

	if ((SCROLL_HEIGHT - SCROLL_POSITION) / SCROLL_HEIGHT <= 0.4) {
		BUTTON.classList.add("show");
	} else {
		BUTTON.classList.remove("show");
	}
});

BUTTON.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
