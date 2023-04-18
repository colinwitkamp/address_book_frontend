var express = require('express');
var cors = require('cors')
var app = express();

app.use(cors())
app.use(express.static('resources'));

//Serves all the request which includes /images in the url from Images folder
app.use('/api', express.static(__dirname + '/resources'));

app.listen(5000, () => {
    console.log('Server is running at 5000')
});
