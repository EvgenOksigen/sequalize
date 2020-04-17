import Sequelize from 'sequelize'
import db from '../helper/db'

const Test = db.define('test', {
  //atributes
  id : {
    type : Sequelize.BIGINT,
    autoIncrement : true,
    primaryKey : true
  },
  test_json:{
    type: Sequelize.JSONB
  },
  right_answer:{
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  passed : {
    type: Sequelize.BOOLEAN
  }
});


module.exports = Test;