const catchAsync = require('../utils/catchAsync');
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

let carsDetails = [
  {
    "id": "62ee0bb076f7620c53312095",
    "image": "https://paizatto.s3.ap-south-1.amazonaws.com/grafik8f29dc91-09d7-4a76-baab-6e493a7f48b8.png",
    "model": "BMW 120i",
    "carNumber": "DN C 654",
    "status": "aktiv"
  },
  {
    "id": "62ee0ea876f7620c53312131",
    "image": "https://paizatto.s3.ap-south-1.amazonaws.com/grafik8f29dc91-09d7-4a76-baab-6e493a7f48b8.png",
    "model": "BMW 330e",
    "carNumber": "unbekannt",
    "status": "bestellt"
  },
];

const CarsList = catchAsync(async (req, res, next) => {
  try {
    const values = req.body
    if (carsDetails.length > 0) {
      res.send({
        success: true,
        code: 200,
        status: "Data Retrieved Success",
        Data: carsDetails,
        timestamp: new Date(),
      });
    } else {
      const errcode = new Error("No Data exists.");
      errcode.statusCode = 201;
      return next(errcode);
    }
  } catch (error) {
    console.log("TCL: getBankverbindungen -> error", error)
    const errcode = new Error(error.stack);
    errcode.statusCode = 201;
    return next(errcode);
  }
});

const DamageDashboard = catchAsync(async (req, res, next) => {
  try {
    const values = req.body
    const params = req.params;
    const cars = carsDetails.find(car => car.id === params.id)
    if (cars) {
      let reportsDetails = [
        {
          "id": "62f0aa5eda389d0d5b00815b",
          "damageType": "Glasschaden vom 14.12.2023",
          "damageStatus": "in Werkstatt",
          "reportId": "WAZUU858GF76"
        },
        {
          "id": "62f12181a85b82140325e157",
          "damageType": "Panne/technischer Defekt vom 22.09.2023",
          "damageStatus": "abgeschlossen",
          "reportId": "WAZUU858GF76"
        },
      ]
      cars.Reports = reportsDetails
      localStorage.setItem('cars', JSON.stringify(cars));
      res.send({
        success: true,
        code: 200,
        status: "Data Retrieved Success",
        Data: cars,
        timestamp: new Date(),
      });
    } else {
      const errcode = new Error("No Data exists.");
      errcode.statusCode = 201;
      return next(errcode);
    }
  } catch (error) {
    console.log("TCL: getBankverbindungen -> error", error)
    const errcode = new Error(error.stack);
    errcode.statusCode = 201;
    return next(errcode);
  }
});


const DamageStatus = catchAsync(async (req, res, next) => {
  try {
    const values = req.body
    const params = req.params;
    const DamageStatus = findReportIdByDamageType(params.id);
    if (DamageStatus) {
      let reportsDetails = [
        {
          "RepairStatus": "Schaden gemeldet",
          "Date": "14.12.2023 15:25",
        },
        {
          "RepairStatus": "in Erfassung",
          "Date": "14.12.2023 15:30",
        },
        {
          "RepairStatus": "Erfasst",
          "Date": "14.12.2023 16:15",
        },
        {
          "RepairStatus": "in Werkstatt",
          "Date": "16.12.2023 08:15",
        },
        {
          "RepairStatus": "Reparatur abgeschlossen",
          "Date": "",
        },
      ]
      if (params.id === "62f12181a85b82140325e157") {
        reportsDetails = [
          {
            "RepairStatus": "Gemeldet",
            "Date": "14.12.2023 15:25",
          },
          {
            "RepairStatus": "Verzeichnet",
            "Date": "14.12.2023 15:30",
          },
          {
            "RepairStatus": "Diagnostiziert",
            "Date": "14.12.2023 16:15",
          },
          {
            "RepairStatus": "Repariert",
            "Date": "",
          }
        ]
      }
      DamageStatus.Status = reportsDetails
      res.send({
        success: true,
        code: 200,
        status: "Data Retrieved Success",
        Data: DamageStatus,
        timestamp: new Date(),
      });
    } else {
      const errcode = new Error("No Data exists.");
      errcode.statusCode = 201;
      return next(errcode);
    }
  } catch (error) {
    console.log("TCL: getBankverbindungen -> error", error)
    const errcode = new Error(error.stack);
    errcode.statusCode = 201;
    return next(errcode);
  }
});

const carsStatus = {
  "Reports": [
    {
      "id": "62f0aa5eda389d0d5b00815b",
      "damageType": "Glasschaden vom 14.12.2023",
      "damageStatus": "in Werkstatt",
      "reportId": "WAZUU858GF76"
    },
    {
      "id": "62f12181a85b82140325e157",
      "damageType": "Panne/technischer Defekt vom 22.09.2023",
      "damageStatus": "abgeschlossen",
      "reportId": "WAZUU858GF76"
    }
  ]
}


function findReportIdByDamageType(damageType) {
  const report = carsStatus.Reports.find(report => report.id === damageType);
  let carsStatus1 = {}
  if (report) {
    carsStatus1 = JSON.parse(localStorage.getItem('cars'));
    carsStatus1.Reports = report
  } else {
    carsStatus1.Reports = {}
  }
  return carsStatus1;
}

const CarkmStand = catchAsync(async (req, res, next) => {
  try {
    const values = req.body
    if (values.carid && values.carid.trim() !== '' && values.carno && values.carno.trim() !== '') {
      res.send({
        success: true,
        code: 200,
        status: "Data Successfully Added",
        timestamp: new Date(),
      });
    } else {
      const errcode = new Error("All Field are Monitory");
      errcode.statusCode = 201;
      return next(errcode);
    }
  } catch (error) {
    console.log("TCL: getBankverbindungen -> error", error)
    const errcode = new Error(error.stack);
    errcode.statusCode = 201;
    return next(errcode);
  }
});

module.exports = {
  CarsList,
  DamageDashboard,
  DamageStatus,
  CarkmStand,
}