const businessCardToggle = document.querySelector('.business-card__toggle .toggle-btn')
const toggleOnForm = document.querySelector('.toggle-on-form')
const toggleOffForm = document.querySelector('.toggle-off-form')

async function submitToggleForm(form) {
	const URL = form.getAttribute('action')
	const formData = new FormData(form);
	try {
		const response = await fetch(URL, {
			method: 'POST',
			body: formData,
		});
	} catch (error) {
		console.error('Ошибка запроса', error);
	} finally {
		location.reload()
	}
}

businessCardToggle.addEventListener('click', () => {
	if (businessCardToggle.checked) {
		submitToggleForm(toggleOnForm)
	} else {
		submitToggleForm(toggleOffForm)
	}
})