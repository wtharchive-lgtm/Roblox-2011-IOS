
var g_page_results = null;

function PageResults()
{
	this.container_name	= "page_results_container";
	this.buttons_x		= 20;
	this.buttons_y		= 180;
	this.buttons_w		= 100;
	this.button_replay 	= new Button( "Rematch", null, this.buttons_x + this.buttons_w*0, this.buttons_y, 80, 80 ).SetTextOffset( 15, 40 ).SetImageOffset( 0, 0 );
	this.button_menu 	= new Button( "Battle menu", null, this.buttons_x + this.buttons_w*1, this.buttons_y, 80, 80 ).SetTextOffset( 15, 40 ).SetImageOffset( 0, 0 );

	g_page_results		= this;


	this.WillShow = function()
	{
		return this;
	}


	this.Draw = function ()
	{
		var canvas = document.getElementById("page_results_canvas");
		if ( !canvas )
			return;	
		canvas.onmousedown = this.OnMouseDown; 

    	var context = canvas.getContext("2d");

		context.fillStyle = '#ffffff';
		context.fillRect(0, 0, 320, 460 );                               

		context.fillStyle = '#000000';
		context.font = '26px san-serif';        		
		context.fillText( g_game.player1.health == 0 ? "You've lost" : 'Congratulations!', 60, 100 );

		this.button_replay.Draw( context );
		this.button_menu.Draw( context );

		return this;
	}

	this.OnMouseDown = function(e)
	{
		x = e.clientX;        
		y = e.clientY;

		if ( g_page_results.button_replay.IsInside(x,y) )
		{
			g_game = new Game();
			g_game.player1 = new Player('User');
			g_game.player2 = CreateComputerPlayer( 'AI' );
			SetNextState( PageList.Page_SelectGear );
		}
		if ( g_page_results.button_menu.IsInside(x,y) )
			SetNextState( PageList.Page_Main );
	}

	this.Show = function ()
	{
		ControlShow( this.container_name, "visible" );
		return this;
	}

	this.Hide = function ()
	{
		ControlShow( this.container_name, "hidden" );
		return this;
	}

	this.SetScale = function(scale)
	{
		ControlSetScale( this.container_name, scale );
		return this;
	}

	this.SetZIndex = function(index)
	{
		ControlSetZIndex( this.container_name, index );
		return this;
	}
}


