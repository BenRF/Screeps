var c = require('creep');

module.exports = {
    run: function(creep) {
        var targets = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;}});
        if(creep.carry.energy == 0 && targets.length > 0) {
            const target = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES);
            if(target && creep.room.find(FIND_HOSTILE_CREEPS).length == 0) {
                if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target,{visualizePathStyle: {stroke: '#848484'}});
                }
            } else {
                var sources = creep.room.find(FIND_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] > 0});
                if(creep.withdraw(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#848484'}});
                } else {
                    require('creep.mine').run(creep);
                }
                
            }
        } else if(targets.length > 0 && creep.carry.energy > 0) {
            c.transport(creep);
        } else if (targets.length == 0 && creep.carry.energy > 0) {
            c.deposit(creep);
        }
    }
};