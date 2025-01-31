import { Optional } from "sequelize";
import {
  AllowNull,
  IsUUID,
  Default,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

export interface MovieAttributes {
  mid?: string;
  title: string;
  release_year: number; 
  director?: string;
  duration_minutes?: number;
  synopsis?: string;
  poster_url?: string;
}

export interface MovieCreationAttributes extends Optional<MovieAttributes, "mid"> {}

@Table({
  tableName: "movies",
})
export class Movie extends Model<MovieAttributes, MovieCreationAttributes> {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare mid: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare title: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare release_year: number;

  @AllowNull(true)
  @Column(DataType.STRING)
  declare director?: string;

  @AllowNull(true)
  @Column(DataType.INTEGER)
  declare duration_minutes?: number;

  @AllowNull(true)
  @Column(DataType.TEXT)
  declare synopsis?: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  declare poster_url?: string;
}