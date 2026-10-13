
var PageList =
{    
	"Page_Main"	: 0,    
	"Page_Profile" 	: 1,
	"Page_Friends" 	: 2,
	"Page_Messages" : 3,
	"Page_Login"	: 4,
	"Page_Transition" : 5
};

var g_start_state = PageList.Page_Login;
var g_current_state = g_start_state, g_prev_state = g_start_state, g_next_state = g_start_state;
var g_pages = [ new PageMain, new PageProfile, new PageFriends, new PageMessages, new PageLogin ];
var g_transition_step = 0, g_shrink = 0;

function HidePrevState()
{
	PageHide(g_prev_state);
	var from_container = document.getElementById( g_pages[ Number(g_prev_state) ].page_container );
	from_container.removeEventListener( "webkitTransitionEnd",  HidePrevState, false );
}

function ScrollLeft(from,to,mode)
{
	var from_container = document.getElementById( g_pages[ Number(from) ].page_container );
	var to_container = document.getElementById( g_pages[ Number(to) ].page_container );
	
	// left, right, shrink, expand
	var src_left_from = [ "0px", "0px", "0px", "0px" ];
	var src_left_to = [ "320px", "-320px", "0px", "0px" ];
	var dst_left_from = [ "-320px", "320px", "0px", "0px" ];
	var dst_left_to = [ "0px", "0px", "0px", "0px" ];
	
	var src_scale_from = [ 1.0, 1.0, 1.0, 1.0 ];
	var src_scale_to = [ 1.0, 1.0, 1.0, 0.0 ];
	
	var dst_scale_from = [ 1.0, 1.0, 0.0, 1.0 ];
	var dst_scale_to = [ 1.0, 1.0, 1.0, 1.0 ];
	
	var src_pos_from_x = [ 0.0, 0.0, 0.0, 0.0 ];
	var src_pos_from_y = [ 0.0, 0.0, 0.0, 0.0 ];
	var src_pos_to_x = [ 0.0, 0.0, 0.0, 160.0 ];
	var src_pos_to_y = [ 0.0, 0.0, 0.0, 230.0 ];
	
	var dst_pos_from_x = [ 0.0, 0.0, 160.0, 0.0 ];
	var dst_pos_from_y = [ 0.0, 0.0, 230.0, 0.0 ];
	var dst_pos_to_x = [ 0.0, 0.0, 0.0, 0.0 ];
	var dst_pos_to_y = [ 0.0, 0.0, 0.0, 0.0 ];

	var from_t = "scale(" + src_scale_from[mode] + " , " + src_scale_from[mode] + ") translate( " + src_pos_from_x[mode] + ',' + src_pos_from_y[mode] + " )";
	var to_t = "scale(" + src_scale_to[mode] + " , " + src_scale_to[mode] + ") translate( " + src_pos_to_x[mode] + ',' + src_pos_to_y[mode] + " )";
	
	var dst_from = "scale(" + dst_scale_from[mode] + " , " + dst_scale_from[mode] + ") translate( " + dst_pos_from_x[mode] + ',' + dst_pos_from_y[mode] + " )";
	var dst_to = "scale(" + dst_scale_to[mode] + " , " + dst_scale_to[mode] + ") translate( " + dst_pos_to_x[mode] + ',' + dst_pos_to_y[mode] + " )";
	
	from_container.style.WebkitTransitionProperty = "none";
	from_container.style.WebkitTransitionDuration = "0ms";	
	PageSetScale( from, src_scale_from[mode] );
	from_container.style.left = src_left_from[mode];
	
	to_container.style.WebkitTransitionProperty = "none";
	to_container.style.WebkitTransitionDuration = "0ms";
	PageSetScale( to, src_scale_to[mode] );
	to_container.style.left = src_left_to[mode];	
	
	// alert( src_left_from[mode] + '|' + src_left_to[mode] + '|' + );
	//alert( from_t + '|' + to_t );
	//alert( dst_from + '|' + dst_to );
	
	setTimeout( function()
			   {
					to_container.style.WebkitTransitionProperty = "all";
					to_container.style.WebkitTransitionDuration = "1000ms";
					PageSetScale( to, dst_scale_to[mode] );
					to_container.style.left = dst_left_to[mode];
					
					if ( mode == 3 )
						to_container.addEventListener("webkitTransitionEnd",  HidePrevState, false );
					// to_container.addEventListener("transitionend", updateTransition, true);
			   
					from_container.style.WebkitTransitionProperty = "all";
					from_container.style.WebkitTransitionDuration = "1000ms";
					PageSetScale( from, dst_scale_from[mode] );
					from_container.style.left = dst_left_from[mode];					
					if ( mode < 3 )
						from_container.addEventListener("webkitTransitionEnd",  HidePrevState, false );
			   }, 50 );	
}

function SetToken(token)
{
	g_token = token.replace( /"/gi, '' );
	if ( g_token != '' )
		SetNextState( PageList.Page_Main );
	else
		alert( 'Cannot login' );	
}

window.onload = function()
{
	var login = readCookie( 'roblox_login' );
	var pass = readCookie( 'roblox_password' );
	if ( login != null )
		document.getElementById( 'username' ).value = login;
	if ( login != null && pass != null )
	{
		DoHttpRequest( "/Auth/GetToken?username=" + login + "&password=" + pass, 'SetToken', false );
		g_current_state = PageList.Page_Main;
	}
	PageShow( g_current_state );
};

function DoLogin(ctrl,event)
{
	if ( event.which == 13 )
	{
		var login = document.getElementById( 'username' ).value;
		var pass = document.getElementById( 'password' ).value;
		createCookie( 'roblox_login', login );
		createCookie( 'roblox_password', pass );
		DoHttpRequest( "/Auth/GetToken?username=" + login + "&password=" + pass, 'SetToken', false );
		ctrl.blur();
	}	
}

function LoadImage(image)
{
	var img = new Image();
	img.src = image;
	return img
}

function PageShow(page)
{
	var container = document.getElementById( g_pages[ Number(page) ].page_container );
	container.style.visibility = "visible";
	return this;
}

function PageHide(page)
{
	var container = document.getElementById( g_pages[ Number(page) ].page_container );
	container.style.visibility = "hidden";
	return this;
}

function PageSetScale(page,scale)
{
	var container = document.getElementById( g_pages[ Number(page) ].page_container );
	var value = "scale(" + scale + " , " + scale + ")";
	container.style['msTransform'] = value;
	container.style['webkitTransform'] = value;
	container.style.left = 0;
	container.style.top = 0;
	return this;
}

function PageSetZIndex(page,index)
{
	var container = document.getElementById( g_pages[ Number(page) ].page_container );
	container.style.zIndex = index;
	return this;
}

function DoDraw(state)
{
	g_pages[ Number(state) ].Draw();
}

function SetNextState(state)
{
	if ( g_current_state == PageList.Page_Transition )
		return;

	var mode = 0;
	if ( state == g_prev_state )
		mode = 1;
	if ( mode == 1 && state == PageList.Page_Main )
		mode = 3;
	if ( g_current_state == PageList.Page_Main && state != PageList.Page_Login )
		mode = 2;
							
	// alert( mode + '|' + state + '|' + g_current_state + '|' + g_prev_state );

	g_prev_state = g_current_state;
	g_current_state = state;
	
	PageShow( g_prev_state ).PageSetScale( g_prev_state, 1.0 ).PageSetZIndex( g_prev_state, mode == 3 ? 0 : 1 );
	PageShow( g_current_state ).PageSetScale( g_current_state, 1.0 ).PageSetZIndex( g_current_state, mode == 3 ? 1 : 0 );
	g_pages[ Number(g_current_state) ].WillShow();
							
	ScrollLeft( g_prev_state, g_current_state, mode );
}

function SetPreviousState()
{
	g_shrink = 1;
	SetNextState( g_prev_state );
	g_shrink = 0;
}

var MainLoop = function()
{       	
	if ( g_current_state == PageList.Page_Transition )
	{
		DoDraw( g_previous_state );
		PageSetScale( g_next_state, g_transition_step * 0.1 );
		DoDraw( g_next_state );

		if ( g_transition_step > 10 )
		{
			PageSetScale( g_next_state, 1.0 );
			PageHide( g_previous_state );
			g_current_state = g_next_state;
		}
		g_transition_step++;
	}
	else
		DoDraw( g_current_state );
	setTimeout(MainLoop, 100);   
}   
MainLoop();  