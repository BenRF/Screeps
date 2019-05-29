module.exports = {
    run: function(creep) {
        var towers = creep.room.find(FIND_STRUCTURES, {filter: (i) => (i.structureType == STRUCTURE_TOWER) && i.energy < i.energyCapacity});
        if (creep.transfer(towers[0],RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(towers[0], {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
};