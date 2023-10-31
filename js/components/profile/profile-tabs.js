const tabProfileButtons = document.querySelectorAll('button[data-tab]');
const taProfilebContents = document.querySelectorAll(".profile-tab");

tabProfileButtons.forEach((button) => {
	button.addEventListener("click", () => {

		tabProfileButtons.forEach((button) => {
			button.classList.remove('profile-nav__btn--active')
			button.classList.remove('profile-nav__submenu-btn--active')
		});

		taProfilebContents.forEach((content) => {
			content.classList.remove("active");
			content.classList.add("hidden");
		});

		const tabId = button.getAttribute("data-tab");
		const tabContent = document.getElementById(tabId);

		if (tabContent) {
			if (button.classList.contains('profile-nav__submenu-btn')) {
				button.classList.add('profile-nav__submenu-btn--active')
			} else {
				button.classList.add('profile-nav__btn--active')
			}
			tabContent.classList.add("active");
			tabContent.classList.remove("hidden");
		}
	});
});