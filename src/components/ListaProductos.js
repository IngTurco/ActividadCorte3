import React, { useState } from "react";

const ListaProductos = ({ productos, onEliminarProducto, onEditarProducto }) => {
  const [productoEditando, setProductoEditando] = useState(null);

  const manejarEditar = (id, nuevosDatos) => {
    onEditarProducto(id, nuevosDatos);
    setProductoEditando(null);
  };

  return (
    <div>
      <h2>Lista de Productos</h2>
      <ul className="product-list">
        {productos.map((producto) => (
          <li key={producto.id} className="product-item">
            {productoEditando === producto.id ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  manejarEditar(producto.id, {
                    nombre: e.target.nombre.value,
                    precio: Number(e.target.precio.value),
                    descripcion: e.target.descripcion.value,
                  });
                }}
              >
                <input
                  name="nombre"
                  defaultValue={producto.nombre}
                  required
                />
                <input
                  name="precio"
                  type="number"
                  defaultValue={producto.precio}
                  required
                />
                <textarea
                  name="descripcion"
                  defaultValue={producto.descripcion}
                  required
                />
                <button type="submit">Guardar</button>
                <button
                  type="button"
                  onClick={() => setProductoEditando(null)}
                >
                  Cancelar
                </button>
              </form>
            ) : (
              <>
                <span>
                  {producto.nombre} - ${producto.precio}{" "}
                  {producto.usuario && `(Usuario: ${producto.usuario})`}
                </span>
                <button onClick={() => setProductoEditando(producto.id)}>
                  Editar
                </button>
                <button onClick={() => onEliminarProducto(producto.id)}>
                  Eliminar
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaProductos;
