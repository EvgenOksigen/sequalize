import Koa from 'koa'
import modules from './modules'
import logger from 'koa-logger'
import db from './helper/db'

db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  
const app = new Koa()

app.use(async(ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  ctx.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type");
  await next()
});
app.use(logger())

app.use(modules)

export default app;
