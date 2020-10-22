var driver, ssh;

driver = require('node-ssh');

ssh = new driver();

ssh.connect({
  host: 'ec2-52-91-199-44.compute-1.amazonaws.com',
  username: 'ubuntu',
  privateKey: '~/Documents/EmailScan.pem'
})
.then(function() {
  // Source, Target
  ssh.putFile('~/Documents/EmailScan.pem').then(function() {
    console.log("File Uploaded to the Remote Server");
  }, function(error) {
    console.log("Error here");
    console.log(error);
  });
  // Command
  ssh.exec('hh_client', ['--check'], { cwd: '/var/www/html' }).then(function(result) {
    console.log('STDOUT: ' + result.stdout);
    console.log('STDERR: ' + result.stderr);
  });
});