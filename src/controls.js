var g_site = "https://services.gametest.roblox.com";
var g_token = null;

String.prototype.format = function() 
{   
	var formatted = this;    
	for (var i = 0; i < arguments.length; i++) 
	{
	        var regexp = new RegExp('\\{'+i+'\\}', 'gi');  
		formatted = formatted.replace(regexp, arguments[i]);    
	}
	return formatted;
};

function DrawText(context,text,x,y,color,size)
{
	context.fillStyle = color;
	context.font = size + 'px tahoma';
	context.fillText( text, x, y );
}

function DoHttpRequest(req,callback,async)
{
	// document.location = 'native_call|' + g_site + req + "|" + callback + "|" + async;
	
	var iframe = document.createElement("IFRAME");
	iframe.setAttribute("src", 'native_call|' + g_site + req + "|" + callback + "|" + async );
	document.documentElement.appendChild(iframe);
	iframe.parentNode.removeChild(iframe);
	iframe = null;
}

function Button(text,image,x,y,w,h) 
{
    	this.text = text;
    	this.image = image;
	this.text_offset_x = 0;
	this.text_offset_y = 0;
	this.image_offset_x = 0;
	this.image_offset_y = 0;
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.Draw = function(context)
	{
		if ( this.image )
			context.drawImage( this.image, this.x + this.image_offset_x, this.y + this.image_offset_y );
		else
		{
			context.fillStyle = '#ffffff';
			context.fillRect( this.x + this.image_offset_x, this.y + this.image_offset_y, this.x + this.image_offset_x + this.w, this.y + this.image_offset_y + this.h );
		}
		if ( text )
			DrawText( context, this.text, this.x + this.text_offset_x, this.y + this.text_offset_y, '#000000', 16 );
	}

	this.SetTextOffset = function(x,y)
	{
		this.text_offset_x = x;
		this.text_offset_y = y;
		return this;
	}

	this.SetImageOffset = function(x,y)
	{
		this.image_offset_x = x;
		this.image_offset_y = y;
		return this;
	}

	this.IsInside = function(x,y)
	{
		if ( x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.h )
			return true;
		return false;
	}
}

function add_div(w,h,ontouch)
{
	var width = w != null ? 'width:' + w + 'px;' : '';
	var height = h != null ? 'height:' + h + 'px;' : '';
	var touch = ontouch != null ? 'onmousedown=' + ontouch + ';' : '';
	return '<div style="' + width + '' + height + '' + touch + 'overflow:auto">';
}

function close_div()
{
	return '</div>';
}

function add_text(txt)
{
	return '<p>' + txt + '</p>';
}

function add_hr()
{
	return '<hr/>';
}

function add_img(src)
{
	return '<img src =' + src + '>';
}

function createCookie(name,value) 
{
	document.cookie = name + '=' + value + '; path=/';
}

function readCookie(name) 
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) 
	{
		var c = ca[i];
		while ( c.charAt(0)==' ' )
			c = c.substring( 1,c.length );
		if ( c.indexOf(nameEQ) == 0 ) 
			return c.substring(nameEQ.length,c.length);
	}
	return null;
}