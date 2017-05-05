const app = require('./server/server');

const port=Number(process.env.PORT || 4000);

app.listen(port, () => {
  console.log('Listening');
});
