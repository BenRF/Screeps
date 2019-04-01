var c = require('creep');

module.exports = {
    run: function(creep) {
        if (creep.carry.energy == 0) {
            c.refill(creep);
        } else {
            c.fix(creep);
        }
	}
};