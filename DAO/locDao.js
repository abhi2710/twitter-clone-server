/**
 * Created by abhi1027 on 10/2/16.
 */
var async=require('async'),
    models=require('../models'),
    DAOmanager=require('./DAOmanager');

db.users.aggregate([
    {
        $geoNear: {
            near : { type : "Point", coordinates : [ -73.99279 , 40.719296 ] },
            distanceField: "dist.calculated",
            maxDistance: 2,
            query: { type: "public" },
            includeLocs: "dist.location",
            uniqueDocs: true,
            num: 10,
            spherical: true
        }
    }
]);