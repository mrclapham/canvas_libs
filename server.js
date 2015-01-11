var express = require('express')
    , routes = require('./app/routes')
    , user = require('./app/routes/user')
    , http = require('http')
    , path = require('path')


var app = express();

app.set('title','mr Clapham');

app.use(express.static(path.join(__dirname, 'app')));

/* serves main page */
app.get("/fl", function(req, res) {
    res.sendfile('app/flickr_main.html');
});
app.use("/", express.static(__dirname + 'app/flickr_main.html'));

app.get('/blogs', function(req, res){
    Blogsimple.find(function(err, doc){
        res.send(doc);
    })
});

var port = process.env.PORT || 5002;

http.createServer(app).listen(port, function(){
    console.log('Express server listening on port ' + port);
});