const exec = require('child_process').exec;
exec('curl -v -X POST -H "Content-Type: application/x-www-form-urlencoded" -H "Cookie: PHPSESSID=g54gcve95h4bcdq8k8a89uous5;" -H "Cache-Control: no-cache" -d \'form[_token]=FINBecBfdH4jCJG2t5GJ7KoVYi3STCUiQWz7Rq6BZBI&form[email]=edgar@cloudoki.com&form[login]=&form[password]=secretstory\' "https://api.moovly.com/oauth2/login?redirect_uri=https://www.moovly.com/platform/auth.html"', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});
