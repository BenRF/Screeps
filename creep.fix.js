module.exports = {
    run: function(creep) {
        var sites = creep.room.find(FIND_STRUCTURES, { filter: (i) =>  (i.structureType == STRUCTURE_CONTAINER || i.structureType == STRUCTURE_RAMPART) && i.hits < i.hitsMax});
        sites.sort(function(a,b){
            var aPerc = (a.hits/a.hitsMax)*100;
            var bPerc = (b.hits/b.hitsMax)*100;
            return aPerc - bPerc;
        });
        if (sites.length > 0){
            if(creep.repair(sites[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sites[0], {visualizePathStyle: {stroke: '#FF9A00'}});
            }
        } else {
            var sites = creep.room.find(FIND_STRUCTURES, { filter: (i) =>  (i.structureType == STRUCTURE_ROAD) && i.hits < i.hitsMax});
            if (sites.length >= 1) {
                sites.sort(function(a,b){
                    var aPerc = (a.hits/a.hitsMax)*100;
                    var bPerc = (b.hits/b.hitsMax)*100;
                    return aPerc - bPerc;
                });
                if(creep.repair(sites[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sites[0], {visualizePathStyle: {stroke: '#FF9A00'}});
                }
            } else {
                require('creep.deposit');
            }
        }
    }
};