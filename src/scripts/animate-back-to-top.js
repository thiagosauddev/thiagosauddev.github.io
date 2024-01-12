const button = document.getElementById("animation-back-to-top");

window.addEventListener("scroll", () => {
	const scrollHeight = document.documentElement.scrollHeight;
	const scrollPosition = window.innerHeight + window.scrollY;

	if ((scrollHeight - scrollPosition) / scrollHeight <= 0.4) {
		button.classList.add("show");
	} else {
		button.classList.remove("show");
	}
});

button.addEventListener("click", () => {
	window.scrollTo({ top: 0, behavior: "smooth" });
});
