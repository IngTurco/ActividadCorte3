import React, { useState } from "react";
import { crearProducto } from "../firebaseCrud";

const FormularioProducto = ({ onProductoCreado }) => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);

  const validarFormulario = () => {
    const errores = {};
    if (!nombre.trim()) {
      errores.nombre = "El nombre del producto es obligatorio.";
    }
    if (!precio || isNaN(precio) || Number(precio) <= 0) {
      errores.precio = "El precio debe ser un número mayor que 0.";
    }
    if (!descripcion.trim() || descripcion.length < 10) {
      errores.descripcion = "La descripción debe tener al menos 10 caracteres.";
    }
    setErrores(errores);
    return Object.keys(errores).length === 0;
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    setEnviando(true); 
    try {
      const producto = { nombre, precio: Number(precio), descripcion };
      const id = await crearProducto(producto);
      onProductoCreado({ id, ...producto }); 
      setNombre("");
      setPrecio("");
      setDescripcion("");
      setErrores({});
    } catch (error) {
      console.error("Error al agregar producto:", error);
    } finally {
      setEnviando(false); 
    }
  };

  return (
    <form onSubmit={manejarSubmit}>
      <div>
        <input
          type="text"
          placeholder="Nombre del producto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        {errores.nombre && <p style={{ color: "red" }}>{errores.nombre}</p>}
      </div>
      <div>
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
        {errores.precio && <p style={{ color: "red" }}>{errores.precio}</p>}
      </div>
      <div>
        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        {errores.descripcion && (
          <p style={{ color: "red" }}>{errores.descripcion}</p>
        )}
      </div>
      <button type="submit" disabled={enviando}>
        {enviando ? "Agregando..." : "Agregar Producto"}
      </button>
    </form>
  );
};

export default FormularioProducto;
