
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');


var Hook = require('hook.io').Hook;
var hook = new Hook({
        name: 'vanilla-hook',
        debug: true
    });

hook.on("*::hello", function(data){
    console.log("Received data", data, arguments)
});

// Server
hook.on('browser::hello', function(data){
    // outputs 'dog'
    console.log(data);
});

// Register listener for hook::ready event
hook.on('hook::ready', function (data) {
    console.log('hook started - READY_EVENT');
    hook.emit("hello", "some random data");
});




// register listener for any events
hook.onAny(function(data) {
    console.log("OnAny:   " + hook.event + ' Data: ' + JSON.stringify(data));
});

hook.start();

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jshtml');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/one', routes.one);


app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
