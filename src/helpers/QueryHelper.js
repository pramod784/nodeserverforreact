const Models = require("../models");
const User = require("../models/user");
const sequelize = require("sequelize");
const Op = require("sequelize").Op;
const md5 = require("md5");
const {sign} = require("jsonwebtoken");

require("dotenv").config();
const sort_order_const = ["ASC", "DESC"];
const search_key_const = ["first_name", "last_name", "employee_id"];
const sort_column_const = [
  "first_name",
  "last_name",
  "email",
  "employee_id",
  "organization_name",
];
module.exports = {
  registerUser: async (input) => {
    let employee_id = input.employee_id;
    let first_name = input.first_name;
    let last_name = input.last_name;
    let email = input.email;
    let password = input.password;
    let organization_name = input.organization_name;
    let insertUser = {
      employee_id: employee_id,
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: md5(password),
      status: 1,
    };
    let usersData = "";
    /* check is email id is used */
    usersData = await Models.user
      .findOne({ where: { email: email } })
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return false;
      });
    if (usersData) {
      return {
        status:false,
        message:`Email id '${email}' is already used!`
      }
    }
    /* check is email id is used */
    /* check is employee id is used */
    usersData = await Models.user
      .findOne({ where: { employee_id: employee_id } })
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return false;
      });
    if (usersData) {
      return {
        status:false,
        message:`Employee id '${employee_id}' is already used!`
      }
    }
    /* check is employee id is used */
    try {
      const user_res = await Models.user.create(insertUser);
      return {
        status:true,
        message:`Employee registerd successfully!`,
        result: {
          id: user_res.id,
          employee_id: user_res.employee_id,
          first_name: user_res.first_name,
          last_name: user_res.last_name,
          status: user_res.status,
          email: user_res.email,
        }
      }
    } catch (error) {
      return {
        status:false,
        message:`Error occured! Transaction is not successfull`,
      }
    }
  },
  usersLogin: async (input) => {
    /* let email = input.data.email;
    let password = md5(input.data.password); */
    let email = input.email;
    let password = md5(input.password);
    let usersData = await Models.user.findOne({
        attributes: ["id", "employee_id","last_name","first_name"],
        where: { email: email, password: password },
        raw: true,
      })
      .then((resd) => {
        return resd;
      })
      .catch((e) => {
        return false;
      });
    if (!usersData) {
      return {
        status:false,
        message:`No user found with provided credentials!`,
      }
    }
    let accesstoken = sign(
      {
        data: { user_id: usersData.id },
      },
      process.env.JWT_TOKEN_SECRET,
      { expiresIn: 60 * 60 }
    );
    let response = {
      id: usersData.id,
      employee_id: usersData.employee_id,
      first_name: usersData.first_name,
      last_name: usersData.last_name,
      accesstoken: accesstoken,
    };
    return {
      status:true,
      message:`User looged in successfully!`,
      result:response
    }
  },
  get_vaccine_data:async(city_name)=>{
    let data = await Models.vaccine_data.findOne({
      attribute:['*'],
      where:{city_name:city_name}
    }).then(res=>{
      return res;
    }).catch(err=>{
      return false;
    });
    return data;
  },
  insert_vaccine_data:async(insert_array)=>{
    let vaccine_data = await Models.vaccine_data.create(insert_array)
      .then((insert_result)=>{
        return insert_result;
      })
      .catch(err=>{
        return false;
    });
    return vaccine_data;
  },
  update_vaccine_data:async(update_obj,where_obj)=>{
    let update_res =  await Models.vaccine_data.update(
      update_obj,
        { where: where_obj }
      )
      .then(data => { 
        return true;
      })
      .catch(e => {
        console.log(e);
        return false;
    })
    return update_res;
  }
};