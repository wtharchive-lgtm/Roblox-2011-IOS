
var g_friends_page = null;

function PageFriends()
{
	this.background 	= LoadImage( "images/main_menu.png" );
	this.background_top 	= LoadImage( "images/main_menu_top.png" );
	this.image_back 	= LoadImage( "images/button_main.png" );
	this.button_back 	= new Button( "", this.image_back, 20, 10, 80, 80 ).SetTextOffset( 0, 0 ).SetImageOffset( 0, 0 );

	this.page_container	= 'page_friends_container';
	g_friends_page		= this;

	this.FriendListResponded = function(text)
	{
		var r = eval('(' + text + ')');
		var cont = document.getElementById("page_friends_friend_list");
		var txt = '';
		for ( i=0; i < r.Friends.length; ++i)
			txt += add_div(null,null,null) + add_img('images/profile_friends.png') + r.Friends[i].Name + close_div() + add_hr();
		cont.innerHTML = txt;
	}


	this.WillShow = function()
	{
		var canvas = document.getElementById("page_friends_canvas");
		if ( canvas )
			canvas.onmousedown = this.OnMouseDown; 

		DoHttpRequest( '/Friend/MyFriends?auth_token=' + g_token, 'g_friends_page.FriendListResponded', true );

		return this;
	}

	this.OnMouseDown = function(e)
	{
		x = e.clientX;        
		y = e.clientY;
		if ( g_friends_page.button_back.IsInside(x,y) )
			SetPreviousState();
	}

	this.Draw = function ()
	{
		var canvas = document.getElementById("page_friends_canvas");
		if ( !canvas )
			return;	

	    	var context = canvas.getContext("2d");
		context.setTransform( 1.0, 0.0, 0.0, 1.0, 0.0, 0.0 );

		context.drawImage(this.background_top, 0, 0 );
		context.drawImage(this.background, 0, 46 );

		DrawText( context, "Friends", 130, 30, '#000000', 26 );

		this.button_back.Draw( context );

		return this;
	}
}


