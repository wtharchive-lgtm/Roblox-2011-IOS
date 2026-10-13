
var g_page_select_gear = null;

function GearGoBack()
{
	SetNextState( PageList.Page_Main );
}

function GearFight()
{
	SetNextState( PageList.Page_BattleZone );
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

function PageSelectGear()
{
	this.container_name	= "page_select_gear_container";
	g_page_select_gear 	= this;


	this.WillShow = function()
	{
		var cont = document.getElementById(this.container_name);

		var txt = add_div( null, null, null ) + add_text( 'Currently equipped:' );
		for ( i=0; i<3; ++i)
			txt += add_div(null,null,null) + add_img('images/gear.png') + 'Gear 1' + close_div();
		txt += add_hr() + close_div();

		txt += add_div( 320, 100, null )
		for ( i=0; i<50; ++i)
			txt += add_div(null,null,null) + add_img('images/gear.png') + 'Gear 1' + close_div();
		txt += close_div();

		cont.innerHTML = txt + '<button type=button onClick="GearGoBack()"><B>Back</B></button><button type=button onClick="GearFight()"><b>Fight</b></button>';
		return this;
	}

	this.Draw = function ()
	{
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


