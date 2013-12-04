function save_options() {
	var name				= document.getElementById("name").value;
	var status				= document.getElementById("status");

	if (name != "" && isValid(name)) {
		localStorage["name"]	= name;
		status.innerHTML		= "Saved";
	} else {
		status.innerHTML		= "Please enter your name"
	}
}

function isValid(str) {
	return /^\w+$/.test(str)
}


function restore_options() {
	 var name = localStorage["name"];
	 if (!name)return;

	 var input = document.getElementById("name")
	 input.value = name
}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);

