import fs from 'fs'
import User from '../../../models/user'
import UserService from '../../../services/UserService'
import FileUploadService from '../../../services/FileUploadService'

export default {

  async getall(ctx){
    const {allUsers} = await UserService.getAllUsers()
    
    return ctx.body = {allUsers}
  },

  async uploadCsv(ctx){
    try{
      //get a encoding string with instructions 
      const {data, name} = ctx.request.body
      //upload file on server
      const {dataJSON} = FileUploadService.uploadFile(data, name)
      //convert to JSON
      UserService.setUsersFromJSON(dataJSON)

      return ctx.body = 'OK'

    }catch(error) {
      ctx.throw(505, error);
    }
  },

  async downloadUsersJSON(ctx){
    // get all users from db with attributes
    const {allUsers} = await UserService.getAllUsers()
    //take a filename uploaded file
    let {fileName} = FileUploadService.writeFileToJSON(allUsers)
    // set right header
    ctx.attachment(fileName)
    // start a download
    ctx.body = fs.createReadStream(fileName)
  },

  async test(ctx){

    let allUsers = await User.findAll({attributes: ['id', 'user_name', 'last_name', 'first_name', "age"]})
    
    return ctx.body = {allUsers}
  }
}