import { readFileSync } from 'node:fs';
import { createServer } from 'node:http';

const hostname = '127.0.0.1';
const port = 3000;

const server = createServer();

const notFoundPage = 'pages/404';

function loadPage(response, path = notFoundPage) {
  const success = 200;
  const notFound = 404;

  response.writeHead(path === notFoundPage ? notFound : success, {
    'Content-Type': 'text/html',
  });

  const html = readFileSync(`${path}.html`);
  response.end(html);
}

server.on('request', ({ url }, response) => {
  if (url === '/') {
    loadPage(response, 'pages/index');
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
