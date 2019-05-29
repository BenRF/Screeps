
module.exports = {
    run: function(creep) {
        const target = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY);
        if(target && creep.room.find(FIND_HOSTILE_CREEPS).length == 0 && _.filter(Game.creeps, (creep) => creep.memory.role == 'transporter') == 0) {
            if(creep.pickup(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target,{visualizePathStyle: {stroke: '#848484'}});
            }
        } else {
            var sources = creep.pos.findClosestByRange(FIND_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] > 0});
            if(creep.withdraw(sources, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources, {visualizePathStyle: {stroke: '#848484'}});
            } else {
                var sources = creep.room.find(FIND_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_CONTAINER});
                if (sources.length < 1) {
                    creep.memory.mining = true;
                    require('creep.mine').run(creep);
                }
            }
            
        }
    }
};