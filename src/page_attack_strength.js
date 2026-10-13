
var g_page_attack_strength = null;

function roundRect(ctx, x, y, width, height) 
{  
	var radius = 5;  
	ctx.beginPath();  
	ctx.moveTo(x + radius, y);  
	ctx.lineTo(x + width - radius, y);  
	ctx.quadraticCurveTo(x + width, y, x + width, y + radius);  
	ctx.lineTo(x + width, y + height - radius);  
	ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);  
	ctx.lineTo(x + radius, y + height);  
	ctx.quadraticCurveTo(x, y + height, x, y + height - radius);  
	ctx.lineTo(x, y + radius);  
	ctx.quadraticCurveTo(x, y, x + radius, y);  
	ctx.closePath();  

	ctx.stroke();  
	ctx.fill();  
}

function PageAttackStrength()
{
	this.image_friends 	= LoadImage( "images/button_friends.png" );
	this.container_name	= "page_attack_strength_container";
	this.button_punch 	= new Button( null, null, 50, 160, 230, 100 ).SetTextOffset( 15, 40 ).SetImageOffset( 0, 0 );
	this.ball_x			= 100;
	this.ball_vx		= 1;
	this.time_left		= 10;
	g_page_attack_strength	= this;


	this.WillShow = function()
	{
		this.time_left = 10;
		var count_down = function()
		{
			g_page_attack_strength.time_left--;
			if ( g_page_attack_strength.time_left > 0 )
				setTimeout( count_down, 1000 );
		}
		setTimeout( count_down, 1000 );
		setTimeout( this.UpdateBall, 20 );

		var canvas = document.getElementById("page_attack_strength_canvas");
    	var context = canvas.getContext("2d");

		context.fillStyle = '#ffffff';
		context.fillRect(0, 0, 320, 460 );

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
	
	this.UpdateBall = function()
	{
		g_page_attack_strength.ball_x += g_page_attack_strength.ball_vx;
		if ( g_page_attack_strength.ball_x > 200 )
			g_page_attack_strength.ball_vx = -1;
		if ( g_page_attack_strength.ball_x < 100 )
			g_page_attack_strength.ball_vx = 1;

		if ( g_page_attack_strength.time_left > 0 )
			setTimeout( g_page_attack_strength.UpdateBall, 20 );
	}

	this.DoAttack = function()
	{
		var effect = 1 - Math.abs(this.ball_x-150) / 50;
		g_game.attacker.Attack(g_game.gear,effect);
		g_game.defender.Defend(g_game.gear,effect);
		SetNextState( PageList.Page_AttackAnimation );
	}

	this.Draw = function ()
	{
		var canvas = document.getElementById("page_attack_strength_canvas");
		if ( !canvas )
			return;	

    	var context = canvas.getContext("2d");
		context.setTransform( 1.0, 0.0, 0.0, 1.0, 0.0, 0.0 );

		context.fillStyle = '#ffffff';
		context.fillRect(0, 0, 320, 460 );


		if ( g_game.attacker == g_game.player1 )
		{
			context.drawImage(this.image_friends, 230, 5 );
			this.DrawHealthBar(context, 60, 20, g_game.player1.health, g_game.player1.name );

			context.fillStyle = '#000000';
			context.font = '16px san-serif';
			context.fillText( 'Last attack: ' + g_game.player1.last_attack, 80, 60 );
		}

		if ( g_game.attacker == g_game.player2 )
		{
			context.drawImage(this.image_friends, 20, 340 );		
			this.DrawHealthBar(context, 120, 350, g_game.player2.health, g_game.player2.name );

			context.fillStyle = '#000000';
			context.font = '16px san-serif';
			context.fillText( 'Last attack: ' + g_game.player2.last_attack, 120, 390 );
		}
    		

		context.fillStyle = '#000000';
		context.font = '26px san-serif';
		context.fillText( g_game.gear.name + ' effectiviness', 60, 190 );

		context.fillStyle = '#000000';
		context.font = '16px san-serif';
		context.fillText( 'Tap bar when ball is in center', 60, 250 );

		context.beginPath();
		context.fillStyle = '#000000';
		context.rect( 50, 160, 230, 100 );
		context.stroke();
		context.closePath();

		
		context.fillStyle = "#FFFFff";
		roundRect( context, 80, 198, 140, 25 );

		context.strokeStyle = "#000000";
		context.fillStyle = "#FFFF00";
		context.beginPath();
		context.arc( this.ball_x, 210, 10, 0, Math.PI*2,true);
		context.closePath();
		context.stroke();
		context.fill();

		context.fillStyle = "#FFFFff";
		roundRect( context, 80, 298, 140, 25 );
		context.fillStyle = '#000000';
		context.fillText( this.time_left + ' seconds', 120, 315 );

		if ( g_page_attack_strength.time_left <= 0 )
			this.DoAttack();

		canvas.onmousedown = this.OnMouseDown; 

		return this;
	}

	this.OnMouseDown = function(e)
	{
		x = e.clientX;        
		y = e.clientY;

		if ( g_page_attack_strength.button_punch.IsInside(x,y) && g_game.attacker == g_game.player1 )
			g_page_attack_strength.time_left = 0;
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


