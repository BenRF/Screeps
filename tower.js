module.exports = {
    run: function(tower) {
        var enemies = tower.room.find(FIND_HOSTILE_CREEPS);
        if (enemies.length >= 1) {
            tower.attack(enemies[0]);
        //} else if (tower.energy > 500) {
        //    var sites = tower.room.find(FIND_STRUCTURES, { filter: (i) =>  (i.structureType == STRUCTURE_CONTAINER || i.structureType == STRUCTURE_RAMPART) && i.hits < i.hitsMax});
        //    sites.sort(function(a,b){
        //        var aPerc = (a.hits/a.hitsMax)*100;
        //        var bPerc = (b.hits/b.hitsMax)*100;
        //        return aPerc - bPerc;
        //    });
        //    tower.repair(sites[0]);
        }
    }
};