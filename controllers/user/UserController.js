const _ = require('lodash')
const Employee = require('@models/Employee')
const Responder = require('@service/Responder')

module.exports = {
  //- user listing
  async getUserList(req, res) {
    try {
      let textSearch = {}
      let sortingMatch = {}
      let search = req.body.search;
      let sortingOrder = req.body.sortingOrder;
      let sortBy = req.body.sortBy;
      let perPage = 10; // results per page
      let page = req.body.page || 1; // Page
      //- search on the basis of first name, last name and employee Id
      if (!_.isEmpty(search)) {
        textSearch["$or"] = []
        textSearch["$or"].push({
          firstName: { $regex: new RegExp(search, "i") }
        })
        textSearch["$or"].push({
            lastName: { $regex: new RegExp(search, "i") }
        });
        textSearch["$or"].push({
            employeeId: { $regex: new RegExp(search, "i") }
        });
      }
      //- sort by email, first name, employee id, organisation name
      if (!_.isEmpty(sortBy)) {
        if (sortBy == "firstName") sortingMatch["firstName"] = sortingOrder;
        if (sortBy == "lastName") sortingMatch["lastName"] = sortingOrder;
        if (sortBy == "employeeId") sortingMatch["employeeId"] = sortingOrder;
        if (sortBy == "email") sortingMatch["email"] =sortingOrder;
        if (sortBy == "organisationName") sortingMatch["organisationName"] = sortingOrder;
      }
      let employee = await Employee.find(textSearch)
      .skip(perPage * page - perPage)
      .limit(perPage)
      .sort(sortingMatch);
      return Responder.respondWithSuccess(req, res, employee, 'Retrieve successfully')
    } catch (error) {
      console.log(error)
      return Responder.respondWithError(req, res,error)
    }
  }
}