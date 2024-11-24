import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

/**
 * @param {Object} producto
 * @returns {string} 
 */
export const crearProducto = async (producto) => {
  try {
    const docRef = await addDoc(collection(db, "productos"), producto);
    return docRef.id; 
  } catch (error) {
    console.error("Error al crear producto:", error);
    throw new Error("No se pudo crear el producto.");
  }
};

/**
 * @returns {Array}
 */
export const obtenerProductos = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "productos"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw new Error("No se pudieron obtener los productos.");
  }
};

/**
 * @param {string} id 
 * @param {Object} nuevosDatos
 */
export const editarProducto = async (id, nuevosDatos) => {
  try {
    const productoRef = doc(db, "productos", id);
    await updateDoc(productoRef, nuevosDatos);
  } catch (error) {
    console.error("Error al editar producto:", error);
    throw new Error("No se pudo editar el producto.");
  }
};

/**
 * @param {string} id 
 */
export const eliminarProducto = async (id) => {
  try {
    const productoRef = doc(db, "productos", id);
    await deleteDoc(productoRef);
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    throw new Error("No se pudo eliminar el producto.");
  }
};
