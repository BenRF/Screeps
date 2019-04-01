var mine = require('creep.mine');
var make = require('creep.make');

module.exports = {
    run: function(creep) {
        var targets = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;}});
        if (targets.length >= 1) {
            if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#00F3FF'}});
            } else if (creep.transfer(targets, RESOURCE_ENERGY) == ERR_FULL) {
                var targets = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return (structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;}});
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#00F3FF'}});
                }
            }
        } else {
            var targets = creep.room.find(FIND_STRUCTURES, {filter: (i) => (i.structureType == STRUCTURE_CONTAINER) && i.store[RESOURCE_ENERGY] < i.storeCapacity});
            if (targets.length >= 1) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                var sites = creep.room.find(FIND_CONSTRUCTION_SITES);
                if(creep.build(sites[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sites[0], {visualizePathStyle: {stroke: '#F8FF00'}});
                }
            }
        }
    }
};