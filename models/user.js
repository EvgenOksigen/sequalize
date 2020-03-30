import Sequelize from 'sequelize'
import db from '../helper/db'

const User = db.define('user', {
  //atributes
  id : {
    type : Sequelize.BIGINT,
    autoIncrement : true,
    primaryKey : true
  },
  user_name:{
    type: Sequelize.STRING
  },
  first_name:{
    type: Sequelize.STRING

  },
  last_name:{
    type: Sequelize.STRING

  },
  age:{
    type: Sequelize.INTEGER

  },
});

module.exports = User;