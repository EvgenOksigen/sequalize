import Router from 'koa-router';
import userController from './contollers/user-controller';
import koaBody from 'koa-bodyparser'
const multer = require('@koa/multer')
const storage = multer.diskStorage({
  destination:(req, file, cb)=>{
    cb(null, 'uploads/', console.log('body : ', {...req.body}))
  },
  filename: (req, file, cb)=>{
    cb(null, file.originalname)
  }
})
const upload = multer({storage:storage})

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