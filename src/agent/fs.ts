import * as BrowserFS from 'browserfs';
let git = require('isomorphic-git');

async function run() {
  BrowserFS.configure({ fs: 'InMemory', options: {} }, async function(err) {
    if (err) return console.log(err);
    let fs = BrowserFS.BFSRequire('fs');
    fs.mkdir('/test');
    fs.writeFile('/test/o', 'line', async () => {
      debugger;
      const files = await git.listFiles({ fs, dir: '/test' });
      console.log(files);
      fs.readFile('/test/o', (res) => console.log(res));
    }
    );
  });
}
run();