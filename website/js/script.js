var component ={
	fetch:function(componentUrl,callback)
	{
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				var response = {};
				response.data = xhttp.responseText.split("${");
				response.variableNames = []
				for(var i = 1; i < response.data.length;i++)
				{
					var index = response.data[i].indexOf("}");
					if(index > -1)
					{
						response.variableNames.push(response.data[i].substr(0,index));
						response.data[i] = response.data[i].substr(index+1);
					}else
					{
						response.error="NO CLOSING BRACE"
					}
				}

				callback(response);
			}
		};
		var url = componentUrl+"/"+componentUrl.substr(componentUrl.lastIndexOf("/")+1)+".html";
		xhttp.open("GET", url, true);
		xhttp.send();
	},
	display:function(componentHTML)
	{
		var componentWrapper = document.createElement("div");
		componentWrapper.innerHTML = componentHTML;
		document.getElementsByTagName('body')[0].appendChild(componentWrapper);
	}

};
