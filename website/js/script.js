var currentPage = location.href;
document.addEventListener("click", function (e) {

	if(e.target.hash == "")
	{
		//console.log("ajax page load");
		if(e.target.href.indexOf(e.target.host) > 0)
		{
			let path = e.target.pathname;
			if(path == "/")
			{
				path ="";
			}
			history.pushState(null, null, path);
			loadPage(path);
			e.preventDefault();
			return false;
		}else if ((e.target.hash != undefined))
		{
			//console.log("this is an external link");
		}
	}else if(e.target.hash != undefined)
	{
		//console.log("hash change");
		location.hash = e.target.hash
		//e.preventDefault();
	}

});
function loadPage(path)
{
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			currentPage = path;
			document.getElementById("landing").innerHTML = xhttp.responseText;
		}
	};

	xhttp.open("GET", path, true);
	xhttp.send();
}
window.addEventListener('popstate',function(event){
	let path = event.target.location.pathname;
	if(path == "/")
	{
		path ="";
	}
	var hasHash = event.target.location.href.indexOf("#") > -1;
	if(hasHash)
	{
		if(event.target.location.pathname == currentPage)
		{
			return false;
		}

	}else if(currentPage == event.target.location.pathname)
	{
		return false;
	}else
	{
		loadPage(path);
	}

},false)
