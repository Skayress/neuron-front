const tgBanner = document.querySelector('.tg-banner')
const closeTgBannerBtn = document.querySelector('.tg-banner__close')

closeTgBannerBtn.addEventListener('click', () => {
	tgBanner.style.display = 'none'
})