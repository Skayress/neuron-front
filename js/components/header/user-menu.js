const userBtn = document.querySelector('.user-wrap');
const userMenu = document.querySelector('.user-list');

if (userBtn) {
	userBtn.addEventListener('click', () => {
		userMenu.classList.toggle('open')
	})

	document.addEventListener('click', (e) => {
		const isClickInside = userBtn.contains(e.target);

		if (!isClickInside) {
			userMenu.classList.remove('open')
		}
	})
}