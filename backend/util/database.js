const Sequelize = require("sequelize");
const configJson = require("./config");

const env = process.env.NODE_ENV ? process.env.NODE_ENV : "development";
const config = configJson[env];

console.log("this is the environment : ", env);
console.log(config);

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        port: config.port_db,
        dialect: config.dialect,
        logging: false,
    }
);

sequelize
    .authenticate()
    .then(async ()=>{
        await sequelize.sync({ alter: true});
        console.log("Connection has been established successfully.");
    })
    .catch((err)=>{
        console.error("Unable to connect to the database: ", err);
    });

    const db = {};

    db.sequelize = sequelize;


    //! Models

    db.user = require("../model/user")(sequelize, Sequelize);
    db.informations = require("../model/informations")(sequelize, Sequelize);



    /////////////////////////////// Relation //////////////////////////////////////

    //User relations
    db.user.hasOne(db.informations,{
        foreignKey: "user_id",
        // onDelete: "cascade",
        // constraints : true,
    });

    db.informations.belongsTo(db.user,{
        foreignKey: "user_id",
    });

    

    module.exports = db;