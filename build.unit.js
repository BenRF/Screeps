module.exports = {
    run: function(info,s) {
        var job = info[0];
        var workNum = info[1];
        var carryNum = info[2];
        var moveNum = info[3];
        var attackNum = info[4];
        var rangeNum = info[5];
        var healNum = info[6];
        var claimNum = info[7];
        var toughNum = info[8];
        var unitCost = 0;
        var config = [];
        
        for (i=1; i <= claimNum; i++) {
            config.push(TOUGH);
            unitCost = unitCost + 10;
        }
        for (i=1; i <= workNum; i++) {
            config.push(WORK);
            unitCost = unitCost + 100;
        }
        for (i=1; i <= carryNum; i++) {
            config.push(CARRY);
            unitCost = unitCost + 50;
        }
        for (i=1; i <= moveNum; i++) {
            config.push(MOVE);
            unitCost = unitCost + 50;
        }
        for (i=1; i <= attackNum; i++) {
            config.push(ATTACK);
            unitCost = unitCost + 80;
        }
        for (i=1; i <= rangeNum; i++) {
            config.push(RANGED_ATTACK);
            unitCost = unitCost + 150;
        }
        for (i=1; i <= healNum; i++) {
            config.push(HEAL);
            unitCost = unitCost + 250;
        }
        for (i=1; i <= claimNum; i++) {
            config.push(CLAIM);
            unitCost = unitCost + 600;
        }
        
        var count = _.filter(Game.creeps, (creep) => creep.memory.role == job);
        var num = 1;
        for (var c of count) {
            if (c.name == job + num) {
                num = num + 1;
            }
        }
        var newName = job + num;
        var create = Game.spawns[s].spawnCreep(config, newName, {memory: {role: job}});
        if (create == 0) {
            if (!Game.spawns[s].spawning) {
                console.log('Spawning new ' + job + " for " + unitCost + " energy");
            }
        } else if (create == -3) {
            while (create == -3) {
                num = num + 1;
                create = Game.spawns[s].spawnCreep(config, (job + num), {memory: {role: job}});
            }
        }
    }
};