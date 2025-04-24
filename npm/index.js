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
  
  const headers = { Authorization: `Bearer eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEta2V5LWF0LTEuY2VyIiwia2lkIjoiaW1zX25hMS1rZXktYXQtMSIsIml0dCI6ImF0In0.eyJpZCI6IjE3NDU0NTUzNDk0MTBfNDAyOWMzNTktYTk4MS00YmVhLWJkNTgtNjY2MmU0NTUxODNhX3VlMSIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJjbGllbnRfaWQiOiJkYXJrYWxsZXkiLCJ1c2VyX2lkIjoiQjY3MjFFQjQ2NEYyMTZBMDBBNDk1QzcwQDUzZWExZWI1NjRlZmI1ZTU0OTVlM2UuZSIsInN0YXRlIjoie1wic2Vzc2lvblwiOlwiaHR0cHM6Ly9pbXMtbmExLmFkb2JlbG9naW4uY29tL2ltcy9zZXNzaW9uL3YxL1l6SmpZVGRqTURRdE5EWmtaaTAwTlRBNUxXRTRZamd0WWpZek9UaGpNbUZqWmpnMkxTMDJOa1V4TVVWQk9EWTFNVGN3TlRCRE1FRTBPVFZGUVVKQVl6SXpaVEpoTW1VMk5ESXlPV0UwTmpRNU5XWmhaUzVsXCJ9IiwiYXMiOiJpbXMtbmExIiwiYWFfaWQiOiIyQzJCMjg4RjYzQjcwREI3MEE0OTVDOUVAQWRvYmVJRCIsImN0cCI6MCwiZmciOiJaTVJVVUxYUFZQUDVNSFVLRk1RVllIQUFDQT09PT09PSIsInNpZCI6IjE3NDUyMzgyOTA5MTBfMDU4M2FmZjgtYTJlYy00MzI0LWJlYjUtYjVjZjkwOTI2MzFmX3VlMSIsIm1vaSI6ImEwOWViMDAxIiwicGJhIjoiT1JHLE1lZFNlY05vRVYsTG93U2VjIiwiZXhwaXJlc19pbiI6Ijg2NDAwMDAwIiwiY3JlYXRlZF9hdCI6IjE3NDU0NTUzNDk0MTAiLCJzY29wZSI6ImFiLm1hbmFnZSxBZG9iZUlELGduYXYsb3BlbmlkLG9yZy5yZWFkLHJlYWRfb3JnYW5pemF0aW9ucyxzZXNzaW9uLGFlbS5mcm9udGVuZC5hbGwsYWRkaXRpb25hbF9pbmZvLm93bmVyT3JnLGFkZGl0aW9uYWxfaW5mby5wcm9qZWN0ZWRQcm9kdWN0Q29udGV4dCJ9.ZTS4bBbNyJb7z-WjJPHJGntdoNtp2UNXhOEK5SGUyNCo7b7zIr6GjNPvg-DRnisIomYAtW0MX0ZCsDKi278UYYz1a4ylyW742cj-f_jT6rHnZ6zpaoBWFRSFS1e_g9yi-Lbq9gzYQaAJwleNB3zbv4l5x0B8N0-I9lkG2FGEqcpzxwOR3Vb6UKn-eD4g4IAHeKSfsLJINEpsxb8erfOA8GL00IdqY7vyRUpX6ElEneC-K1No8bS6BhI5246xc7F1zDPZYHK3RVLNZGvQlqSINcD-l337CQfxKCCY5fSt9B87wY8wcHrZ_n2QGyUSNAZfJ7-I83udP7DE_gGJoSCfhA` };
  const opts = { method: 'POST', body, headers };

  const path = `${DA_API}/${ORG}/${REPO}/drafts/tad/node-demo.html`;
  const resp = await fetch(path, opts);
  console.log(resp.status);
})();