export class Main {
	constructor(s, d = document) {
		this.elem = d.querySelector(s);
		this.elems = Array.from(d.querySelectorAll(s));
	}
	addEvent(elem, e, callback) {
		elem.addEventListener(e, callback);
	}
	media(val) {
		return window.matchMedia(val);
	}
	each(elem, callback) {
		elem.forEach(callback);
	}
	findElement(elems, callback) {
		return elems.find(callback);
	}
	addClass(elem, className) {
		elem.classList.add(className);
	}
	removeClass(elem, className) {
		elem.classList.remove(className);
	}
	containClass(elem, className) {
		return elem.classList.contains(className);
	}
	toggleClass(elem, className) {
		elem.classList.toggle(className);
	}
}