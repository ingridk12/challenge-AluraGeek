const url ="https://6733bdf2a042ab85d117e063.mockapi.io/productos"
const listaProductos = () => fetch(url).then(respuesta => respuesta.json()); 

const addProductoSave = (nombre, categoria, precio, descripcion, imgUrl) => {
    return fetch(url, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
        body: JSON.stringify({ nombre, categoria, precio, descripcion, imgUrl })
})
}



const deleteProductos = (id) => {
    return fetch(url + `/${id}`, {
      method: "DELETE",
    }).then(response => {
      if (!response.ok) {
        // Si el servidor devuelve un error, lanzamos una excepción
        throw new Error(`Error al eliminar el producto con ID ${id}`);
      }
      // Aunque no haya cuerpo, retornamos una confirmación.
      return { message: "Producto eliminado exitosamente" };
    });
  };
  


const detalleProductos = (id) => {
    return fetch(url +`/${id}`).then(respuesta => respuesta.json()
    );
};

const actualizarProducto = (nombre, categoria, precio, descripcion, imgUrl, id) => {
    return fetch(url +`/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre, categoria, precio, descripcion, imgUrl})
    })
}

export const datosProductos = {
    listaProductos, 
    deleteProductos,
    addProductoSave,
    detalleProductos,
    actualizarProducto,
    
  
}