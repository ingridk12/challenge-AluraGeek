import { datosProductos } from "../JS/productos.js"

const $printProductos = document.querySelector("[data-mostrarProducto]");
const section = document.querySelector("#productos")


   const  printCategory = (category) => {
  const categoryParent = document.createElement("div")
  categoryParent.classList.add("category_items")
  categoryParent.classList.add("filtro")
  categoryParent.innerHTML = `
  <div class="category__head"> 
  <p class="category__title">${category}</p>
  <button id="btn_aument" class="btn__category__show btn_category__height">Ver todo</button>
  <button id="btn__reduce" class="btn__category__hide btn_category__height btn__ocultar">Ocultar</button>
</div>
<div id="container__category" class="category__position category__height"></div>
`;
  return categoryParent
}
export const printProductos = (nombre, precio, imgUrl, id, categoria) => {
  const anhadirLinea = document.createElement("div");
  anhadirLinea.classList.add("producto__target");
  const contenido = `
    <img class="producto__target__img" src="${imgUrl}" alt="">
    <p class="producto__target__name">${nombre}</p>
    <p class="producto__target__precio">cop ${precio}</p>
    <div class="producto__target__buttonsAdmin">
        <a class="producto__target__ver" href="../html/producto.html?id=${id}">Ver</a>
        <button data-btnEliminarProducto class="btn__eliminar" id="${id}"></button>
    </div>
    <p class="producto__target__category">${categoria}</p>
  `;
  anhadirLinea.innerHTML = contenido;

  const $eliminarProducto = anhadirLinea.querySelector("[data-btnEliminarProducto]");

  $eliminarProducto.addEventListener('click', () => {
    // Confirmación con SweetAlert2
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, eliminar el producto
        const id = $eliminarProducto.id;
        datosProductos.deleteProductos(id).then(respuesta => {
    if (respuesta.message === 'Producto eliminado exitosamente') {
      Swal.fire('Eliminado', respuesta.message, 'success');
      anhadirLinea.remove();
    } else {
      throw new Error('El backend no confirmó la eliminación.');
    }
  })
  .catch(err => {
    Swal.fire('Error', `No se pudo eliminar el producto: ${err.message}`, 'error');
  });

      }
    });
  });

  return anhadirLinea;
};



let category = [
  "articulos_religiosos",
  "musica",
  "accesorios",
  "libreria",
  
];

const printPosition = (position) => {
  const categoryPosition = document.getElementsByClassName("category__position")[position]
  const btnShow = document.getElementsByClassName("btn__category__show")[position]
  const btnHide = document.getElementsByClassName("btn__category__hide")[position]

  btnShow.addEventListener(("click"), () => {
    categoryPosition.classList.remove("category__height");
    btnHide.classList.remove("btn__ocultar");
    btnShow.classList.add("btn__ocultar");
  })
  btnHide.addEventListener(("click"), () => {
    categoryPosition.classList.add("category__height")
    btnShow.classList.remove("btn__ocultar")
    btnHide.classList.add("btn__ocultar")
  })
}

(() => {
  for (let i = 0; i < category.length; i++){
    if (category[i]) {
      $printProductos.appendChild(printCategory(category[i]))
    }
  }
})()
const categorySubContain = document.getElementsByClassName("category__position")


datosProductos.listaProductos().then((data) => {
  data.forEach(({ categoria, nombre, precio, imgUrl, id }) => {
    const nuevaLinea = printProductos(nombre, precio, imgUrl, id, categoria);
    const mostrar = document.getElementsByClassName("category_items")

    for (let i = 0; i < category.length; i++){
      if (category[i] === categoria) {
        mostrar[i].classList.remove("filtro")
        categorySubContain[i].appendChild(nuevaLinea)
        printPosition(i)
      }
    }
  })
}).catch((error) => Swal.fire({
  title: "<span class='alertTitle'>UPS</span>",
  html: "<span class='alerttext'>Ocurrió un error al conectar con el Servidor</span>",
  icon: "error",
  iconColor: "#fd1f4a",
  background: "#2d2c2e",
  timer: 3000,
  allowOutsideClick: true,
  allowEscapeKey: true,
  allowEnterKey: true,
  stopKeydownPropagation: false,
  showConfirmButton: false,
}));
