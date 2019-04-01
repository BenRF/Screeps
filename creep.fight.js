module.exports = {
    run: function(creep) {
        var enemies = creep.room.find(FIND_HOSTILE_CREEPS);
        //var speech = {"Die","Terminate","Exterminate","Perish","Order 66"};
        var speech = "Die";
        //creep.say(speech[Math.floor(Math.random()*speech.length)],true);
        if(creep.attack(enemies[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(enemies[0], {visualizePathStyle: {stroke: '#f44242'}});
        }
    }
};