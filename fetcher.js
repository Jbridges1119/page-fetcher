const args = process.argv.slice(2);
const request = require('request');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


request(args[0], (error, response, body) => {
  if (response.statusCode === 200) {
    fs.writeFile(`${args[1]}`, body, err => {
      if (err) {
        console.error(err);
        process.exit();
      } else {
        console.log(`Downloaded and saved ${body.length} bytes to ${args[1]}`);
        process.exit();
      }
    });
  } else if (response.statusCode === 404) {
    console.log('404: Connection error');
    process.exit();
  } else {
    console.log("URL Invalid");
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
    process.exit();
  }
});


