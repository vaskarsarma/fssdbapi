const express = require('express');
const router = express.Router();

const csv = require('csvtojson');

const fs = require('fs');

router.get('/', (req, res, next) => {
    console.log("View airline details !");

    if (fs.existsSync(__dirname + '/temp.json'))
        var rawdata = JSON.parse(fs.readFileSync(__dirname + '/temp.json'));

    res.status(200).json({
        "totalcount": rawdata.length,
        "airline": rawdata
    });
});

/**
 * Read CSV and Save Data into Cloud DB
 */
const saveAirlineInfo = () => {
    try {
        const csvFilePath = __dirname + '/data/airlines.csv';
        var dd;
        csv({
                noheader: false,
                headers: [
                    "airline_id",
                    "name",
                    "alias",
                    "iata",
                    "icao",
                    "callsign",
                    "country",
                    "active"
                ],
                flatKeys: true,
                trim: true,
            })
            .fromFile(csvFilePath)
            .then((jsonObj) => {
                console.log("saveAirlineInfo >> jsonObj length : ", jsonObj.length);
                fs.writeFileSync(__dirname + "/temp.json", JSON.stringify(jsonObj));
            });

    } catch (err) {
        console.log("saveAirlineInfo -> Error : ", err);
    };
}

module.exports = router;