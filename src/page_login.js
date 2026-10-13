
var g_page_login = null;

function PageLogin()
{
	this.page_container	= 'page_login_container';
	g_page_login = this;


	this.WillShow = function()
	{
		createCookie( 'roblox_password', '' );
		var login = readCookie( 'roblox_login' );
		if ( login != null )
			document.getElementById( 'username' ).value = login;
		return this;
	}

	this.Draw = function ()
	{
		return this;
	}

	this.OnMouseDown = function(e)
	{
	}
}


