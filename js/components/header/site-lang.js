const headerLangSelect = document.querySelector('.header-lang-select__btn')
const langList = document.querySelector('.header-lang-select__list')
const langArrow = document.querySelector('.header-lang-select__arrow')
// const selectedLangSite = document.querySelector('input[name="selected-lang-site"]')
// const selectedNameLangSite = document.querySelector('.header-lang-select__check span');
// const siteLangs = document.querySelectorAll('input[name="site-lang"]')
// const inputLangForm = document.querySelector('.header-lang-select__check');

headerLangSelect.addEventListener('click', () => {
	langList.classList.toggle('open')
	langArrow.classList.toggle('open')
})

// siteLangs.forEach((item) => {
// 	item.addEventListener('click', () => {
// 		const langValue = item.value;
// 		selectedLangSite.setAttribute('value', langValue);
// 		selectedNameLangSite.innerText = langValue;
// 		langList.classList.remove('open')
// 		langArrow.classList.remove('open')
// 	})
// })

// async function submitLangInput(form) {
// 	const URL = form.getAttribute('action')
// 	const attr = form.getAttribute('data-value')
// 	const input = `<input type="text" name="action" value="${attr}" hidden>`;
// 	form.insertAdjacentHTML('afterbegin', input)
// 	const formData = new FormData(form); // получаем данные формы

// 	try {
// 		const response = await fetch(URL, { // отправляем данные на сервер
// 			method: 'POST',
// 			body: formData,
// 			signal: controller.signal
// 		});
// 		if (response.ok) {
// 			console.log("Форма отправилась");
// 		} else {
// 			throw new Error('Ошибка при отправке запроса');
// 		}
// 	} catch (error) {
// 		console.error(error);
// 	}
// }

// const observer = new MutationObserver(function (mutations) {
// 	mutations.forEach(function (mutation) {
// 		if (mutation.attributeName === 'value') {
// 			submitLangInput(inputLangForm)
// 		}
// 	});
// });

// const config = { attributes: true, attributeFilter: ['value'] };
// observer.observe(selectedLangSite, config);