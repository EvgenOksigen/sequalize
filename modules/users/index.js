import Router from 'koa-router';
import userController from './contollers/user-controller';
import koaBody from 'koa-bodyparser'

const router = new Router({prefix: '/users'})

router
  .options('/upload-csv', async(ctx)=> ctx.status=200)
  .get('/all', userController.getall)
  .post('/upload-csv', koaBody(), userController.uploadCsv)
  .get('/download-users-json', userController.downloadUsersJSON)
  .get('/test',  userController.test)

export default router.routes();