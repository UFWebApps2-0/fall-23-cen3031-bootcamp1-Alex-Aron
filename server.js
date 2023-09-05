const { parse } = require('path');

var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;
var webURL = "";



var requestHandler = function(request, response) {
  webURL  = request.url;
  /*Investigate the request object. 
    You will need to use several of its properties: url and method
  */
  if(request.url != '/listings'){
    response.writeHead(404);
    response.end('Bad gateway error');
  }else{
    //response.end(listingData,{'Content-Type': 'application/json'});
    response.writeHead(200, {"Content-Type": "application/json"});
    response.write(JSON.stringify(listingData));
  }
};


fs.readFile('listings.json', 'utf8', function(err, data) {
  
  //Creates the server
  
  //Start the server
  if (err){
    console.log('Error: ' + err);
    return;
  } 
  listingData = JSON.parse(data);
  server = http.createServer(requestHandler);
  
  server.listen(port, function() {
    //once the server is listening, this callback function is executed
    if(webURL != ""){
      console.log('Navigated to http://127.0.0.1:' + port + webURL);
    }else{
      console.log('Navigated to http://127.0.0.1:' + port);

    }
  });

});

