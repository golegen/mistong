var path = require("path"),
    fs = require('fs'),
    mime = require("./mime").types;
module.exports = function(request,response,cab){
    // body...
    var pathname = url.parse(request.url).pathname;
    var realPath = "assets" + pathname;

    function renderFile(url, response) {
        var ext = path.extname(realPath);
        ext = ext ? ext.slice(1) : 'unknown';
        var contentType = mime[ext] || "text/plain";

        path.exists(realPath, function(exists) {
            if (!exists) {
                response.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                response.write("This request URL " + pathname + " was not found on this server.");
                response.end();
            } else {
                fs.readFile(realPath, "binary", function(err, file) {
                    if (err) {
                        response.writeHead(500, {
                            "Content-Type": "text/plain"
                        });
                        response.end(err);
                    } else {
                        response.writeHead(200, {
                            "Content-Type": contentType
                        });
                        response.write(file, "binary");
                        response.end();
                    }
                });
            }
        });
    }
};
