import express from 'express';

const app = express();

const PORT = 3000;

const dirname = import.meta.dirname;
const root = { root: dirname };

app.get('/', (_, response) => {
  response.sendFile('/pages/index.html', root);
});

app.get('/about', (_, response) => {
  response.sendFile('/pages/about.html', root);
});

app.get('/contact', (_, response) => {
  response.sendFile('/pages/contact.html', root);
});

app.get('/*path', (_, response) => {
  const notFound = 404;
  response.status(notFound).sendFile('/pages/404.html', root);
});

app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`Server running at port ${PORT}`);
});
