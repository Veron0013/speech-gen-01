
var btnOpen = document.getElementById("open_btn");
myModalForm = document.getElementById("add_form");

function toggleClass(objForm) {
	return function () {
		objForm.classList.toggle("is-open");
	};
}

btnOpen.addEventListener("click", toggleClass(myModalForm));
//btnClose.addEventListener("click", toggleClass(myModalForm));
//btnOpenMenu.addEventListener("click", toggleClass(myModalMenu));
//btnCloseMenu.addEventListener("click", toggleClass(myModalMenu));