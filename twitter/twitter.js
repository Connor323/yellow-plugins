// Twitter plugin, https://github.com/datenstrom/yellow-plugins/tree/master/twitter
// Copyright (c) 2013-2017 Datenstrom, https://datenstrom.se
// This file may be used and distributed under the terms of the public license.

var fjs = document.getElementsByTagName("script")[0];
var js = document.createElement("script");
js.src = "https://platform.twitter.com/widgets.js";
fjs.parentNode.insertBefore(js, fjs);

function TwitterMessage(element, options)
{
	this.element = element;
	this.options = options ? options : this.parseOptions(element, ["tweetLimit", "borderColor", "linkColor", "ariaPolite"]);
	return (this instanceof TwitterMessage ? this : new TwitterMessage());
}

TwitterMessage.prototype =
{
	// Parse Twitter options
	parseOptions: function(element, keyNames)
	{
		var options = {};
		for(var i=0; i<element.attributes.length; i++)
		{
			var attribute = element.attributes[i], key, value;
			if(attribute.nodeName.substr(0, 5)=="data-")
			{
				key = attribute.nodeName.substr(5);
				for(var j=0; j<keyNames.length; j++)
				{
					if(key==keyNames[j].toLowerCase())
					{
						key = keyNames[j];
						break;
					}
				}
				switch(attribute.nodeValue)
				{
					case "true": value = true; break;
					case "false": value = false; break;
					default: value = attribute.nodeValue;
				}
				options[key] = value;
			}
		}
		return options;
	},
	
	// Show Twitter error
	onShowError: function(result)
	{
		var node = document.createTextNode("Twitter '"+this.options.id+"' not available!");
		this.element.appendChild(node);
	},
	
	// Request Twitter data
	request: function()
	{
		if(twttr.widgets)
		{
			var thisObject = this, promise;
			switch(this.options.mode)
			{
				case "tweet":
					promise = twttr.widgets.createTweet(this.options.id, this.element, this.options);
					promise.then(function(result) { if(result==null) { thisObject.onShowError(result); }});
					break;
				case "timeline":
					promise = twttr.widgets.createTimeline({ sourceType: "url", url: "https://twitter.com/"+this.options.id }, this.element, this.options);
					promise.then(function(result) { if(result==null) { thisObject.onShowError(result); }});
					break;
			}
		} else {
			this.onShowError("offline");
		}
	}
}

var initTwitterFromDOM = function()
{
	var twitters = {};
	var elements = document.querySelectorAll(".twitter");
	for(var i=0, l=elements.length; i<l; i++)
	{
		twitters[i] = new TwitterMessage(elements[i]);
		twitters[i].request();
	}
};

window.addEventListener("load", initTwitterFromDOM, false);
