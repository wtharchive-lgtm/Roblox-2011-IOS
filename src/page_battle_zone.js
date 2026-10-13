
var g_page_battle_zone = null;

function PageBattleZone()
{
	this.image_friends 	= LoadImage( "images/button_friends.png" );
	this.buttons_x		= 20;
	this.buttons_y		= 180;
	this.buttons_w		= 100;
	this.button_punch 	= new Button( "Punch", null, this.buttons_x + this.buttons_w*0, this.buttons_y, 80, 80 ).SetTextOffset( 15, 40 ).SetImageOffset( 0, 0 );
	this.button_dodge 	= new Button( "Dodge", null, this.buttons_x + this.buttons_w*1, this.buttons_y, 80, 80 ).SetTextOffset( 15, 40 ).SetImageOffset( 0, 0 );
	this.button_end 	= new Button( "End", null, this.buttons_x + this.buttons_w*1, this.buttons_y + 100, 80, 40 ).SetTextOffset( 15, 20 ).SetImageOffset( 0, 0 );
	this.button_gear 	= new Button( "Gear", null, this.buttons_x + this.buttons_w*2, this.buttons_y, 80, 80 ).SetTextOffset( 15, 40 ).SetImageOffset( 0, 0 );
	this.ai_attack		= true;
	this.container_name	= "page_battle_zone_container";
	g_page_battle_zone	= this;


	this.WillShow = function()
	{
		this.ai_attack = !this.ai_attack;
		if ( this.ai_attack == true )
		{
			var count_down = function()
			{
				g_game.attacker = g_game.player2;
				g_game.defender = g_game.player1;

				var g = Math.floor( Math.random() * g_game.player2.gears.length );
				g_game.gear = g_game.player2.gears[ g ];
				SetNextState( PageList.Page_AttackStrength );

				var do_attack = function()
				{
					g_page_attack_strength.time_left = 0;
				}
				setTimeout( do_attack, Math.floor(Math.random()*9000) + 1000 );
			}
			setTimeout( count_down, 1000 );
		}
		return this;
	}

	this.DrawHealthBar = function(context,x,y,health,name)
	{
		var hbar_width = 150;
		var hbar_height = 20;

		var my_gradient = context.createLinearGradient(x, 0, x + hbar_width, 0);
		my_gradient.addColorStop(0, "red");
		my_gradient.addColorStop(0.5, "yellow");
		my_gradient.addColorStop(1, "green");

		context.fillStyle = my_gradient;
		context.fillRect(x, y, hbar_width * health * 0.01, hbar_height );

		context.beginPath();
		context.fillStyle = '#000000';
		context.rect( x, y, hbar_width, hbar_height );
		context.stroke();
		context.closePath();

		context.fillStyle = '#000000';
		context.font = '16px san-serif';
		context.fillText( name, x+5, y+15 );
	}

	this.Draw = function ()
	{
		var canvas = document.getElementById("page_battle_zone_canvas");
		if ( !canvas )
			return;	

	    var context = canvas.getContext("2d");
		context.setTransform( 1.0, 0.0, 0.0, 1.0, 0.0, 0.0 );

		context.fillStyle = '#ffffff';
		context.fillRect(0, 0, 320, 460 );

		this.button_punch.Draw( context );
		this.button_dodge.Draw( context );
		this.button_end.Draw( context );
		this.button_gear.Draw( context );

		context.drawImage(this.image_friends, 230, 5 );
		context.drawImage(this.image_friends, 20, 340 );

		this.DrawHealthBar(context, 60, 20, g_game.player1.health, g_game.player1.name );
		this.DrawHealthBar(context, 120, 350, g_game.player2.health, g_game.player2.name );

		context.fillStyle = '#000000';
		context.font = '26px san-serif';
		context.fillText( 'Select move', 100, 150 );

		context.fillStyle = '#000000';
		context.font = '16px san-serif';
		context.fillText( 'Last attack: ' + g_game.player1.last_attack, 80, 60 );
		context.fillText( 'Last attack: ' + g_game.player2.last_attack, 120, 390 );

		canvas.onmousedown = this.OnMouseDown; 

		return this;
	}

	this.OnMouseDown = function(e)
	{
		x = e.clientX;        
		y = e.clientY;
		if ( g_page_battle_zone.button_punch.IsInside(x,y) && g_page_battle_zone.ai_attack == false )
		{
			g_game.attacker = g_game.player1;
			g_game.defender = g_game.player2;
			g_game.gear = g_game.player1.gears[0];
			SetNextState( PageList.Page_AttackStrength );
		}
		if ( g_page_battle_zone.button_end.IsInside(x,y) && g_page_batlle_zone.ai_attack == false )
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


