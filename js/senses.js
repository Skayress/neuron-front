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

const contactModal = new Modal('.contact-modal')
const addContactBtn = document.querySelector('.add-contact')

addContactBtn.addEventListener('click', () => {
	contactModal.open()
})

// Добавление контакта
const addContactModal = new Modal('.add-contact-modal')
const addConcatForm = document.querySelector('.add-contact-form')
const addInfoContactBtns = document.querySelectorAll('.contact-add__btn')

let contactTitle;
let contactIcon;
const addContactDataInput = document.querySelector('.add-contact-form .data-input');

addInfoContactBtns.forEach((btn) => {
	btn.addEventListener('click', () => {
		contactModal.close()
		addContactModal.open()

		const contactName = btn.getAttribute('data-name')
		const contactNameInput = document.querySelector('.add-contact-form input[name="contact-name"]')

		contactNameInput.setAttribute('value', contactName)

		contactTitle = btn.closest('li').querySelector('.contact-add__left').textContent
		contactIcon = btn.closest('li').querySelector('.contact-add__left img')
	})
})

addConcatForm.addEventListener('submit', async (e) => {
	e.preventDefault()

	try {
		const URL = addConcatForm.getAttribute('action')
		const formData = new FormData(addConcatForm);
		const response = await fetch(URL, {
			method: 'POST',
			body: formData,
		});
		if (response.ok) {
			const data = await response.json()
			console.log(data);
		}
	} catch (error) {
		console.log(error);
	} finally {
		const socilaLinks = document.querySelector('.socila-links')
		const contactList = document.querySelector('.contact-list')
		const linkElem = `
			<a href="#">
				${contactIcon.outerHTML}
				${contactTitle}
			</a>
		`
		const contactElem = `
			<li>
				<button class="focus-btn">
					<svg xmlns="http://www.w3.org/2000/svg" width="18" height="22" viewBox="0 0 18 22"
						fill="none">
						<path
							d="M1.88344 19.1818C2.11774 19.1818 2.34244 19.2776 2.50812 19.4481C2.67379 19.6186 2.76687 19.8498 2.76687 20.0909C2.76687 20.332 2.67379 20.5632 2.50812 20.7337C2.34244 20.9042 2.11774 21 1.88344 21C1.64913 21 1.42443 20.9042 1.25875 20.7337C1.09308 20.5632 1 20.332 1 20.0909C1 19.8498 1.09308 19.6186 1.25875 19.4481C1.42443 19.2776 1.64913 19.1818 1.88344 19.1818ZM1.88343 10.0909C2.11774 10.0909 2.34244 10.1867 2.50812 10.3572C2.67379 10.5277 2.76687 10.7589 2.76687 11C2.76687 11.2411 2.67379 11.4723 2.50812 11.6428C2.34244 11.8133 2.11774 11.9091 1.88343 11.9091C1.64913 11.9091 1.42443 11.8133 1.25875 11.6428C1.09308 11.4723 1 11.2411 1 11C1 10.7589 1.09308 10.5277 1.25875 10.3572C1.42443 10.1867 1.64913 10.0909 1.88343 10.0909ZM1.88343 1C2.11774 1 2.34244 1.09578 2.50812 1.26627C2.67379 1.43675 2.76687 1.66798 2.76687 1.90909C2.76687 2.1502 2.67379 2.38143 2.50812 2.55192C2.34244 2.7224 2.11774 2.81818 1.88343 2.81818C1.64913 2.81818 1.42443 2.7224 1.25875 2.55192C1.09308 2.38143 0.999999 2.1502 0.999999 1.90909C0.999999 1.66798 1.09308 1.43675 1.25875 1.26627C1.42443 1.09578 1.64913 1 1.88343 1ZM8.95092 19.1818C9.18522 19.1818 9.40993 19.2776 9.5756 19.4481C9.74128 19.6186 9.83436 19.8498 9.83436 20.0909C9.83436 20.332 9.74128 20.5632 9.5756 20.7337C9.40993 20.9042 9.18522 21 8.95092 21C8.71662 21 8.49191 20.9042 8.32624 20.7337C8.16056 20.5632 8.06748 20.332 8.06748 20.0909C8.06748 19.8498 8.16056 19.6186 8.32624 19.4481C8.49191 19.2776 8.71662 19.1818 8.95092 19.1818ZM8.95092 10.0909C9.18522 10.0909 9.40993 10.1867 9.5756 10.3572C9.74128 10.5277 9.83435 10.7589 9.83435 11C9.83435 11.2411 9.74128 11.4723 9.5756 11.6428C9.40993 11.8133 9.18522 11.9091 8.95092 11.9091C8.71662 11.9091 8.49191 11.8133 8.32624 11.6428C8.16056 11.4723 8.06748 11.2411 8.06748 11C8.06748 10.7589 8.16056 10.5277 8.32624 10.3572C8.49191 10.1867 8.71662 10.0909 8.95092 10.0909ZM8.95092 1C9.18522 1 9.40993 1.09578 9.5756 1.26627C9.74128 1.43675 9.83435 1.66798 9.83435 1.90909C9.83435 2.1502 9.74128 2.38143 9.5756 2.55192C9.40993 2.7224 9.18522 2.81818 8.95092 2.81818C8.71662 2.81818 8.49191 2.7224 8.32624 2.55192C8.16056 2.38143 8.06748 2.1502 8.06748 1.90909C8.06748 1.66798 8.16056 1.43675 8.32624 1.26627C8.49191 1.09578 8.71662 1 8.95092 1Z"
							stroke="#686F7B" stroke-width="1.6" />
						<path
							d="M16.1166 19.1818C16.3509 19.1818 16.5756 19.2776 16.7412 19.4481C16.9069 19.6186 17 19.8498 17 20.0909C17 20.332 16.9069 20.5632 16.7412 20.7337C16.5756 20.9042 16.3509 21 16.1166 21C15.8823 21 15.6576 20.9042 15.4919 20.7337C15.3262 20.5632 15.2331 20.332 15.2331 20.0909C15.2331 19.8498 15.3262 19.6186 15.4919 19.4481C15.6576 19.2776 15.8823 19.1818 16.1166 19.1818ZM16.1166 10.0909C16.3509 10.0909 16.5756 10.1867 16.7412 10.3572C16.9069 10.5277 17 10.7589 17 11C17 11.2411 16.9069 11.4723 16.7412 11.6428C16.5756 11.8133 16.3509 11.9091 16.1166 11.9091C15.8823 11.9091 15.6576 11.8133 15.4919 11.6428C15.3262 11.4723 15.2331 11.2411 15.2331 11C15.2331 10.7589 15.3262 10.5277 15.4919 10.3572C15.6576 10.1867 15.8823 10.0909 16.1166 10.0909ZM16.1166 0.999999C16.3509 0.999999 16.5756 1.09578 16.7412 1.26627C16.9069 1.43675 17 1.66798 17 1.90909C17 2.1502 16.9069 2.38143 16.7412 2.55192C16.5756 2.7224 16.3509 2.81818 16.1166 2.81818C15.8823 2.81818 15.6576 2.7224 15.4919 2.55192C15.3262 2.38143 15.2331 2.1502 15.2331 1.90909C15.2331 1.66798 15.3262 1.43675 15.4919 1.26627C15.6576 1.09578 15.8823 0.999999 16.1166 0.999999Z"
							stroke="#686F7B" stroke-width="1.6" />
					</svg>
				</button>
				${contactIcon.outerHTML}
				<div class="contact-data__right">
					<div class="contact-data__right">
						<strong>${contactTitle}</strong>
						<p>${addContactDataInput.value}</p>
					</div>
				</div>
				<button class="edit-contact-btn" data-name="phone">
					<img src="/static/images/profile-icons/editing.svg" alt="">
				</button>
				<form class="del-contact-form" action=".">
					<input type="text" name="action" value="delete_business_contact" hidden>
					<input name="object_id" value="1" hidden>
					<button class="del-contact-btn">
						<img src="/static/images/icons/close.svg" alt="">
					</button>
				</form>
			</li>
		`
		socilaLinks.insertAdjacentHTML('beforeend', linkElem)
		contactList.insertAdjacentHTML('beforeend', contactElem)

		addContactModal.close()
	}
})


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