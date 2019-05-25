module.exports = {
    run: function(creep) {
        var towers = creep.room.find(FIND_STRUCTURES, {filter: (i) => (i.structureType == STRUCTURE_TOWER) && i.energy < i.energyCapacity});
        if (towers.length >= 1) {
            if (creep.transfer(towers[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(towers[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
            var transporters = _.filter(Game.creeps, (creep) => creep.memory.role == 'transporter');
            var targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter: (i) => (i.structureType == STRUCTURE_CONTAINER) && i.store[RESOURCE_ENERGY] < i.storeCapacity})
            if(targets != null && transporters != 0) {
                if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                require('creep.transport').run(creep);
            }
        }
    }
};