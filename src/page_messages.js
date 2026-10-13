
var g_messages_page = null;


function PageMessages()
{
	this.background 	= LoadImage( "images/main_menu.png" );
	this.background_top 	= LoadImage( "images/main_menu_top.png" );
	this.image_back 	= LoadImage( "images/button_main.png" );
	this.button_back 	= new Button( "", this.image_back, 20, 10, 80, 80 ).SetTextOffset( 0, 0 ).SetImageOffset( 0, 0 );
	g_messages_page		= this;

	this.page_container	= 'page_messages_container';

	this.MessageListResponded = function(text)
	{
		var r = eval('(' + text + ')');
		var cont = document.getElementById("page_messages_message_list");
		var txt = '';
		for ( i=0; i < r.Messages.length; ++i)
			txt += add_div(null,null,null) + add_img('images/profile_friends.png') + r.Messages[i].Body + close_div() + add_hr();
		cont.innerHTML = txt;
	}

	this.WillShow = function()
	{
		var canvas = document.getElementById("page_messages_canvas");
		if ( canvas )
			canvas.onmousedown = this.OnMouseDown; 

		DoHttpRequest( '/Messaging/GetMessages?auth_token=' + g_token, 'g_messages_page.MessageListResponded', true );

		return this;
	}

	this.OnMouseDown = function(e)
	{
		x = e.clientX;        
		y = e.clientY;
		if ( g_messages_page.button_back.IsInside(x,y) )
			SetPreviousState();
	}
	
	this.Draw = function ()
	{
		var canvas = document.getElementById("page_messages_canvas");
		if ( !canvas )
			return;	
	    	var context = canvas.getContext("2d");
		context.setTransform( 1.0, 0.0, 0.0, 1.0, 0.0, 0.0 );

		context.drawImage(this.background_top, 0, 0 );
		context.drawImage(this.background, 0, 46 );

		DrawText( context, "Messages", 130, 30, '#000000', 26 );

		this.button_back.Draw( context );

		return this;
	}
}


