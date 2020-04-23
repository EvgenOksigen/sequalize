import Koa from 'koa'
import modules from './modules'
import logger from 'koa-logger'
import db from './helper/db'
import cors from 'koa-cors'


db
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

db.sync({force:true}).then(()=>{
    console.log(db.models); 
})

const app = new Koa()

app.use(cors())




app.use(logger())

app.use(modules)

export default app;
