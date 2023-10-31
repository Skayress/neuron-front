import './site-lang.js'
import './user-menu.js'
import './mobile-menu.js'

const loginBtn = document.querySelector('.login')

if (loginBtn) {
	const loginModal = new Modal('.sign-up-modal')

	loginBtn.addEventListener('click', () => {
		loginModal.open()
	})
}