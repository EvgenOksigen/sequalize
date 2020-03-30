import fs from 'fs'
import path from 'path'
import csvjson from 'csvjson'
import User from '../../../models/user'

const options = {
  delimiter : ',',
  quote     : '"'
}

export default {

  async getall(ctx){
    let allUsers = await User.findAll({attributes: ['id', 'user_name', 'last_name', 'first_name', "age"]})

      return ctx.body = {allUsers}
  },

  async uploadCsv(ctx){
    try{

      //get a encoding string with instructions 
      const {data, name, type} = ctx.request.body
      // take a code information string
      let toDecode = data.split(',')[1]
      // take a algorithm of encode/decode
      let algorithm = data.split(',')[0].split(';')[1]
      // decode from base64 string with algorithm
      let decode = new Buffer.from(toDecode, algorithm);
      //write a file
      fs.writeFileSync(`${name}`, decode);
      
      let data_csv = fs.readFileSync(path.join('users.csv'),{encoding: "utf8"})
      
      let data_json = csvjson.toObject(data_csv, options)

      data_json.map( p => User.findOrCreate({
        where:{
          user_name:p.username,
          first_name:p.firstname,
          last_name:p.lastname,
          age:p.age
        }
      }))

      return ctx.body = 'OK'

    }catch(error) {
      ctx.throw(505, error);
    }
  },

  async downloadUsersJSON(ctx){
    let all = await User.findAll({attributes: ['id', 'user_name', 'last_name', 'first_name', "age"]})

    let js_data = JSON.stringify(all)

    fs.open('users.json', 'w', (err) => {
      if(err) throw err;
      console.log('File created');
  });
  
    fs.writeFileSync('users.json',js_data)

    ctx.set('Content-disposition', `attachment; filename=users.json`);
    ctx.statusCode = 200;
    
    ctx.body = fs.createReadStream('users.json')
  },

  async test(ctx){

    let allUsers = await User.findAll({attributes: ['id', 'user_name', 'last_name', 'first_name', "age"]})
    
    return ctx.body = {allUsers}
  }
}