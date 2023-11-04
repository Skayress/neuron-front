const dropzone = document.querySelector('.drag-file');
const filesContainer = document.querySelector('.chat__setting-files');

// Обработчик события Drag&Drop
dropzone.addEventListener('dragover', (event) => {
	event.preventDefault();
	dropzone.classList.add('dragover');
});

dropzone.addEventListener('dragleave', () => {
	dropzone.classList.remove('dragover');
});

dropzone.addEventListener('drop', (event) => {
	event.preventDefault();
	dropzone.classList.remove('dragover');

	// Получаем список файлов
	const files = Array.from(event.dataTransfer.files);
	console.log(files);

	// Отображаем файлы
	files.forEach(file => {
		const fileElement = document.createElement('div');
		fileElement.classList.add('file');
		fileElement.innerHTML =
			` 
			<div class="file">
				<div class="file-icon">
					<svg width="33" height="43" viewBox="0 0 33 43" fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd" clip-rule="evenodd"
							d="M32.4428 11.8892V36.9886C32.4428 38.3901 31.8861 39.7341 30.8952 40.725C29.9042 41.716 28.5602 42.2727 27.1587 42.2727H24.5167V39.6307H27.1587C27.8594 39.6307 28.5315 39.3523 29.0269 38.8568C29.5224 38.3614 29.8008 37.6893 29.8008 36.9886V11.8892H24.5167C23.4656 11.8892 22.4576 11.4717 21.7144 10.7284C20.9712 9.98523 20.5536 8.97721 20.5536 7.92614V2.64205H6.02237C5.32166 2.64205 4.64964 2.9204 4.15416 3.41588C3.65868 3.91136 3.38033 4.58338 3.38033 5.28409V29.0625H0.738281V5.28409C0.738281 3.88266 1.295 2.53863 2.28596 1.54767C3.27691 0.556715 4.62094 0 6.02237 0L20.5536 0L32.4428 11.8892Z"
							fill="#1B193F" />
					</svg>
					<span>.DOCX</span>
				</div>
				<div class="file-name">${file.name}</div>
				<div class="file-delete">Удалить</div>
				</div>
			`
		filesContainer.appendChild(fileElement);

		// Обработчик события удаления файла
		const removeButton = fileElement.querySelector('.chat__setting-file-delete');
		removeButton.addEventListener('click', () => {
			filesContainer.removeChild(fileElement);
		});
	});
});

document.querySelector('.btn-add-file').addEventListener('click', function () {
	addFile();
});

function addFile() {
	// создание элемента input для выбора файла
	const input = document.createElement('input');
	input.type = 'file';

	// добавление обработчика события "change" для выбора файла
	input.addEventListener('change', function () {
		// получение выбранного файла
		const file = input.files[0];

		// проверка наличия файла
		if (file) {
			const files = Array.from(input.files);
			console.log(files);

			// Отображаем файлы
			files.forEach(file => {
				const fileElement = document.createElement('div');
				fileElement.classList.add('file');
				fileElement.innerHTML =
					` 
					<div class="file">
						<div class="file-icon">
							<svg width="33" height="43" viewBox="0 0 33 43" fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" clip-rule="evenodd"
									d="M32.4428 11.8892V36.9886C32.4428 38.3901 31.8861 39.7341 30.8952 40.725C29.9042 41.716 28.5602 42.2727 27.1587 42.2727H24.5167V39.6307H27.1587C27.8594 39.6307 28.5315 39.3523 29.0269 38.8568C29.5224 38.3614 29.8008 37.6893 29.8008 36.9886V11.8892H24.5167C23.4656 11.8892 22.4576 11.4717 21.7144 10.7284C20.9712 9.98523 20.5536 8.97721 20.5536 7.92614V2.64205H6.02237C5.32166 2.64205 4.64964 2.9204 4.15416 3.41588C3.65868 3.91136 3.38033 4.58338 3.38033 5.28409V29.0625H0.738281V5.28409C0.738281 3.88266 1.295 2.53863 2.28596 1.54767C3.27691 0.556715 4.62094 0 6.02237 0L20.5536 0L32.4428 11.8892Z"
									fill="#1B193F" />
							</svg>
							<span>.DOCX</span>
						</div>
						<div class="file-name">${file.name}</div>
						<div class="file-delete">Удалить</div>
					</div>
				`
				filesContainer.appendChild(fileElement);

				// Обработчик события удаления файла
				const removeButton = fileElement.querySelector('.chat__setting-file-delete');
				removeButton.addEventListener('click', () => {
					filesContainer.removeChild(fileElement);
				});
			});
		}
	});

	// имитация клика по элементу input для вызова диалогового окна выбора файла
	input.click();
}