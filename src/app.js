import express from "express";
import productsRouter from "./products.router.js";
import cartsRouter from "./carts.router.js";
import { __dirname } from "./utils.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/static",express.static(__dirname + "/public"))


app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.listen(8080, (error) => {
  if (error) {
    throw new Error(error);
  }
  console.log("Escuchando al puerto 8080");
});