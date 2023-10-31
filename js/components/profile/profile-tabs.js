const tabProfileButtons = document.querySelectorAll('button[data-tab]');
const tabProfileContents = document.querySelectorAll(".profile-tab");

if (localStorage.getItem('tab-name') === null) {
	localStorage.setItem('tab-name', 'information')
}

tabProfileButtons.forEach((button) => {
	button.addEventListener("click", () => {

		localStorage.setItem('tab-name', button.getAttribute('data-tab'))

		tabProfileButtons.forEach((button) => {
			button.classList.remove('profile-nav__btn--active')
			button.classList.remove('profile-nav__submenu-btn--active')
		});

		tabProfileContents.forEach((content) => {
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

// Сохранение вкладок в локальном хранище
const tabName = localStorage.getItem('tab-name')

tabProfileButtons.forEach((button) => {
	button.classList.remove('profile-nav__btn--active')
	button.classList.remove('profile-nav__submenu-btn--active')
});

tabProfileContents.forEach((content) => {
	content.classList.remove("active");
	content.classList.add("hidden");
});

const tabProfileContent = document.getElementById(tabName);
const tabProfileBtn = document.querySelector(`button[data-tab="${tabName}"]`)

if (tabProfileBtn.classList.contains('profile-nav__submenu-btn')) {
	tabProfileBtn.classList.add('profile-nav__submenu-btn--active')
} else {
	tabProfileBtn.classList.add('profile-nav__btn--active')
}

tabProfileContent.classList.add("active");
tabProfileContent.classList.remove("hidden");