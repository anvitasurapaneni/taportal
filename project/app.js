/**
 * Created by seshasai on 11/3/2016.
 */
//dhvani

module.exports = function (app) {
    var models = require("./model/models.server.js")();
    // pass the models to services.
    require("./services/user.service.server.js")(app, models);
    
};


