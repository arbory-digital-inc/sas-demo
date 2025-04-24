const DA_API = 'https://admin.da.live/source';
const ORG = 'arbory-digital-inc';
const REPO = 'sas-demo';

const MOCK_PAGE = `
  <body>
    <header></header>
    <main><div><h1>Hello World</h1></div></main>
    <footer></footer>
  </body>`;

(async () => {
  const body = new FormData();
  const data = new Blob([MOCK_PAGE], { type: 'text/html' });
  body.set('data', data);
  
  const headers = { Authorization: `(REMOVING TOKEN)` };
  const opts = { method: 'POST', body, headers };

  const path = `${DA_API}/${ORG}/${REPO}/drafts/tad/node-demo.html`;
  const resp = await fetch(path, opts);
  console.log(resp.status);
})();