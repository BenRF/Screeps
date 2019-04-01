module.exports = {
    construct: function(creep) {
        require('creep.construct').run(creep);
    },
    deposit: function(creep) {
        require('creep.deposit').run(creep);
    },
    make: function(creep) {
        require('creep.make').run(creep);
    },
    mine: function(creep) {
        require('creep.mine').run(creep);
    },
    refill: function(creep) {
        require('creep.refill').run(creep);
    },
    transport: function(creep) {
        require('creep.transport').run(creep);
    },
    fight: function(creep) {
        require('creep.fight').run(creep);
    },
    fix: function(creep) {
        require('creep.fix').run(creep);
    }
};