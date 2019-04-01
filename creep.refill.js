
module.exports = {
    run: function(creep) {
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
                creep.memory.mining = true;
                require('creep.mine').run(creep);
            }
            
        }
    }
};

//  && i.store[RESOURCE_ENERGY] > 0