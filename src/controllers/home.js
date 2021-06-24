const QueryHelper = require('../helpers/QueryHelper')
var validator = require('validator')
require("dotenv").config();
module.exports = {
  saveData: async (req, res) => {
    if(!req.query.hasOwnProperty('doses') || validator.isEmpty(req.query.doses) || !validator.isInt(req.query.doses) || req.query.doses === undefined || req.query.doses.trim()=="")
    {
      return res.send("Invalid dose value");
    }
    let doses = req.query.doses.trim();

    if(!req.query.hasOwnProperty('city_name') || validator.isEmpty(req.query.city_name) || req.query.city_name === undefined || req.query.city_name.trim()=="")
    {
      return res.send("Invalid city name");
    }
    let city_name = req.query.city_name.toLowerCase().trim();

    let insert_array = {
      city_name:city_name,
      doses:doses
    }
    /* search is city data already exists */
    let data = await QueryHelper.get_vaccine_data(city_name);
    if(data)
    {
      let update_res =  await QueryHelper.update_vaccine_data({doses:insert_array.doses},{id:data.id});
      if(update_res)
      {
        return res.send("Updated successfully!");
      }else{
        return res.send("Unable to update!");
      }

    }else{
      let vaccine_data = QueryHelper.insert_vaccine_data(insert_array);
      if(vaccine_data)
      {
        return res.send("Saved successfully!");
      }else{
        return res.send("Unable to save!");   
      }
    }
  },
}