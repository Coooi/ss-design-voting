var express = require('express');
var app     = express();
var morgan  = require('morgan');
var path    = require('path');

app.use(morgan('dev'));
app.set('port', (process.env.PORT || 5000));
// app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/public/views');
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (req, res) {
    res.render('index.html');
});

app.get('/emails', function (req, res) {
    var emails = require("./server/data/messages_sample.json");
    res.send(emails);
});

app.get('/*', function(req, res) {
    res.sendFile('index.html', { root: './public' });
});



app.listen(app.get('port'), function() {
    console.log('App server running at PORT', app.get('port'));
});
