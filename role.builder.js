var c = require('creep');

module.exports = {
    run: function(creep) {
        var sites = creep.room.find(FIND_CONSTRUCTION_SITES);
        if (sites.length >= 1) {
    	    if(creep.carry.energy == 0 || !creep.memory.building) {
    	        if (creep.memory.building) {
    	            creep.say("I'm empty",true);
    	        }
                creep.memory.building = false;
                c.refill(creep);
    	    }
    	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity && sites.length > 0) {
    	        creep.memory.building = true;
    	        creep.say("Build time");
    	    }
            
    	    if(creep.memory.building) {
                if(sites.length) {
                    c.make(creep);
                }
    	    }
        } else {
            require('role.fixer').run(creep);
        }
	}
};