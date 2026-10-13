
var g_page_main = null;

function PageMain()
{
	this.background 		= LoadImage( "images/main_menu.png" );
	this.background_top 	= LoadImage( "images/main_menu_top.png" );
	this.background_caption = LoadImage( "images/roblox_caption.png" );
	this.image_profile 		= LoadImage( "images/button_profile.png" );
	this.image_friends 		= LoadImage( "images/button_friends.png" );
	this.image_messages 	= LoadImage( "images/button_messages.png" );
	this.button_profile 	= new Button( "Profile", this.image_profile, 20, 66, 80, 80 ).SetTextOffset( 20, 100 ).SetImageOffset( 0, 0 );
	this.button_friends 	= new Button( "Friends", this.image_friends, 120, 66, 80, 80 ).SetTextOffset( 15, 100 ).SetImageOffset( 0, 0 );
	this.button_messages 	= new Button( "Messages", this.image_messages, 220, 66, 80, 80 ).SetTextOffset( 15, 100 ).SetImageOffset( 0, 0 );
	this.button_back 		= new Button( "Logout", null, 5, 10, 50, 15 ).SetTextOffset( 0, 20 ).SetImageOffset( 0, 0 );
	this.page_container		= 'page_main_container';
	g_page_main = this;


	this.WillShow = function()
	{
		return this;
	}

	this.Draw = function ()
	{
		var canvas = document.getElementById("page_main_canvas");
		if ( !canvas )
			return;	

	    	var context = canvas.getContext("2d");

		context.drawImage(this.background_top, 0, 0 );
		context.drawImage(this.background_caption, 60, 5 );
		context.drawImage(this.background, 0, 46 );

		this.button_profile.Draw( context );
		this.button_friends.Draw( context );
		this.button_messages.Draw( context );
		this.button_back.Draw( context );

		canvas.onmousedown = this.OnMouseDown; 

		return this;
	}

	this.OnMouseDown = function(e)
	{
		x = e.clientX;        
		y = e.clientY;
		if ( g_page_main.button_profile.IsInside(x,y) )
			SetNextState( PageList.Page_Profile );
		if ( g_page_main.button_friends.IsInside(x,y) )
			SetNextState( PageList.Page_Friends );
		if ( g_page_main.button_messages.IsInside(x,y) )
			SetNextState( PageList.Page_Messages );
		if ( g_page_main.button_back.IsInside(x,y) )
		{
			alert( 'login' );
			SetNextState( PageList.Page_Login );
		}
	}
}


