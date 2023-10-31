// Видео
const videosSetions = document.querySelectorAll('.video');

videosSetions.forEach((videoSection) => {
	const video = videoSection.querySelector('video')
	const toggleSoundButton = videoSection.querySelector('#toggle-sound')
	const reloadVideoButton = videoSection.querySelector('#reload-video')

	function isElementInViewport(el) {
		const rect = el.getBoundingClientRect();
		return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
			rect.right <= (window.innerWidth || document.documentElement.clientWidth)
		);
	}

	function playVideoIfVisible() {
		if (isElementInViewport(video)) {
			video.play();
			window.removeEventListener('scroll', playVideoIfVisible);
		}
	}

	function toggleSound() {
		video.muted = !video.muted;
		toggleSoundButton.innerHTML = video.muted ? `<img src="./images/video/volume-off.svg" alt="volume">` : `<img src="./images/video/volume-on.svg" alt="volume">`;
	}

	function restartVideo() {
		video.currentTime = 0;
		if (video.muted) {
			toggleSound()
		} else {
			return
		}
		video.play();
	}

	window.addEventListener('scroll', playVideoIfVisible);
	toggleSoundButton.addEventListener('click', toggleSound);
	reloadVideoButton.addEventListener('click', restartVideo);
})