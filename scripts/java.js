
var btnOpen = document.getElementById("open_btn");
var myModalForm = document.getElementById("add_form");

function scrollToContainer() {
	var MySlide = myModalForm.classList.contains("is-open") ? myModalForm : document.body;

	setTimeout(() => {
		MySlide.scrollIntoView({ behavior: "smooth", block: "start" });
	}, 300);
}

function toggleClass(objForm) {
	return function () {
		console.log("++smooth++");
		objForm.classList.toggle("is-open");

		//if (objForm.classList.contains("is-open")) {
		scrollToContainer();
		//}
	};
}

btnOpen.addEventListener("click", toggleClass(myModalForm));
//btnClose.addEventListener("click", toggleClass(myModalForm));
//btnOpenMenu.addEventListener("click", toggleClass(myModalMenu));
//btnCloseMenu.addEventListener("click", toggleClass(myModalMenu));