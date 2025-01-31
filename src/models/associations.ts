import { User } from "./user.model";
import { Review } from "./review.model";
import { Movie } from "./movie.model";

export const setupAssociations = () => {
  User.hasMany(Review, { foreignKey: "uid", as: "reviews" });
  Review.belongsTo(User, { foreignKey: "uid", as: "user" });

  Movie.hasMany(Review, { foreignKey: "mid", as: "reviews" });
  Review.belongsTo(Movie, { foreignKey: "mid", as: "movie" });
};