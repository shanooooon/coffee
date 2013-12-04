var source	= new EventSource('http://sandbox.cuttingedge.com.au/coffee/server.php');

source.addEventListener('message', function (event) {


	var data	= event.data
	if(data.length>0){
		var db		= data.split("|");
		var num		= db.length
		if(num>9){
			num = 9+"+"
		}
		if (num==3) {

		}

		var options = {
			type: "basic",
			title: "Primary Title",
			message: "Primary message to display",
			iconUrl: "img/48.png"
		}

		chrome.browserAction.setBadgeText({text:num.toString()});
	} else {
		chrome.browserAction.setBadgeText({text:""});
	}
	if(localStorage["coffeeDb"]!=data)
		localStorage["coffeeDb"] = data;

}, false);
