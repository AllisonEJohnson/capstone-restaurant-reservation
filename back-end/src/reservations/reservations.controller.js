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

function dateIsValid (req, res, next) {
  const { reservation_date } = req.body.data
  const isDate = Date.parse(reservation_date)

  if (!Number.isNaN(isDate)) {
    return next()
  }
  next({
    status: 400,
    message: `reservation_date is not a valid date.`
  })
}

function timeIsValid (req, res, next) {
  const { reservation_time } = req.body.data
  const isTime = reservation_time.match(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
  if (isTime) {
    return next()
  } else {
    next({
      status: 400,
      message: `reservation_time is not a valid time.`
    })
  }
}

function peopleIsNumber (req, res, next) {
  let { people } = req.body.data
  if (typeof people !== 'number' || people < 0) {
    next({
      status: 400,
      message: `people must be a number and greater than zero.`
    })
  } else {
    return next()
  }
}


//CRUDL functions
async function list(req, res) {
  console.log("req.query", req.query)
  const {date} = req.query;
  let data;
  console.log("date", date);
  if (date) {
    data = await service.listByDate(date);
    console.log("data listbyDate", data)

  } else {
    data = await service.list();
    console.log("data list", data)
  }
  res.status(200).json({data});
}

async function create (req, res, next) {
  const newReservation = { ...req.body.data }
  const data = await service.create(newReservation)
  res.status(201).json({ data: data })
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [hasOnlyValidProperties, hasRequiredProperties, dateIsValid, timeIsValid, peopleIsNumber, asyncErrorBoundary(create)]
};
