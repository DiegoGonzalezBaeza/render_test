import "dotenv/config";
import { Sequelize } from "sequelize-typescript";
import { User } from "../models/user.model";
import { Movie } from "../models/movie.model";
import { Review } from "../models/review.model";

const DATABASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.DATABASE_URL
    : process.env.DEV_DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("Database URL not configured");
}

export const db = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl:
      process.env.NODE_ENV === "production"
        ? { require: true, rejectUnauthorized: false }
        : false,
  },
  dialect: "postgres",
  models: [User, Movie, Review],
  logging: process.env.NODE_ENV !== "production", // Solo registra en desarrollo
});

// const connectionString = process.env.CONNECT_DB;

// if (!connectionString) {
//     throw new Error("La variable de entorno CONNECT_DB no está definida.");
//   }

// export const sequelize = new Sequelize(connectionString, {
//   dialect: "postgres",
//   models: [User, Movie, Review],
//   logging: false, // disable logging
// });

// sequelize.sync({ force: true }).then(() => {
//   console.log("Database & tables created!");
// });

