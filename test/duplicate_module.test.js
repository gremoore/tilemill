var assert = require('assert');
var exec = require('child_process').exec;

var count_module = function(name,callback) {
    var cmd = 'npm ls | grep ' + name;
    exec(cmd,
        function (error, stdout, stderr) {
        //if (stderr) return callback(new Error(stderr));
        return callback(null,stdout.match(/@/g).length);
    });
};

describe('config loading pwnage', function() {

['optimist','sqlite3'].forEach(function(mod) {
    it('there should only be one ' + mod + ' module otherwise you are hosed', function(done) {
         count_module(mod, function(err,count) {
            if (err) throw err;
            assert.equal(count,1,'you have more than one copy of ' + mod + ' (based on npm ls output)')
            done();
        });
    });
});

});