
var g_page_attack_animation = null;

function PageAttackAnimation()
{
	this.container_name	= "page_attack_animation_container";
	this.time_left		= 10;
	this.image_fist 	= LoadImage( "images/fist.png" );
	g_page_attack_animation	= this;


	this.WillShow = function()
	{
		this.time_left = 1000;
		var count_down = function()
		{
			g_page_attack_animation.time_left -= 10;
			if ( g_page_attack_animation.time_left > 0 )
				setTimeout( count_down, 10 );
		}
		setTimeout( count_down, 10 );		

		var canvas = document.getElementById("page_attack_animation_canvas");
		canvas.onmousedown = this.OnMouseDown; 

		var context = canvas.getContext("2d");

		context.fillStyle = '#ffffff';
		context.fillRect(0, 0, 320, 460 );

		return this;
	}


	this.Draw = function ()
	{
		var canvas = document.getElementById("page_attack_animation_canvas");
		if ( !canvas )
			return;			

    	var context = canvas.getContext("2d");

		context.fillStyle = '#ffffff';
		context.fillRect(0, 0, 320, 460 );

		if ( this.image_fist.complete )
			context.drawImage( this.image_fist, 10, 60 + this.time_left * 0.4 );

		if ( g_page_attack_animation.time_left <= 0 )
		{
			if ( g_game.player1.health == 0 || g_game.player2.health == 0 )
				SetNextState( PageList.Page_Results );
			else
				SetNextState( PageList.Page_BattleZone );
		}

		return this;
	}

	this.OnMouseDown = function(e)
	{
		x = e.clientX;        
		y = e.clientY;
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


