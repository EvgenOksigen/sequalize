import Sequelize from 'sequelize'
import db from '../helper/db'
import Test from './test'

const Course = db.define('course', {
  //atributes
  id : {
    type : Sequelize.BIGINT,
    autoIncrement : true,
    primaryKey : true
  },
  name:{
    type: Sequelize.STRING,
    unique: true
  },
  period:{
    type: Sequelize.STRING
  }
});

Course.hasMany(Test, {
    foreignKey: 'course_name',
    sourceKey: 'name'
  });
Test.belongsTo(Course,{foreignKey: 'course_name', targetKey: 'name'});

module.exports = Course;