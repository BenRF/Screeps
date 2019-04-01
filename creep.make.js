module.exports = {
    run: function(creep) {
        var sites = creep.room.find(FIND_CONSTRUCTION_SITES);
        var site = sites[0];
        for (var s of sites) {
            if (s.structureType != "road") {
                site = s;
                break;
            }
        }
        if(creep.build(site) == ERR_NOT_IN_RANGE) {
            creep.moveTo(site, {visualizePathStyle: {stroke: '#F8FF00'}});
        }
    }
};