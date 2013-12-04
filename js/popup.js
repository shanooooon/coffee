var requestUrl = "http://sandbox.cuttingedge.com.au/coffee/request.php"


$( document ).ready(function() {

	// Check to see if user has entered name
	if (localStorage["name"] == "" ||
		localStorage["name"] == null ||
		localStorage["name"] === 'undefined') {
		$("#options").show();
	} else {
		$("#keen").show();
	}

	loadList()
	restore_options()

	var db = localStorage["coffeeDb"].split("|")

	if(jQuery.inArray( localStorage["name"] , db ) >= 0){
		$("#action").data("action", "cancel")
		$("#action").html("Cancel")
	}

	// Add name
	$("#keen").on("click", "#action", function(e){

		var db = localStorage["coffeeDb"].split("|")
		var action = $("#action").data("action")

		if(jQuery.inArray( localStorage["name"] , db ) < 0 && action == "add"){

			$.ajax({
			 	type: "POST",
			 	url: requestUrl,
			  	data: { type: "add", name: localStorage["name"] }
			}).done(function(data) {
				localStorage["coffeeDb"] = data;
				loadList()

				$("#action").data("action", "cancel")
				$("#action").html("Cancel")
			});
		}


		if(jQuery.inArray( localStorage["name"] , db ) >= 0 && action == "cancel"){
			$.ajax({
			 	type: "POST",
			 	url: requestUrl,
			  	data: { type: "cancel", name: localStorage["name"] }
			}).done(function(data) {
				localStorage["coffeeDb"] = data;
				loadList()
				
				$("#action").data("action", "add")
				$("#action").html("Add")
			});
		}
	})

	// Save name
	$("#save").click(function(e){
		save_options()
	})
});

function loadList(){
	var list	= document.getElementById("list")
	var html	= '';
	var db		= localStorage["coffeeDb"];

	if (db){
		db = db.split("|")
		for(i=0 ; i < db.length ; i++){
			html += "<li>"+db[i]+"</li>"
		}
		list.innerHTML = html
	} else {
		list.innerHTML = "<li><small><i>Be the first to want a coffee.</i></small></li>"
	}
}

function save_options() {
	var name = $("#name").val();
	if (name != "" && isValid(name)) {
		localStorage["name"]	= name;
		$("#keen").show();
		$("#options").hide();
	} else {
		$("#status").html("Please enter your name")
	}
}

function isValid(str) {
	return /^\w+$/.test(str)
}

function restore_options() {
	 var name = localStorage["name"];
	 if (!name)return;

	 $("#name").val(name)
}
