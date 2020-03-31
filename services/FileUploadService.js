import fs from 'fs'
import path from 'path'
import csvjson from 'csvjson'

export default new class FileUploadService {
  constructor(){
    this.optionsToJSON = {
      delimiter : ',',
      quote     : '"'
    }
  }

  uploadFile(data, name){
    // take a code information string
    let toDecode = data.split(',')[1]
    // take a algorithm of encode/decode
    let algorithm = data.split(',')[0].split(';')[1]
    // decode from base64 string with algorithm
    let decode = new Buffer.from(toDecode, algorithm);
    //write a file
    fs.writeFileSync(`${name}`, decode);
    
    let dataCsv = fs.readFileSync(path.join(`${name}`),{encoding: "utf8"})
    
    let dataJSON = csvjson.toObject(dataCsv, this.optionsToJSON)
    return {dataCsv, dataJSON}
  }
  
  writeFileToJSON(allUsers){
    //take a data as JSON obj
    let jsData = JSON.stringify(allUsers)
    //create file to write
    fs.open('users.json', 'w', (err) => {
      if(err) throw err;
      console.log('File created');
  });
    // write in file
    fs.writeFileSync('users.json',jsData)
    return { fileName : 'users.json'}
  }
}
