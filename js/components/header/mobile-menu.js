// Мобильное меню
const menu = document.querySelector('.menu');
const burgerBtn = document.querySelector('.menu-burger');
const loginBtn = document.querySelector('.login')
const langSelectHeader = document.querySelector('.header-lang-select')
const menuList = document.querySelector('.menu__list')

burgerBtn.addEventListener('click', () => {
	burgerBtn.classList.toggle('open');
	menu.classList.toggle('open');
	document.body.classList.toggle('hidden')
})

if (window.innerWidth < 968 && loginBtn) {
	menuList.insertAdjacentElement('beforeend', loginBtn)
}

if (window.innerWidth < 968) {
	menuList.insertAdjacentElement('afterbegin', langSelectHeader)

	const menuLinkTools = document.querySelector('.menu__tools')
	const submenu = document.querySelector('.submenu')

	menuLinkTools.addEventListener('click', () => {
		submenu.classList.toggle('open')
	})
}