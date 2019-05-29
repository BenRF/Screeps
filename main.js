var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleWarrior = require('role.warrior');
var roleFixer = require('role.fixer');
var roleTransporter = require('role.transport');
var buildUnitCheck = require('build.unit.check');
var bu = require("build.unit");
var c = require('creep');

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
    
    for (var s in Game.spawns) {
        if(s.spawning) {
            var spawningCreep = Game.creeps[s.spawning.name];
            s.room.visual.text('SPAWNING ' + spawningCreep.memory.role,s.pos.x-2.5,s.pos.y+2, {align: 'left', opacity:1});
        } else {
            buildUnitCheck.run(s);
        }
    }
    
    var towers = Game.spawns["Spawn1"].room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
    for (var tower of towers) {
        require('tower').run(tower);
    }
    
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.ticksToLive <= 30) {
            if (creep.ticksToLive % 5 == 0) {
                var speech = ["Time to go","Goodbye","I tried","Cya round","Adios"];
                creep.say(speech[Math.floor(Math.random()*speech.length)],true);
            } else if (creep.ticksToLive == 2) {
                console.log(name + " has perished")
            }
            c.deposit(creep);
            continue;
        } else if (creep.memory.mining) {
            if (creep.carry.energy == creep.carryCapacity) {
                creep.memory.mining = false;
            } else {
                c.mine(creep);
            }
        } else if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        } else if(creep.memory.role == 'fixer') {
            roleFixer.run(creep);
        } else if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        } else if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        } else if (creep.memory.role == 'warrior') {
            roleWarrior.run(creep);
        } else if (creep.memory.role == 'transporter') {
            roleTransporter.run(creep);
        } else if (creep.memory.role == 'sniper') {
            require('role.sniper').run(creep);
        }
    }
}