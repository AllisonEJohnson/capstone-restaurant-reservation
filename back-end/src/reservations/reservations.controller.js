const service = require("./reservations.server");
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

///validation functions

const VALID_PROPERTIES = [
  'reservation_id',
  'first_name',
  'last_name',
  'mobile_number',
  'reservation_date',
  'reservation_time',
  'people',
  'status',
  'created_at',
  'updated_at'
]


function hasOnlyValidProperties (req, res, next) {
  const { data = {} } = req.body

  const invalidFields = Object.keys(data).filter(
    field => !VALID_PROPERTIES.includes(field)
  )

  if (invalidFields.length)
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(', ')}`
    })
  next()
}

function hasProperties(...properties) {
  return function (res, req, next) {
    const { data = {} } = res.body;

    try {
      properties.forEach((property) => {
        if (!data[property]) {
          const error = new Error(`A '${property}' property is required.`);
          error.status = 400;
          throw error;
        }
      });
      next();
    } catch (error) {
      next(error);
    }
  };
}

const hasRequiredProperties = hasProperties(
  'first_name',
  'last_name',
  'mobile_number',
  'reservation_date',
  'reservation_time',
  'people'
)




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

async function create (req, res, next) {
  const newReservation = { ...req.body.data }
  const data = await service.create(newReservation)
  res.status(201).json({ data: data })
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [hasOnlyValidProperties, hasRequiredProperties, asyncErrorBoundary(create)]
};
