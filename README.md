# Hito_Node.js_API_Sequelize

Proyecto educativo básico "Creación de un servidor" con node, express y sequelize

API de Review y Rating de peliculas (IMDb y Rotten Tomatoes) 

ESTA ES LA CONTINUACIÓN DEL REPOSITORIO: https://github.com/DiegoGonzalezBaeza/Hito-2-Backend_Node_y_Express

## Activo hasta 01/03/25

https://render-test-rklq.onrender.com


Render es una plataforma de hosting en la nube que permite desplegar y gestionar aplicaciones web, APIs y servicios backend de manera sencilla y rápida. Está especialmente orientada a desarrolladores y equipos pequeños que desean evitar la complejidad de manejar infraestructuras de servidores. Ofrece una variedad de características, tales como:

Despliegue automático: Puedes conectar tu repositorio de GitHub o GitLab para desplegar tu aplicación automáticamente cada vez que haces un commit.

Escalabilidad: Render se encarga de escalar automáticamente tus aplicaciones dependiendo del tráfico y las necesidades de tu servicio.

Entornos de producción y desarrollo: Puedes configurar entornos separados para desarrollo y producción, lo cual facilita el manejo de la infraestructura de tu app.

Soporte para múltiples lenguajes y frameworks: Render soporta aplicaciones escritas en lenguajes como JavaScript (Node.js), Python, Ruby, Java, Go, PHP, y muchos más.

Bases de datos gestionadas: Ofrece bases de datos gestionadas como PostgreSQL y Redis sin tener que preocuparte por la infraestructura subyacente.

Precios competitivos: Render tiene una capa gratuita con un límite de uso, y opciones de pago según el tamaño y necesidades de tu proyecto.


### TEST WEB RENDER

# * Se debe vincular con GitHub, con un repositorio (debe estar creado la carpeta dist/index.js para la producción)

# * Cambiar el modelo, existe problemas de circulación:

Circular dependency: src/models/user.model.ts -> src/models/review.model.ts -> src/models/user.model.ts
Circular dependency: src/models/review.model.ts -> src/models/movie.model.ts -> src/models/review.model.ts

Se tuvo que crear un archivo exclusivo para las asociaciones (associations.ts) como tambien eliminar en cada modelo las referencias y dependencias entre ellas. (menos en el caso de review.model.ts) 

RECORDAR: el input de los comandos "start y build" y poner manualmente las variables de entorno vitula (DATABASE_URL y JWT_SECRET)

Settings

![image](./img/Settings-render.webp)

Logs

![image](./img/Logs-render.webp)

### Comandos Docker

```bash
docker compose up -d # Inicia los contenedores en segundo plano
docker compose stop # Detiene los contenedores
docker compose down # Detiene y elimina los contenedores
dokcer compose logs db # Muestra los logs del contenedor db
```

# 1.- Instalar sequelize y pg-hstore:

```bash
npm install --save-dev @types/node @types/validator
npm install sequelize reflect-metadata sequelize-typescript

npm install --save pg pg-hstore
```

# 2.- Modificar tsconfig.json o crear uno nuevo:

```json
{
  "compilerOptions": {
    "target": "es6", // or a more recent ecmascript version
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```
para crear un nuevo tsconfig.json:

```bash
npx tsc --init
```

pero se deben activar "experimentalDecorators": true,  y "emitDecoratorMetadata": true

# 3.- Nuevo Modelo.ts

```ts
import {
  AllowNull,
  Column,
  DataType,
  Default,
  IsEmail,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from "sequelize-typescript";

interface UserAttributes {
  uid?: string;
  email: string;
  password:string;
}

@Table({
  tableName: "users",
})
export class User extends Model<UserAttributes> {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare uid: string;

  @AllowNull(false)
  @IsEmail
  @Unique
  @Column(DataType.STRING)
  declare email: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare password: string;
}
```

# 3.- funciones de sequelize para el service.ts

```ts
findByPk()// READ -- POR ATRIBUTO PRIMARY KEY
findOne() // READ -- POR ATRIBUTO ESPECIFICO
create()  // CREATE
save()    // UPDATE
destroy() // DELETE
```
# 4.- Ingreso de datos: 

## - Users
```json
{
  "email": "user@example.com",
  "password": "string"
}
```

## - Movies
```json
{
  "title": "movie1",
  "release_year": 1990,
  "director": "Nolan",
  "duration_minutes": 150,
  "synopsis": "todo o nada",
  "poster_url": "ww_ww_WW"
}
```
```json
{
  "mid": "06277e68-dc6a-438c-8071-b7b23b2e68b7",
  "title": "movie1",
  "release_year": 1990,
  "director": "Nolan",
  "duration_minutes": 150,
  "synopsis": "todo o nada",
  "poster_url": "ww_ww_WW",
  "updatedAt": "2025-01-16T05:07:50.626Z",
  "createdAt": "2025-01-16T05:07:50.626Z"
}
```

## - Reviews
```json
{
  "uid": "b52c18e9-41aa-4989-85cb-a2f4f862c2c0",
  "mid": "f0bb2d60-ec84-4101-81d9-7ae88b901b2e",
  "rating": 4,
  "review_text": "Buena pelicula, pero algo lenta"
}
```
```json
{
  "rid": "97401c4b-681f-444e-b7e7-f4e98ac6d904",
  "rating": 4,
  "review_text": "Buena pelicula, pero algo lenta",
  "created_at": "2025-01-16T05:42:22.725Z",
  "updated_at": "2025-01-16T05:42:22.725Z",
  "uid": "b52c18e9-41aa-4989-85cb-a2f4f862c2c0",
  "mid": "f0bb2d60-ec84-4101-81d9-7ae88b901b2e"
}
```
## - Register
![image](./img/Register_auth_sequelize.webp)

## - Login
![image](./img/Login_auth_sequelize.webp)

## - Get all Users
![image](./img/Get_all_users_sequelize.webp)

## - Update User
![image](./img/Put_update_by_id_sequilize.webp)

## - Delete User
![image](./img/Delete_user_by_id_sequilize.webp)

## - Swagger
![image](./img/swagger_sequilize.webp)

## - All CRUD - User - Movie - Review (swagger)
![image](./img/Screenshot_16-1-2025_205627_localhost%20(1).jpeg)