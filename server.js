var path = require('path');
var express = require('express');
var webpack = require('webpack');
var webpackDevMiddlevare = require('webpack-dev-middleware');
var webpackHotMiddlevare = require('webpack-hot-middleware');
var config = require('./webpack.config');

var port = 3000;
var app = express();
var compiler = webpack(config);

// Dev middleware shit
app.use(webpackDevMiddlevare(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    stats: {
        colors: true
    }
}));

// Hot Module Reloading (HMR) shit
app.use(webpackHotMiddlevare(compiler));

// Hook to return bundled js
app.get('dist/bundle.js', function (req, res) {
    console.log(req.url);
    res.sendFile(path.join(__dirname, 'dist/bundle.js'))
});

// dev server on each request just return index.html (one-page-app like)
app.get('*', function (req, res) {
    console.log(req.url);
    res.sendFile(path.join(__dirname, './assets/index.html'));
});

app.listen(port, 'localhost', function (err) {
    if (err) {
        console.error(err);
        return;
    }

    console.log('Listening at http://localhost:' + port);
});