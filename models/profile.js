import Sequelize from 'sequelize'
import db from '../helper/db'

const Profile = db.define('profile', {
  //atributes
  id : {
    type : Sequelize.BIGINT,
    autoIncrement : true,
    primaryKey : true
  },
  user_name:{
    type: Sequelize.STRING
  },
  age:{
    type: Sequelize.INTEGER
  },
});

module.exports = Profile;