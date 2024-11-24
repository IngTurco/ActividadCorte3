import React, { useState, useEffect } from "react";
import FormularioProducto from "./components/FormularioProducto";
import ListaProductos from "./components/ListaProductos";
import { obtenerProductos, eliminarProducto, editarProducto } from "./firebaseCrud";
import "./App.css";

const App = () => {
  const [productos, setProductos] = useState([]);

  const cargarProductos = async () => {
    const productosObtenidos = await obtenerProductos();
    setProductos(productosObtenidos);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const manejarProductoCreado = (producto) => {
    setProductos((prevProductos) => [...prevProductos, producto]);
  };

  const manejarEliminarProducto = async (id) => {
    await eliminarProducto(id);
    setProductos((prevProductos) =>
      prevProductos.filter((producto) => producto.id !== id)
    );
  };

  const manejarEditarProducto = async (id, nuevosDatos) => {
    await editarProducto(id, nuevosDatos);
    setProductos((prevProductos) =>
      prevProductos.map((producto) =>
        producto.id === id ? { ...producto, ...nuevosDatos } : producto
      )
    );
  };

  return (
    <div className="container">
      <h1>Gestión de Productos</h1>
      <FormularioProducto onProductoCreado={manejarProductoCreado} />
      <ListaProductos
        productos={productos}
        onEliminarProducto={manejarEliminarProducto}
        onEditarProducto={manejarEditarProducto}
      />
    </div>
  );
};

export default App;
