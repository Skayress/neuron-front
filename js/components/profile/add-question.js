const addQuestionBtn = document.querySelector('.add-question-btn')
const questionsList = document.querySelector('.questions-list')

let numQuestion = 2;

addQuestionBtn.addEventListener('click', (e) => {
	e.preventDefault()
	numQuestion++;
	
	const elem = `
		<label class="form-element" for="question-${numQuestion}">
			<span>${numQuestion} question</span>
			<input class="input" type="text" id="question-${numQuestion}" name="question-${numQuestion}">
		</label>
	`

	questionsList.insertAdjacentHTML('beforeend', elem)
})