var c = require('creep');

module.exports = {
    run: function(creep) {
        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.say("I'm empty",true);
            creep.memory.upgrading = false;
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.say("I'm full",true);
	        creep.memory.upgrading = true;
	    }
	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#FF0000'}});
            }
        }
        else {
            c.refill(creep);
        }
	}
};