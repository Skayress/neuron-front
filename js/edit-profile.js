const monthSelect = document.querySelector('.month-select')
const languageSelect = document.querySelector('.language-select')
const levelSelect = document.querySelector('.level-select')

new Choices(monthSelect, {
	searchEnabled: false,
	itemSelectText: '',
})

new Choices(languageSelect, {
	searchEnabled: false,
	itemSelectText: '',
})

new Choices(levelSelect, {
	searchEnabled: false,
	itemSelectText: '',
})

// Смена баннера
const banner = document.querySelector('.edit-banner')
const editBannerBtn = document.querySelector('.edit-banner__btn')
const editBannerInput = document.querySelector('.edit-banner input[type="file"]')

editBannerBtn.addEventListener('click', (e) => {
	e.preventDefault()
	editBannerInput.click()
})

editBannerInput.addEventListener('change', (event) => {
	const file = event.target.files[0];
	const reader = new FileReader();
	reader.onload = function (event) {
		const imageUrl = event.target.result;
		console.log(imageUrl);
		banner.style.backgroundImage = `url("${imageUrl}")`
	};
	reader.readAsDataURL(file);
})

// Смена аватарки
const avatar = document.querySelector('.edit-avatar__img img')
const editAvatarBtn = document.querySelector('.edit-avatar__change-btn')
const editAvatarInput = document.querySelector('.edit-avatar__img input[type="file"]')

editAvatarBtn.addEventListener('click', (e) => {
	e.preventDefault()
	editAvatarInput.click()
})

editAvatarInput.addEventListener('change', (event) => {
	const file = event.target.files[0];
	const reader = new FileReader();
	reader.onload = function (event) {
		const imageUrl = event.target.result;
		console.log(imageUrl);
		avatar.src = `${imageUrl}`
	};
	reader.readAsDataURL(file);
})

// Добавление языка
const languageList = document.querySelector('.edit-profile-form__language-list')
const addLanguageBtn = document.querySelector('.add-language-btn')

let flag = 0

addLanguageBtn.addEventListener('click', (e) => {
	e.preventDefault()
	flag++
	const elem = `
		<div class="edit-profile-form__language">
			<label class="form-element" for="language-${flag}">
				<span>Language:</span>
				<select class="language-select-${flag}" name="language-${flag}" id="language-${flag}">
					<option value="English">English</option>
					<option value="Russia">Russia</option>
					<option value="Spain">Spain</option>
				</select>
			</label>
			<label class="form-element" for="level-${flag}">
				<span>Level:</span>
				<select class="level-select-${flag}" name="level-${flag}" id="level-${flag}">
					<option value="Beginner">Beginner</option>
					<option value="Elementary">Elementary</option>
					<option value="Intermediate">Intermediate</option>
					<option value="Advancde">Advancde</option>
				</select>
			</label>
		</div>
	`
	languageList.insertAdjacentHTML('beforeend', elem)
	const langSelect = document.querySelector(`.language-select-${flag}`)
	const langLevelSelect = document.querySelector(`.level-select-${flag}`)
	new Choices(langSelect, {
		searchEnabled: false,
		itemSelectText: '',
	})
	new Choices(langLevelSelect, {
		searchEnabled: false,
		itemSelectText: '',
	})
})
// Селект специализации
const specializationSelect = document.querySelector('.specialization-select')

new Choices(specializationSelect, {
	searchEnabled: false,
	itemSelectText: '',
})

// Тэги специализации
const inputTags = document.querySelector('.specialization-tags')

new Choices(inputTags, {
	removeItemButton: true,
	removeItems: true
})

// Блок обо мне
const textarea = document.querySelector('textarea');

textarea.addEventListener('input', function () {
	textarea.style.height = 0;
	textarea.style.height = textarea.scrollHeight + "px";
});