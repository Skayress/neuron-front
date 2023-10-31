const menuItem = document.querySelectorAll('.profile-nav__item--sub')

menuItem.forEach((item) => {
	const menuItemLink = item.querySelector('.profile-nav__btn')
	menuItemLink.addEventListener('click', () => {
		const submenu = item.querySelector('.profile-nav__submenu')
		submenu.classList.toggle('open')
		item.classList.toggle('open')
	})
})