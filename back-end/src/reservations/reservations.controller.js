const service = require("./reservations.server");
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');


//CRUDL functions
async function list(req, res) {
  const {date} = req.query;
  if (date) {
    data = await service.listByDate(date);
  } else {
    data = await service.list();
  }
  res.json({data});
}


module.exports = {
  list: [asyncErrorBoundary(list)]
};
