//*** might not need this cause i'm using http-server instead of this ***
/*const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('keys/localhost+2-key.pem'),
  cert: fs.readFileSync('keys/localhost+2.pem')
};

https.createServer(options, function (req, res) {
  fs.readFile('index.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  });
}).listen(8000);*/

const { exec } = require('child_process');

exec("npm run dev", (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
  }
  if(stderr) {
    console.log(`stderr: ${stderr}`);
  }
  console.log(`stdout: ${stdout}`);
  console.log("Server running on port 8080");
});

