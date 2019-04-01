module.exports = {
    run: function(creep) {
        var sources = creep.room.find(FIND_SOURCES);
        if (sources.length == 1) {
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#848484'}});
            }
        } else {
            var source = sources[creep.name.replace(creep.memory.role,"")%sources.length];
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#848484'}});
            }
        }
    }
};