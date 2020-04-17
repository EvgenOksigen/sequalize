import fs from 'fs'
import UserService from '../../../services/UserService'
import FileUploadService from '../../../services/FileUploadService'
import Test from '../../../models/test'
import Course from '../../../models/course'
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
    let right_answer =[]

    json.test.item.map(item=> {
      item.answer.map(ans=>{
        if (ans._attributes.right === 'true'){
          return right_answer.push(ans._text)
        }
      })
    })

    await Test.create({
      test_json : json,
      right_answer:right_answer,
      passed:false
    }).then(async test=>{
      await Course.create({
        name: json.test._attributes.course
      }).then(course=>test.setCourse(course))
        .catch(e=>console.log(e))
    }).catch(e=>console.log(e))

    
    let allTests = await Test.findAll({attributes: ["test_json"]});
    allTests.map(el=>{
      delete el.test_json._declaration
      el.test_json.test.item.map(item=>{
        item.answer.map(ans=>{
          delete ans._attributes
        })
      })
    })
    
    return ctx.body = allTests
  },

  async testRight(ctx){
    const mMap = new Map();
    
    let student_answ = ctx.request.body.answers;
    let {right_answer} = await Test.findOne({attributes:['right_answer']})
    let res = []
    
    student_answ.map((el,i)=>{
      mMap.set(right_answer[i],el)
    })

    for (var [key, value] of mMap) {
      res.push(key === value)
    }
    
    await Test.update({passed:true}, {where:{right_answer:right_answer}})
    ctx.body = [...res]
  },

  async testAll(ctx){
    let allTests = await Test.findAll({where:{course_name:'web'},attributes:{
      exclude:['right_answer', 'createdAt', 'updatedAt']
    }})
    allTests.map(el=>{
      delete el.test_json._declaration
      el.test_json.test.item.map(item=>{
        item.answer.map(ans=>{
          delete ans._attributes
        })
      })
    })
    ctx.body = allTests
  },
  async allCourse(ctx){
  }
}