
function Gear(name,damage,equipped)
{
	this.name 		= name;
	this.damage 	= damage;
	this.equipped 	= equipped;
}

function Player(name)
{
	this.health 		= 100;
	this.name 			= name;
	this.last_attack 	= '';
	this.gears			= [ new Gear( 'Punch', 15 , true ) ];

	this.Attack = function(gear,accuracy)
	{
		this.last_attack = gear.name + ' +' + gear.damage*accuracy;
	}

	this.Defend = function(gear,accuracy)
	{
		this.health = Math.max( this.health - gear.damage*accuracy, 0 );
		this.last_attack = gear.name + ' -' + gear.damage*accuracy;
	}
}

function CreateComputerPlayer(name)
{
	var cp = new Player(name);
	cp.gears.push( new Gear( 'Fireball', 20, true ) );
	cp.gears.push( new Gear( 'Lighting', 30, true ) );
	return cp;
}