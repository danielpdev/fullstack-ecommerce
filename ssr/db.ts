import * as mongoose from 'mongoose';

export function connectDb(db = "mongodb://127.0.0.1:27017/ecommerce") {
  mongoose
  .connect(
    `${db}`,
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });
}