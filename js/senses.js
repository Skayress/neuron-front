import { Main } from "./methods.js";

class ContactPopup extends Main {
	constructor(s, d = document) {
		super(s, d);

		this.popupBtn = new Main('.add-contact');
		this.popup = new Main('.contact-popup');
		this.popupClose = new Main('.contact-popup__top button');
		this.popupItem = new Main('.contact-popup__item');
		this.mediaQ = this.media('(max-width: 821px)');
		this.main = new Main('.business-card');
		this.backBtn = new Main('.contact-popup__back');

		this.addEvent(this.popupBtn.elem, 'click', () => this.openPopup());
		this.addEvent(this.popup.elem, 'click', () => this.closePopup());
		this.addEvent(this.popupClose.elem, 'click', () => this.closePopup());
		this.addEvent(this.popupItem.elem, 'click', e => e.stopPropagation());
		this.addEvent(this.backBtn.elem, 'click', () => this.back());
	}

	openPopup() {
		this.addClass(this.popup.elem, 'active');
		if (this.mediaQ.matches) {
			if (this.containClass(this.popup.elem, 'active')) {
				this.main.elem.style.opacity = '0';
			}
		}
	}
	closePopup() {
		this.removeClass(this.popup.elem, 'active');
		if (this.mediaQ.matches) {
			if (!this.containClass(this.popup.elem, 'active')) {
				this.main.elem.remoAttribute('style');
			}
		}
	}
	back() {
		if (this.containClass(this.popup.elem, 'active')) {
			this.removeClass(this.popup.elem, 'active');
			this.main.elem.removeAttribute('style');
		}
	}
}
new ContactPopup();

let cloned;
let cloned2;
let contactName;
class AddPopup extends Main {
	constructor(s, d = document) {
		super(s, d)

		this.add = new Main('.contact-add');
		this.infoPopup = new Main('.add-info');
		this.Contactpopup = new Main('.contact-popup');
		this.popupClose = new Main('.add-info__close');
		this.popupItem = new Main('.add-info__item');
		this.backBtn = new Main('.add-info__back');
		this.cancelBtn = new Main('.add-info__cancel');
		this.addBtns = new Main('.contact-add__btn');
		this.main = new Main('.business-card');
		this.inputContactName = new Main('input[name="contact-name"]');

		this.each(this.addBtns.elems, btn => {
			this.addEvent(btn, 'click', () => this.openPopup(btn))
		});
		this.addEvent(this.infoPopup.elem, 'click', () => this.closePopup());
		this.addEvent(this.popupClose.elem, 'click', () => this.closePopup());
		this.addEvent(this.popupItem.elem, 'click', e => e.stopPropagation());
		this.addEvent(this.backBtn.elem, 'click', () => this.back());
		this.addEvent(this.cancelBtn.elem, 'click', () => this.back());
	}

	openPopup(e) {
		this.addClass(this.infoPopup.elem, 'active');
		this.removeClass(this.Contactpopup.elem, 'active');
		cloned = e.parentElement.querySelector('svg').cloneNode(true);
		cloned2 = new Main('.contact-list li').elem.cloneNode(true);
		contactName = e.getAttribute('data-name');
		console.log(this.inputContactName);
		this.inputContactName.elem.setAttribute('value', contactName);
	}
	closePopup() {
		this.removeClass(this.infoPopup.elem, 'active');
		this.main.elem.removeAttribute('style');
	}
	back() {
		this.removeClass(this.infoPopup.elem, 'active');
		this.addClass(this.Contactpopup.elem, 'active');
	}
}
new AddPopup();


class SharePopup extends Main {
	constructor(s, d = document) {
		super(s, d)

		this.sharePopupOpen = new Main('.share-btn');
		this.mobileBtn = new Main('.share-btn-mobile');
		this.sharePopup = new Main('.share-popup');
		this.sharePopupItem = new Main('.share-popup__item');
		this.sharePopupclose = new Main('.share-popup__top button');
		this.backBtn = new Main('.share-popup__back');

		this.addEvent(this.sharePopupOpen.elem, 'click', () => this.openPopup())
		this.addEvent(this.mobileBtn.elem, 'click', () => this.openPopup())
		this.addEvent(this.sharePopup.elem, 'click', () => this.closePopup());
		this.addEvent(this.sharePopupclose.elem, 'click', () => this.closePopup());
		this.addEvent(this.sharePopupItem.elem, 'click', e => e.stopPropagation());
		this.addEvent(this.backBtn.elem, 'click', () => this.closePopup());
	}
	openPopup() {
		this.addClass(this.sharePopup.elem, 'active');
	}
	closePopup() {
		this.removeClass(this.sharePopup.elem, 'active');
	}
}
new SharePopup();

class AddContact extends Main {
	constructor(s, d = document) {
		super(s, d)

		this.addBtn = new Main('.add-info__add');
		this.addTitleInput = new Main('.title-input');
		this.itemInput = new Main('.item-input');
		this.contactList = new Main('.contact-list');
		this.infoPopup = new Main('.add-info');
		this.main = new Main('.business-card');
		this.addContactForm = new Main('.add-contact-form')

		this.addEvent(this.addBtn.elem, 'click', (e) => {
			e.preventDefault();
			this.add()
		});
	}
	async add() {
		try {
			const URL = this.addContactForm.elem.getAttribute('action')
			const formData = new FormData(this.addContactForm.elem);
			const response = await fetch(URL, {
				method: 'POST',
				body: formData,
			});
		} catch (error) {
			console.log(error);
		} finally {
			if (this.addTitleInput.elem.value !== ''
				&& this.itemInput.value !== '') {
				this.contactList.elem.appendChild(cloned2);
				cloned2.querySelector('strong').textContent = this.addTitleInput.elem.value;
				cloned2.querySelector('p').textContent = this.itemInput.elem.value;
				const svg = cloned2.querySelector('.focus-btn').nextElementSibling;
				cloned2.replaceChild(cloned, svg);
				this.addTitleInput.elem.value = '';
				this.itemInput.elem.value = '';
				this.removeClass(this.infoPopup.elem, 'active');
				this.main.elem.removeAttribute('style');
			}
		}
	}
}

new AddContact();

class QrPopup extends Main {
	constructor(s, d = document) {
		super(s, d)

		this.qrBtn = new Main('.mobile-btns__qr');
		this.qrPopup = new Main('.qr-popup');
		this.main = new Main('.business-card');
		this.backBtn = new Main('.qr-popup__back');

		this.addEvent(this.qrBtn.elem, 'click', () => this.openPopup());
		this.addEvent(this.backBtn.elem, 'click', () => this.back());
	}
	openPopup() {
		this.addClass(this.qrPopup.elem, 'active');
		this.main.elem.style.opacity = '0';
	}
	back() {
		this.removeClass(this.qrPopup.elem, 'active');
		this.main.elem.removeAttribute('style');
	}
}
new QrPopup();

class CardPopup extends Main {
	constructor(s, d = document) {
		super(s, d)

		this.cardBtn = new Main('.mobile-btns__card');
		this.popup = new Main('.profile-popup');
		this.backBtn = new Main('.profile-popup__back');
		this.main = new Main('.business-card');

		this.addEvent(this.cardBtn.elem, 'click', () => this.openPopup());
		this.addEvent(this.backBtn.elem, 'click', () => this.back());

	}
	openPopup() {
		this.addClass(this.popup.elem, 'active');
		this.main.elem.style.opacity = '0';
	}
	back() {
		this.removeClass(this.popup.elem, 'active');
		this.main.elem.removeAttribute('style');
	}
}

new CardPopup();

new Sortable(contact, {
	multiDrag: true,
	animation: 150,
	ghostClass: 'sortable-ghost'
});  