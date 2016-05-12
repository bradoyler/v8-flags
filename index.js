var flags = require('v8flags');
var fs = require('fs');

function minorVer(version) {
    return version.split('.').splice(0,2).join('.');
}

flags(function (err, results) {

    if(err) {
        return console.log('Err:', err);
    }

    results.sort(function(a, b){
        if(a < b) return -1;
        if(a > b) return 1;
        return 0;
    });

    var stream = fs.createWriteStream('v'+ minorVer(process.versions.node)+'.md');
    stream.once('open', function(fd) {

        stream.write('Versions: Node='+ process.versions.node+ ' V8='+ process.versions.v8 +'\n');

        stream.write('``` \n');
        results.forEach(function(result) {
            stream.write(result+'\n');
        });
        stream.write('```');
        stream.end();
    });

});
