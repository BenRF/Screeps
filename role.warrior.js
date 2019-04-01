var c = require('creep');

module.exports = {
    run: function(creep) {
        var enemies = creep.room.find(FIND_HOSTILE_CREEPS);
        if(enemies.length){
            creep.memory.fighting = true;
            creep.say("DIE",true);
        } else {
            creep.memory.fighting = false;
        }
	    if(creep.memory.fighting) {
            c.fight(creep);
        } else {
            if (creep.carry.energy == creep.carryCapacity) {
                c.deposit(creep);
            } else {
                c.transport(creep);
            }
            
        }
	}
};