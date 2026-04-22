import { readFileSync } from 'node:fs';
import { createServer } from 'node:http';

const hostname = process.env.hostname;
const port = process.env.port;

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

server.on('request', ({ url }, response) => {
  if (url === '/') {
    loadPage(response, 'index');
    return;
  }

  if (url === 'about') {
    loadPage(response, 'pages/about');
    return;
  }

  if (url === 'contact') {
    loadPage(response, 'pages/contact');
    return;
  }

  console.error('404: Not Found');
  loadPage(response);
});

server.listen(port, hostname, () => {
  console.log(`Server running at ${hostname}:${port}`);
});
