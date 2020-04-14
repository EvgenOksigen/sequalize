import Sequelize from 'sequelize'
import db from '../helper/db'

const Test = db.define('test', {
  //atributes
  id : {
    type : Sequelize.BIGINT,
    autoIncrement : true,
    primaryKey : true
  },
  // discipline:{
  //   type: Sequelize.STRING
  // },
  test_json:{
    type: Sequelize.JSONB
  }
});


module.exports = Test;