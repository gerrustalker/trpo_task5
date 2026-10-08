import { Sequelize, DataTypes } from "sequelize";
import { CronJob } from "cron";
import EventEmitter from "node:events";

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
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false, // this doesn't actually work in sqlite for some reason? "Cannot add a REFERENCES column with non-NULL default value"
        defaultValue: "default",
        references: {
            model: "Role",
            key: "id"
        }
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
    }
})

const Role = sequelize.define("Role", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    purchase: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    sell: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    editProducts: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    changeRoles: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    banUsers: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    deleteUsers: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
})

const Product = sequelize.define("Product", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    article: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
    }
})

const Order = sequelize.define("Order", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    total: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
    }
})

const OrderItem = sequelize.define("OrderItem", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    order: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
})

class DBEventEmitter extends EventEmitter {}
const fin = new DBEventEmitter()

const isDeletedModels = [User, Product, Order]

{(async () => {
    await sequelize.sync({ force: false });
    fin.emit("loaded")
    new CronJob("15 * * * *", async () => {
        isDeletedModels.forEach(el => el.destroy({where: {isDeleted: true}}))
    }, null, true)
})(sequelize)}
export { User, Role, Product, Order, OrderItem, fin as DBEventEmitter, sequelize,DataTypes }