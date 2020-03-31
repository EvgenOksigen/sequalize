import User from '../models/user'

export default new class UserService {
  constructor(){}
  async  getAllUsers(){
    // get all users from db with attributes
    const allUsers = await User.findAll({attributes: ['id', 'user_name', 'last_name', 'first_name', "age"]});
    return {allUsers}
  }

  async setUsersFromJSON(dataJSON){
    //input in table `Users` in db
    dataJSON.map(async u => await User.findOrCreate({
      where:{
        user_name:u.username,
        first_name:u.firstname,
        last_name:u.lastname,
        age:u.age
      }
    }))
  }
}