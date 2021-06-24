const Models = require("../models");
const sequelize = require("sequelize");
const Op = require("sequelize").Op;
const QueryHelper = require('../helpers/QueryHelper')
require("dotenv").config();
module.exports = {
  getData: async (req, res) => {
    let vaccine_data = await Models.vaccine_data.findAll();
    
    let labels = vaccine_data.map((data)=>{
      return data.city_name[0].toUpperCase() + data.city_name.substring(1);
    })
    
    let doses = vaccine_data.map((data)=>{
      return data.doses;
    })
    
    let color_codes = [];
    for (let index = 0; index < vaccine_data.length; index++) {
      color_codes.push(`rgba(${Math.floor(Math.random() * 255) + 1},${Math.floor(Math.random() * 255) + 1},${Math.floor(Math.random() * 255) + 1},0.6)`)
    }

    let data_res = {
      labels: labels,
        datasets:[
          {
            label:'Covishield',
            data:doses,
            backgroundColor:color_codes
          }
        ]
    }
    //console.log(data_res);
    res.header('Access-Control-Allow-Origin', '*');
    res.send(data_res);        
  },
}