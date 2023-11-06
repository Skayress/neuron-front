import { Main } from "./methods.js";

// Редактирование контакта
const editContactModal = new Modal('.edit-contact-modal')
const editContactBtns = document.querySelectorAll('.edit-contact-btn')
const editContactForm = document.querySelector('.edit-contact-form')
const editLocationForm = document.querySelector('.edit-location-form')
const dataInputEitContactForm = editContactForm.querySelector('input[name="data_value"]')

editContactModal.closeBtn.addEventListener('click', () => {
	dataInputEitContactForm.value = ''
})

editContactModal.overlay.addEventListener('click', () => {
	dataInputEitContactForm.value = ''
})

const maskOptions = {
	mask: /^\S*@?\S*$/
};
const mask = IMask(dataInputEitContactForm, maskOptions);

editContactBtns.forEach((btn) => {
	btn.addEventListener('click', () => {
		editContactModal.open()
		const contactName = btn.getAttribute('data-name')
		const contactId = btn.getAttribute('data-id')

		const contactNameTitle = document.querySelector('.edit-contact-form .data-title')
		const contactNameInput = document.querySelector('.edit-contact-form input[name="contact-name"]')
		const contactIdInput = document.querySelector('.edit-contact-form input[name="object_id"]')

		contactNameInput.setAttribute('value', contactName)
		contactIdInput.setAttribute('value', contactId)

		if (contactNameInput.value === 'phone' || contactNameInput.value === 'whatsapp') {
			editContactForm.style.display = 'block'
			editLocationForm.style.display = 'none'
			contactNameTitle.textContent = 'Number phone'
			mask.updateOptions({
				mask: '+{0}(000)000-00-00'
			});
		} else if (contactNameInput.value === 'email') {
			editContactForm.style.display = 'block'
			editLocationForm.style.display = 'none'
			contactNameTitle.textContent = 'Email'
			mask.updateOptions({
				mask: /^\S*@?\S*$/
			});
		} else if (contactNameInput.value === 'instagram') {
			editContactForm.style.display = 'block'
			editLocationForm.style.display = 'none'
			contactNameTitle.textContent = 'Username'
			mask.updateOptions({
				mask: /^\S*@?\S*$/
			})
		} else if (contactNameInput.value === 'location') {
			editContactForm.style.display = 'none'
			editLocationForm.style.display = 'block'
			contactNameTitle.textContent = 'Location'
			mask.updateOptions({
				mask: /^\S*@?\S*$/
			});
		}
	})
})

editContactForm.addEventListener('submit', async (e) => {
	e.preventDefault()

	const id = editContactForm.querySelector('input[name="object_id"]').getAttribute('value')
	const elemInput = document.querySelector(`.contact-list input[value="${id}"]`)
	const elemData = elemInput.closest('.contact-data__right').querySelector('p')

	try {
		const URL = editContactForm.getAttribute('action')
		const formData = new FormData(editContactForm);
		const response = await fetch(URL, {
			method: 'POST',
			body: formData,
		});
	} catch (error) {
		console.log(error);
	} finally {
		editContactModal.close()
		elemData.textContent = dataInputEitContactForm.value
	}
})
// ==========================


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
		this.addEvent(this.cancelBtn.elem, 'click', (e) => {
			e.preventDefault()
			this.back()
		});
	}

	openPopup(e) {
		this.addClass(this.infoPopup.elem, 'active');
		this.removeClass(this.Contactpopup.elem, 'active');
		cloned = e.parentNode.querySelector('.contact-add__left img').cloneNode(true);
		cloned2 = new Main('.contact-list li').elem.cloneNode(true);
		contactName = e.getAttribute('data-name');
		this.inputContactName.elem.setAttribute('value', contactName);
		const inputDataLink = document.querySelector('.title-input')
		console.log(inputDataLink);
		inputDataLink.value = contactName
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
				const socilaLinks = document.querySelector('.socila-links')
				const elem = `
					<a href="#">
						${cloned.outerHTML}
						${this.addTitleInput.elem.value}
					</a>
				`
				socilaLinks.insertAdjacentHTML('beforeend', elem)

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

// Удаление контакта
const delContactForms = document.querySelectorAll('.del-contact-form')
const contactList = document.querySelector('.contact-list')

delContactForms.forEach((form) => {
	form.addEventListener('submit', async (e) => {
		e.preventDefault()

		try {
			const URL = form.getAttribute('action')
			const formData = new FormData(form);
			const response = await fetch(URL, {
				method: 'POST',
				body: formData,
			});
		} catch (error) {
			console.log(error);
		} finally {
			form.parentNode.remove()
		}
	})
})

const observer = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		if (mutation.type === 'childList') {
			const delContactForms = document.querySelectorAll('.del-contact-form')

			delContactForms.forEach((form) => {
				form.addEventListener('submit', async (e) => {
					e.preventDefault()

					try {
						const URL = form.getAttribute('action')
						const formData = new FormData(form);
						const response = await fetch(URL, {
							method: 'POST',
							body: formData,
						});
					} catch (error) {
						console.log(error);
					} finally {
						form.parentNode.remove()
					}
				})
			})
		}
	});
});

observer.observe(contactList, { childList: true });

function sortable() {
	let contactsItemsId = []; // айдишники контактов

	const contactsItemsInputId = document.querySelectorAll('.contact-list input[name="object_id"]')
	const socialLinksElements = Array.from(document.querySelectorAll('.socila-links a[data-id]'))

	/* Извелекаем значение из инпута и формируем массив с айдишниками контактов */
	contactsItemsInputId.forEach((item) => {
		contactsItemsId.push(item.getAttribute('value'))
	})

	/* Преобразовываем строки в массиве в числа */
	const contactsItemsIdNum = contactsItemsId.map((el) => parseInt(el))

	const sortedElements = socialLinksElements.sort((a, b) => {
		const idA = parseInt(a.dataset.id);
		const idB = parseInt(b.dataset.id);
		return contactsItemsIdNum.indexOf(idA) - contactsItemsIdNum.indexOf(idB);
	});

	// Заменяем порядок элементов в DOM на отсортированный порядок
	sortedElements.forEach((element) => {
		console.log(element);
		element.parentNode.appendChild(element);
	});
}

// Сортировка
new Sortable(contact, {
	group: 'shared',
	animation: 150,
	ghostClass: 'sortable-ghost',
	onEnd: async function () {
		let ids = [];
		const csrfmiddlewaretoken = document.querySelector('.contact-list input[name="csrfmiddlewaretoken"]').getAttribute('value')
		const action = document.querySelector('.contact-list input[name="action"]').getAttribute('value')
		const idInputs = document.querySelectorAll('.contact-list input[name="object_id"]')
		idInputs.forEach((item) => {
			ids.push(item.getAttribute('value'))
		})

		try {
			const formData = new FormData();
			formData.append('csrfmiddlewaretoken', csrfmiddlewaretoken)
			formData.append('action', action)
			formData.append('ids', ids)
			const response = await fetch('.', {
				method: 'POST',
				body: formData,
			});
		} catch (error) {
			console.log(error);
		} finally {
			sortable()
		}
	}
});

const socilaLinks = document.querySelector('.socila-links')

new Sortable(socilaLinks, {
	group: 'shared',
	animation: 150
});