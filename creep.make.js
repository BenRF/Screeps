module.exports = {
    run: function(creep) {
        var sites = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        if(creep.build(sites) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sites, {visualizePathStyle: {stroke: '#F8FF00'}});
        }
    }
};