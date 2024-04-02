// const express = require("express")
import express from "express";
import ProductManager from "../ProductManager.js";

const app = express();

app.get("/products", async (req, resp) => {
  try {
    const pm = new ProductManager();
    const { limit } = req.query;

    const productos = await pm.readFile();

    if (limit) {
      const productosLimit = productos.slice(0, parseInt(limit));
      return resp.send(productosLimit);
    }

    return resp.send(productos);
  } catch (error) {
    throw new Error(error);
  }
});

app.get("/products/:pid", async (req, resp) => {
  try {
    const pm = new ProductManager();
    const { pid } = req.params;

    const producto = await pm.getProductById(parseInt(pid));

    return resp.send(producto);
  } catch (error) {
    throw new Error(error);
  }
});

app.listen(8080, (error) => {
  if (error) {
    console.log(error);
  }
  console.log("escuchando al puerto 8080....");
});