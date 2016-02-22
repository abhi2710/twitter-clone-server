var log4js = require('log4js');
var logger = log4js.getLogger('[DaoManager]');

/*
 ----------------------------------------
 GET DATA
 ----------------------------------------
 */
exports.getData = function (model, query, projection, options, callback) {

    model.findOne(query, projection, options, function (err, data) {
        if (err) {
            logger.error("Get Data", err);
            return callback(err,false);
        }
        return callback(null, data);
    });
};
exports.getallData = function (model, query, projection, options, callback) {

    model.find(query, projection, options, function (err, data) {
        if (err) {
            logger.error("Get Data", err);
            return callback(err,false);
        }
        return callback(null, data);
    });
};


/*
 ----------------------------------------
 AGGREGATE DATA
 ----------------------------------------
 */
exports.aggregateData = function (model, group, callback) {
    model.aggregate(group, function (err, data) {

        if (err) {
            logger.error("Aggregate Data", err);
            return callback(err);
        }
        return callback(null, data);
    });
};


/*
 ----------------------------------------
 SET DATA
 ----------------------------------------
 */
exports.setData = function (model, data, callback) {

    new model(data).save(function (err, resultData) {

        if (err) {
           // logger.error("SET DATA: ", err);
            return callback(err,null);
        }
          else {
            var result = resultData.toObject();
            delete result.__v;
           return callback(null,result);
        }
    });
};


/*
 ----------------------------------------
 DELETE DATA
 ----------------------------------------
 */
exports.deleteData = function (model, conditions, callback) {

    model.remove(conditions, function (err, removed) {

        if (err) {
            logger.error("Delete Data", err);
            return callback(err,removed);
        }
        return callback(null,removed);
    });
};

/*
 ----------------------------------------
 BATCH INSERT
 ----------------------------------------
 */
exports.batchInsert = function (model, batchData, options, callback) {
    model.collection.insert(batchData, options, function (error, docs) {
        if (error) {
            logger.error("Batch insert:", error);
            return callback(error);
        }

        return callback(null, docs);

    });
};


exports.getCount = function (model, condition, callback) {
    model.count(condition, function (error, count) {
        if (error) {
            logger.error("Error Get Count: ", error);
            return callback(error);
        }
        return callback(null, count);
    })
};

/*
 ----------------------------------------
 UPDATE DATA
 ----------------------------------------
 */
exports.update = function (model, conditions, update, options, callback) {
    model.update(conditions, update, options, function (err, result) {
        if (err) {
            //logger.error("Update Query: ", err);
            return callback(err);
        }
        logger.trace("Update Result: ", JSON.stringify(result));
        return callback(null,result);
    });
};
/*
 ---------------------------------------------------------------------------------------------
 WARNING: Not a general module just for category-sub-service tree or for three level tree only
 ---------------------------------------------------------------------------------------------
 */
exports.getDataDeepPopulateThreeLevel = function (model, query, projectionQuery, options, populateModel, nestedModel, callback) {

    model.find(query, projectionQuery, options).populate(populateModel)
        .exec(function (err, docs) {

            if (err) return callback(err);

            model.populate(docs, nestedModel,
                function (err, populatedDocs) {
                    if (err) return callback(err);
                    callback(null, populatedDocs);// This object should now be populated accordingly.
                });
        });
};
/*
 ---------------------------------------------------------------------------------------------
 WARNING: Not a general module just for category-sub-service-subService tree or for four level tree only
 ---------------------------------------------------------------------------------------------
 */
exports.getDataDeepPopulateFourLevel = function (model, query, projectionQuery, options, populateModel, nestedModel, deepNestedModel, callback) {

    model.find(query, projectionQuery, options).populate(populateModel)
        .exec(function (err, docs) {

            if (err) return callback(err);

            model.populate(docs, nestedModel,
                function (err, populatedDocs) {

                    if (err) return callback(err);
                    model.populate(populatedDocs, deepNestedModel,
                        function (err, deepPopulatedDocs) {
                            if (err) return callback(err);
                            callback(null, deepPopulatedDocs);
                        });
                });
        });
};

exports.getDistinctData = function (model, field, condition, callback) {
    model.distinct(field, condition, function (error, result) {
        if (error) {
            logger.error("Distinct Data", error);
            return callback(error);
        }
        return callback(null, result);
    })
};

exports.findOneAndUpdateData = function (model, conditions, update, options, callback) {
    model.findOneAndUpdate(conditions, update, options, function (error, result) {
        if (error) {
            logger.error("Find one and update", error);
            return callback(error);
        }
        return callback(null, result);
    })
};

/*
 ----------------------------------------
 GET DATA WITH REFERENCE
 ----------------------------------------
 */
exports.getDataWithReference = function (model, query, projection, options, collectionOptions, callback) {
    model.find(query, projection, options).populate(collectionOptions).exec(function (err, data) {

        if (err) {
            logger.error("Error Data reference: ", err);
            return callback(err);
        }
        return callback(null, data);

    });
};


