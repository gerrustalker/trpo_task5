import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./sv.db",
    logging: false
})

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export { User }