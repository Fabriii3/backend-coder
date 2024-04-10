  import fs from "fs";

  export default class ProductManager {
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
     * @param {string} category
     * @param {boolean} status
     */
    readFile = async () => {
      try {
        if (this.#path) {
          let products = await fs.promises.readFile(`${this.#path}`, "utf-8");

          return JSON.parse(products);
        }
      } catch (error) {
        throw new Error(error);
      }
    };

    addProduct = async (
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category,
    ) => {
      try {
        this.#products = await this.readFile();

        const newProduct = {
          id: this.#products.length + 1,
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
          category,
        };
        if (
          !title ||
          !description ||
          !price ||
          !code ||
          !stock ||
          !category
        ) {
          throw new Error("Por favor complete todo los campos");
        }
        const validateProduct = this.#products.find(
          (product) => product.code === code
        );
        if (validateProduct) {
          throw new Error("El producto ya se encuentra agregado...");
        }

        this.#products.push(newProduct);
        await fs.promises.writeFile(
          `${this.#path}`,
          JSON.stringify(this.#products, null, "\t"),
          "utf-8"
        );
        console.log("Producto agregado exitosamente!!");
        return newProduct;
      } catch (error) {
        throw new Error(error);
      }
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