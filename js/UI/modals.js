class Modal {
	constructor(modalSelector) {
		this.modal = document.querySelector(modalSelector)
		this.overlay = this.modal.querySelector('.modal__overlay')
		this.closeBtn = this.modal.querySelector('.modal__close')

		this._init()
	}

	open() {
		this.modal.classList.add('open');
	}

	close() {
		this.modal.classList.remove('open');
	}

	_init() {
		this.overlay.addEventListener('click', () => {
			this.modal.classList.remove('open');
		})

		this.closeBtn.addEventListener('click', () => {
			this.modal.classList.remove('open');
		})
	}
}