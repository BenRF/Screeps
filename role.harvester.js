var c = require('creep');

module.exports = {
    run: function(creep) {
	    if(creep.carry.energy == 0 & !creep.memory.mining) {
	        creep.say("I'm empty",true);
	        creep.memory.mining = true;
            creep.memory.depo = false;
	        c.mine(creep);
        }
        if (creep.carry.energy == creep.carryCapacity && !creep.memory.depo) {
            creep.say("I'm full",true);
            creep.memory.mining = false;
            creep.memory.depo = true;
            c.deposit(creep);
        }
        if (creep.memory.depo != true && creep.carry.energy != creep.carryCapacity) {
            creep.memory.mining = true;
            creep.memory.depo = false;
        }
        if (creep.memory.depo) {
            c.deposit(creep);
        }
        if(creep.memory.mining) {
            c.mine(creep);
        }
	}
};