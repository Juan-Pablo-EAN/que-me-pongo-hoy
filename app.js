const exitoAdd = document.querySelector(".textoExitoAdd");
const spiner = document.querySelector(".spiner");

let IDBRequest = indexedDB.open("ropaDB", 1);

IDBRequest.addEventListener("upgradeneeded", () => {
    let db = IDBRequest.result;
    db.createObjectStore("ropa", {
        autoIncrement: true
    });
    console.log("Base de datos creada exitosamente");
});

IDBRequest.addEventListener("success", () => {
    console.log("Todo salio bien");
});

IDBRequest.addEventListener("error", () => {
    console.warn("Error en la base de datos");
});


const obtenerObjeto = modo => {
    let db = IDBRequest.result;
    let IDBTransaction = db.transaction("ropa", modo);
    let objectStore = IDBTransaction.objectStore("ropa");
    return [objectStore, IDBTransaction];
}

const addObjeto = objeto => {
    let db = obtenerObjeto("readwrite");
    db[0].add(objeto);
    db[1].addEventListener("complete", () => {
        console.log("Objeto añadido exitosamente");
    });
    setTimeout(() => {
        spiner.style.display = "none";
        exitoAdd.style.display = "block";
    }, 500);
}

const editObjeto = (objeto, key) => {
    let db = obtenerObjeto("readwrite");
    db[0].put(objeto, key);
    db[1].addEventListener("complete", () => {
        console.log("Objeto modificado exitosamente");
    });
}

const eliminarObjeto = key => {
    let db = obtenerObjeto("readwrite");
    db[0].delete(key);
    db[1].addEventListener("complete", () => {
        console.log("Objeto eliminado exitosamente");
    });
}

const leerObjetos = () => {
    let db = obtenerObjeto("readonly");
    let cursor = db[0].openCursor();
    cursor.addEventListener("success", () => {
        if (cursor.result) {
            console.log(cursor.result.value);
            cursor.result.continue();
        } else {
            console.log("Objetos leídos exitosamente");
        }
    });
}

const lis = document.querySelectorAll(".lis");
const barras = document.querySelector(".barras");
const verPrendas = document.querySelector(".verPrendas");
const opcionesPrendas = document.getElementById("prendas");
const cerrarPrendas = document.querySelector(".closeVerPrendas");
const addPrenda = document.querySelector(".addPrenda");
const seccionAñadir = document.querySelector(".añadir");
const fondoModal = document.querySelector(".fondoModal");
const equisModal = document.querySelector(".cerrarModal");

const navBarResponsive = () => {
    let visible = false;
    barras.addEventListener("click", () => {
        if (visible) {
            lis.forEach(elemento => {
                elemento.style.display = "none";
            });
            visible = false;
        } else {
            lis.forEach(elemento => {
                elemento.style.display = "block";
            });
            visible = true;
        }
    });
}

const abrirSeccionPrendas = () => {
    verPrendas.style.display = "block";
}

const cerrarSeccionPrendas = () => {
    verPrendas.style.display = "none";
}

const eventoComboBox = () => {
    opcionesPrendas.addEventListener("change", () => {
        abrirSeccionPrendas();
    });
}

const eventoCerrarPrendas = () => {
    cerrarPrendas.addEventListener("click", () => {
        cerrarSeccionPrendas();
    });
}

const abrirSeccionAdd = () => {
    seccionAñadir.style.display = "flex";
}

const cerrarSeccionAdd = () => {
    seccionAñadir.style.display = "none";
    exitoAdd.style.display = "none";
}

const eventoAddPrenda = () => {
    let open = false;
    addPrenda.addEventListener("click", () => {
        if (open) {
            cerrarSeccionAdd();
            open = false;
        } else {
            abrirSeccionAdd();
            open = true;
        }

    });
}

const abrirModal = () => {
    fondoModal.style.display = "flex";
}

const cerrarModal = () => {
    fondoModal.style.display = "none";
}

const eventoCerrarModal = () => {
    equisModal.addEventListener("click", () => {
        cerrarModal();
    });
}

const crearCuadrosPrendas = () => {
    let divCuadro = document.createElement("DIV");
    let divCheck = document.createElement("DIV");
    let inputCheck = document.createElement("INPUT");
    let imagen = document.createElement("IMG");
    let divTexto = document.createElement("DIV");

    divCuadro.classList.add("cuadro");
    divCheck.classList.add("check");
    inputCheck.setAttribute("type", "checkbox");
    inputCheck.classList.add("checkCuadro");
    imagen.setAttribute("src", ``);
    imagen.setAttribute("alt", `imagen de una prenda`);
    divTexto.classList.add("texto");

    divCheck.appendChild(inputCheck);
    divCuadro.appendChild(divCheck);
    divCuadro.appendChild(imagen);
    divCuadro.appendChild(divTexto);

    divCuadro.addEventListener("click", () => {
        abrirModal();
    });
}

const btnAñadir = document.querySelector(".btn2");
const categoria1 = document.querySelector(".category");
const ocasion1 = document.querySelector(".ocasionInput");
const color1 = document.querySelector(".colorInput");
const imagen1 = document.querySelector(".imagenInput");

const añadirPrenda = () => {
    btnAñadir.addEventListener("click", () => {
        exitoAdd.style.display = "none";
        if (ocasion1.value.length > 0 && color1.value.length > 0 && imagen1.files.length > 0) {
            let urlImg;

            let reader = new FileReader();

            reader.readAsDataURL(imagen1.files[0]);
            reader.addEventListener("load", e => {
                urlImg = e.currentTarget.result;
                console.log(typeof e.currentTarget.result);

                let prenda = {
                    categoria: `${categoria1.value}`,
                    ocasion: `${ocasion1.value},`,
                    color: `${color1.value}`,
                    imagen: `${urlImg}`
                }

                spiner.style.display = "flex";
                addObjeto(prenda);

                ocasion1.value = "";
                color1.value = "";
            });
        } else {
            alert("Completa todos los espacios antes de continuar");
        }


    });
}


window.addEventListener("load", () => {
    navBarResponsive();
    eventoComboBox();
    eventoCerrarPrendas();
    eventoAddPrenda();
    añadirPrenda();
});