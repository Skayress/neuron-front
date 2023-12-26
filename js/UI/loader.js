class Loader {
	constructor() {
		this.loader = document.querySelector('.loader')
	}

	show() {
		this.loader.classList.add('show')
	}

	hidden() {
		this.loader.classList.remove('show')
	}
}

export const loader = new Loader()