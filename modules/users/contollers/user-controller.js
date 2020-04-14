import fs from 'fs'
import UserService from '../../../services/UserService'
import FileUploadService from '../../../services/FileUploadService'
import Test from '../../../models/test'
import convert from 'xml-js'

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
    let xml = fs.readFileSync('lecture_5.xml')
    let json = JSON.parse(convert.xml2json(xml, {compact:true, spaces:2}))
    // await Test.create({test_json : json})
    // console.log(...json.test.item);
    let allTests = await Test.findAll()
    let formData = allTests.map(el=>{
      el.test_json.test.item.map(item=>{
        item.answer.map(ans=>{
          delete ans._attributes
        })
      })
    })
    console.log(formData);
    
    return ctx.body = allTests
    // return ctx.body = {allUsers}
  }
}