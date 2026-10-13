
var g_profile_page;

function PageProfile()
{
	this.background 	= LoadImage( "images/main_menu.png" );
	this.background_top 	= LoadImage( "images/main_menu_top.png" );
	this.profile_robux 	= LoadImage( "images/profile_robux.png" );
	this.profile_tix 	= LoadImage( "images/profile_tix.png" );
	this.profile_messages	= LoadImage( "images/profile_messages.png" );
	this.profile_friends 	= LoadImage( "images/profile_friends.png" );
	this.image_back 	= LoadImage( "images/button_main.png" );
	this.button_back 	= new Button( "", this.image_back, 20, 10, 80, 80 ).SetTextOffset( 0, 0 ).SetImageOffset( 0, 0 );
	this.page_container	= 'page_profile_container';

	this.friend_count	= 0;
	this.message_count	= 0;
	this.robux_count	= 0;
	this.tix_count		= 0;
	this.thumbnail		= null;
	g_profile_page 		= this;

	this.RequestThumbnail = function()
	{
		DoHttpRequest( "/Thumbnail/GetThumbnail?width=352&height=352&username=compavalanche&dummy=json", 'g_profile_page.ThumbnailResponded', true );
	}

	this.ThumbnailResponded = function(text)
	{
		var r = eval('(' + text + ')');
		if ( r.Status == "OK" )
			g_profile_page.thumbnail = LoadImage( r.ThumbnailUrl );
		else
			setTimeout(g_profile_page.RequestThumbnail, 500);   
	}

	this.MyInfoResponded = function(text)
	{
		var r = eval('(' + text + ')');
		g_profile_page.robux_count = r.Robux;
		g_profile_page.tix_count = r.Tickets;
	}

	this.MessageCountResponded = function(text)
	{
		var r = eval('(' + text + ')');
		g_profile_page.message_count = r.Unread;
	}

	this.FriendCountResponded = function(text)
	{
		var r = eval('(' + text + ')');
		g_profile_page.friend_count = r["Pending Friend Requests"];
	}

	this.WillShow = function()
	{
		this.RequestThumbnail();
		DoHttpRequest( "/User/MyInfo?auth_token=" + g_token, 'g_profile_page.MyInfoResponded', true );
		DoHttpRequest( "/Friend/FriendCounts?auth_token=" + g_token, 'g_profile_page.FriendCountResponded', true );
		DoHttpRequest( "/Messaging/MessageCounts?auth_token=" + g_token, 'g_profile_page.MessageCountResponded', true );

		var canvas = document.getElementById("page_profile_canvas");
		if ( canvas )
			canvas.onmousedown = this.OnMouseDown; 
		return this;
	}

	this.OnMouseDown = function(e)
	{
		x = e.clientX;        
		y = e.clientY;
		
		if ( g_profile_page.button_back.IsInside(x,y) )
			SetPreviousState();
	}

	this.Draw = function ()
	{
		var canvas = document.getElementById("page_profile_canvas");
		if ( !canvas )
			return;	

	    	var context = canvas.getContext("2d");

		context.drawImage(this.background_top, 0, 0 );

		context.fillStyle = '#ffffff';
		context.fillRect(0, 46, 320, 400 );

		context.drawImage(this.profile_robux, 250, 5 );
		context.drawImage(this.profile_tix, 250, 20 );

		context.drawImage(this.profile_friends, 200, 370 );
		context.drawImage(this.profile_messages, 100, 370 );

		if ( this.thumbnail != null )
		{
			try
			{
				context.drawImage(this.thumbnail, 0, 0, 352, 352, 20, 60, 300, 300 );
			}
			catch(ex)
			{
			}
		}

		DrawText( context, "Profile", 130, 30, '#000000', 26 );

		DrawText( context, "" + this.robux_count, 270, 15, '#000000', 16 );
		DrawText( context, "" + this.tix_count, 270, 35, '#000000', 16 );
		DrawText( context, "" + this.friend_count, 220, 385, '#000000', 16 );
		DrawText( context, "" + this.message_count, 120, 385, '#000000', 16 );

		context.beginPath();
		context.rect( 70, 350, 200, 60 );
		context.stroke();
		context.closePath();

		this.button_back.Draw( context );

		return this;
	}
}


