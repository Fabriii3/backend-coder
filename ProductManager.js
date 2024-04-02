
import fs from "fs"

// const fs = require("fs");

class ProductManager {
  #products;
  #path;
  constructor() {
    this.#products = [];
    this.#path = "./Productos.json";
  }
  /**
   *
   * @param {string} title
   * @param {string} description
   * @param {number} price
   * @param {string} thumbnail
   * @param {string} code
   * @param {number} stock
   */

  readFile = async () => {
    try {
      if (this.#path) {
        const leerArchivo = await fs.promises.readFile(
          `${this.#path}`,
          "utf-8"
        );
        return JSON.parse(leerArchivo);
      }
    } catch (error) {
      throw new Error("No se pudo leer el archivo");
    }
  };

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    const producto = {
      id: this.#getNewId(),
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new Error("Por favor complete todo los campos");
    }
    const validarProducto = this.#products.find(
      (producto) => producto.code === code
    );
    if (validarProducto) {
      throw new Error("El producto ya se encuentra agregado");
    }
    await this.#products.push(producto);
    await fs.promises.writeFile(
      `${this.#path}`,
      JSON.stringify(this.#products, null, "\t"),
      "utf-8"
    );
    console.log("Producto agregado exitosamente");
  };

  getProducts = async () => {
    try {
      const productos = await this.readFile();
      console.log(productos);
    } catch (error) {
      throw new Error("Error al intentar recuperar los datos");
    }
  };

      getProductById = async (id) => {
        try {
          let producto = await this.readFile();
          producto = producto.find((producto) => producto.id === id);
          if (!producto) {
            return(`El producto no se encuentra`);
          }
          return (producto);
        } catch (error) {
          throw new Error(error);
        }
      };

  updateProduct = async (id, updatedProduct) => {
    try {
      const productos = await this.readFile();
      const index = productos.findIndex((product) => product.id === id);
      if (index === -1) {
        throw new Error(
          "No se puede actualizar un producto con un id que no existe"
        );
      }
      productos[index] = { ...this.#products[index], ...updatedProduct };
      console.log("Producto modificado exitosamente");

      await fs.promises.writeFile(
        `${this.#path}`,
        JSON.stringify(productos, null, "\t"),
        "utf-8"
      );
    } catch (error) {
      throw new Error("Error al actualizar el producto");
    }
  };

  deleteProduct = async (id) => {
    try {
      const productos = await this.readFile();

      const indice = productos.findIndex((producto) => producto.id === id);

      if(indice === -1){
        throw new Error("producto no encontrado")
      }
      productos.splice(indice, 1);
      await fs.promises.writeFile(
        `${this.#path}`,
        JSON.stringify(productos, null, "\t"),
        "utf-8"
      ); 
    } catch (error) {
      throw new Error("Ocurrio un error intentando eliminar el producto");
    }
  };

  #getNewId() {
    if (this.#products.length === 0) {
      return 1;
    }
    return this.#products.at(-1).id + 1;
  }
}