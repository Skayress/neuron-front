class Spoiler {
	constructor(element) {
		this.element = document.querySelector(`.${element}`)
		this.spoilerButton = this.element.querySelector('.spoiler-button')
		this.spoilerContent = this.element.querySelector('.spoiler-content')
		this._init()
	}
	_init() {
		this.spoilerButton.addEventListener("click", () => {
			this.spoilerContent.classList.toggle("open");
		});
	}
}