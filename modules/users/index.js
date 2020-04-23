import Router from 'koa-router';
import userController from './contollers/user-controller';
import koaBody from 'koa-bodyparser'
const multer = require('@koa/multer')
const upload = multer()

const router = new Router({prefix: '/users'})

router
  .options('/upload-csv', async(ctx)=> ctx.status=200)
  .get('/all', userController.getall)
  .post('/upload-csv', upload.fields([
    {
      name: 'files',
      maxCount: 2
    }]), userController.uploadCsv)
  .get('/download-users-json', userController.downloadUsersJSON)
  .get('/test',  userController.test)
  .post('/test-right', koaBody(), userController.testRight)
  .get('/test/all',  userController.testAll)


export default router.routes();