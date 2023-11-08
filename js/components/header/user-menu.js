const userBtn = document.querySelector('.user-wrap');
const userMenu = document.querySelector('.user-list');

if (userBtn) {
	document.addEventListener('click', (e) => {
		const targetElement = e.target;

		if (targetElement.closest('.user-wrap')) {
			userMenu.classList.toggle('open')
		} else if (targetElement.closest('.user-list')) {
			userMenu.classList.add('open')
		} else {
			userMenu.classList.remove('open')
		}
	})
}