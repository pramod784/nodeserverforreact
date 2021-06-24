const Models = require("./../models");
const sequelize = require("sequelize");
const Op = require("sequelize").Op;
const md5 = require("md5");
const {sign} = require("jsonwebtoken");
const QueryHelper = require('../helpers/QueryHelper')
require("dotenv").config();
module.exports = {
  RegisterUser: async (req, res) => {
    let register_array = {
      employee_id : req.body.employee_id,
      first_name : req.body.first_name,
      last_name : req.body.last_name,
      email : req.body.email,
      password : req.body.password,
      organization_name : req.body.organization_name,
    }
    let registerResponse = await QueryHelper.registerUser(register_array);
    res.send(registerResponse);
  },
  loginUser: async (req, res) => {
    let login_array = {
      email : req.body.email,
      password : req.body.password
    }
    let loginResponse = await QueryHelper.usersLogin(login_array)
    res.send(loginResponse)
  },
}