import { readFileSync } from 'node:fs';
import { createServer } from 'node:http';

const server = createServer();

const notFoundPage = 'pages/404';

function loadPage(response, path = notFoundPage) {
  const success = 200;
  const notFound = 400;

  response.writeHead(path === notFound ? notFound : success, {
    'Content-Type': 'text/html',
  });

  const html = readFileSync(`${path}.html`);
  response.end(html);
}
