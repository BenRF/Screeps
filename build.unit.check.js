var buildUnit = require('build.unit');
module.exports = {
    run: function(spawner) {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        var warriors = _.filter(Game.creeps, (creep) => creep.memory.role == 'warrior');
        var transporters = _.filter(Game.creeps, (creep) => creep.memory.role == 'transporter');
        var fixers = _.filter(Game.creeps, (creep) => creep.memory.role == 'fixer');
        var harvester = ['harvester',1,1,1,0,0,0,0,0];
        var builder = ['builder',1,1,1,0,0,0,0,0];
        var warrior = ['warrior',0,1,1,1,0,0,0,0];
        var transporter = ['transporter',0,2,2,0,0,0,0,0];
        var upgrader = ['upgrader',1,1,1,0,0,0,0,0];
        var fixer = ['fixer',1,1,1,0,0,0,0,0];
        var sniper = ['sniper',0,0,1,0,1,0,0,0];
        var containers = Game.spawns[spawner].room.find(FIND_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_CONTAINER});
        var extensions = Game.spawns[spawner].room.find(FIND_STRUCTURES, { filter: (i) => i.structureType == STRUCTURE_EXTENSION});
        var suggested
        var building = true;
        var cap = Game.spawns[spawner].room.energyCapacityAvailable;
        var num = (cap-(cap%200)) / 200;
        if (num > 3) {
            num = 3;
        }
        if (Game.spawns[spawner].room.find(FIND_HOSTILE_CREEPS).length >= 1) {
            suggested = sniper;
            if (Game.spawns[spawner].energyAvailable == 300) {
                buildUnit.run(['sniper',0,0,1,0,1,0,0,0],spawner);
            }
        } else if (harvesters.length == 0) {
            buildUnit.run(['harvester',1,2,2,0,0,0,0,0],spawner);
        }
        for (var i=0; i < num; i++) {
            if (harvesters.length - i < 1) {
                suggested = harvester;
                break;
            } else if(upgraders.length - i < 0) {
                suggested = upgrader;
                break;
            } else if(builders.length - i < 0) {
                suggested = builder;
                break;
            } else if(transporters.length < 1 && containers.length >= 1 && extensions.length >= 1) {
                suggested = transporter;
                break;
            } else if(fixers.length - i < -2) {
                suggested = fixer;
                break;
            }
        }
        if (suggested != null) {
            if (cap >= 800) {
                cap = 800;
            }
            ///workNum,carryNum,moveNum,attackNum,rangeNum,healNum,claimNum,toughNum
            var left = cap % 200;
            var mod = (cap-left)/200
            for (var i = 1; i <= 8; i++) {
                suggested[i] = suggested[i]*mod;
            }
            while (left > 0) {
                suggested[3] = suggested[3] + 1;
                left = left - 50;
                if (left > 0) {
                    suggested[2] = suggested[2] + 1;
                    left = left - 50;
                }
            }
            buildUnit.run(suggested,spawner);
        }
        
    }
};