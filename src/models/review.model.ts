import { Optional } from "sequelize";
import {
  AllowNull,
  Column,
  CreatedAt,
  DataType,
  Default,
  ForeignKey,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
} from "sequelize-typescript";

// 🔴 Agregamos las importaciones necesarias
import { User } from "./user.model";
import { Movie } from "./movie.model";

interface ReviewAttributes {
  rid?: string;
  uid: string;
  mid: string;
  rating: number;
  review_text: string;
  created_at: Date;
  updated_at: Date;
}

export interface ReviewCreationAttributes extends Optional<ReviewAttributes, "rid" | "created_at" | "updated_at"> {}

@Table({
  tableName: "reviews",
})
export class Review extends Model<ReviewAttributes, ReviewCreationAttributes> {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare rid: string;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    validate: {
      min: 1,
      max: 5,
    },
  })
  declare rating: number;

  @AllowNull(false)
  @Column(DataType.TEXT)
  declare review_text: string;

  @CreatedAt
  @Default(DataType.NOW)
  @Column(DataType.DATE)
  declare created_at: Date;

  @UpdatedAt
  @Default(DataType.NOW)
  @Column(DataType.DATE)
  declare updated_at: Date;

  // 🔴 Volvemos a importar User y Movie pero solo para las claves foráneas
  @ForeignKey(() => User)
  @AllowNull(false)
  @IsUUID(4)
  @Column(DataType.UUID)
  declare uid: string;

  @ForeignKey(() => Movie)
  @AllowNull(false)
  @IsUUID(4)
  @Column(DataType.UUID)
  declare mid: string;
}