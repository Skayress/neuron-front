const copyLinkBtn = document.querySelector('.button-copy-link')
const copyLinkInput = document.querySelector('.copy-link-input')

copyLinkBtn.addEventListener('click', () => {
	copyLinkInput.select();
	document.execCommand("copy");
	alert("Link copied");
})