module.exports = {
    run: function(creep) {
        var enemies = creep.room.find(FIND_HOSTILE_CREEPS);
        if (enemies.length > 0) {
            var target = enemies[0];
            var speech = ["Die","Terminate","Exterminate","Perish","Order 66"];
            if (Game.time % 5 == 0) {
                creep.say(speech[Math.floor(Math.random()*speech.length)],true);
            }
            var att = creep.rangedAttack(target)
            if(att == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#f44242'}});
            }
        }
    }
};