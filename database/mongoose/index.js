'use strict';

module.exports = function (MODULES) {
    let fs          = MODULES.FS;
    let path        = MODULES.PATH;
    let mongoose    = MODULES.MONGOOSE;
    let basename    = path.basename(module.filename);
    let schema      = {};

    if(process.env.MONGO_USER && process.env.MONGO_PASS) {
        mongoose.connect('mongodb://' + process.env.MONGO_USER + ':'
            + process.env.MONGO_PASS + '@' + process.env.MONGO_HOST + ':' + process.env.MONGO_PORT
            + '/' + process.env.MONGO_DATABASE, {useMongoClient: true});
    } else {
        mongoose.connect('mongodb://' + process.env.MONGO_HOST + ':' + process.env.MONGO_PORT
            + '/' + process.env.MONGO_DATABASE, {useMongoClient: true});
    }

    fs.readdirSync(__dirname).filter(function(file) {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    }).forEach(function(file) {
        schema[file.replace(/\.js$/, '')] = mongoose.model(file.replace(/\.js$/, ''), require(path.join(__dirname, file))(MODULES));
    });
    return schema;
};
