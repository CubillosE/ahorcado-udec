import CONFIG from './config.js';
import palabras from './word-list.js';
import DOMHandler from './dom-handler.js';

class JuegoAhorcado {
    constructor() {
        this.dom = new DOMHandler();
        this.palabraActual = '';
        this.letrasCorrectas = [];
        this.contadorIntentosFallidos = 0;
        this.cargarImagenAleatoria();
        this.inicializarEventos();
    }

    cargarImagenAleatoria() {
        // Número total de imágenes disponibles
        const totalImagenes = 3;
        const numeroAleatorio = Math.floor(Math.random() * totalImagenes) + 1;
        const imagenBienvenida = document.querySelector(".welcome-screen .content img");
        imagenBienvenida.src = `images/cheer${numeroAleatorio}.svg`;
    }

    inicializarEventos() {
        // Evento para comenzar el juego
        this.dom.botonComenzar.addEventListener("click", () => {
            this.dom.ocultarPantallaInicio();
            this.obtenerPalabraAleatoria();
        });

        // Crear teclado virtual
        for (let i = CONFIG.RANGO_LETRAS.INICIO; i <= CONFIG.RANGO_LETRAS.FIN; i++) {
            const boton = document.createElement("button");
            boton.innerText = String.fromCharCode(i);
            this.dom.teclado.appendChild(boton);
            boton.addEventListener("click", (e) => this.manejarIntento(e.target, String.fromCharCode(i)));
        }

        this.dom.botonJugarDeNuevo.addEventListener("click", () => this.obtenerPalabraAleatoria());
        this.obtenerPalabraAleatoria();
    }

    reiniciarJuego() {
        this.letrasCorrectas = [];
        this.contadorIntentosFallidos = 0;
        this.dom.actualizarImagenAhorcado(this.contadorIntentosFallidos);
        this.dom.actualizarIntentos(this.contadorIntentosFallidos, CONFIG.MAX_INTENTOS);
        this.dom.teclado.querySelectorAll("button").forEach(btn => btn.disabled = false);
        this.dom.actualizarDisplayPalabra(this.palabraActual);
        this.dom.ocultarModal();
    }

    obtenerPalabraAleatoria() {
        const { word, hint } = palabras[Math.floor(Math.random() * palabras.length)];
        this.palabraActual = word;
        this.dom.mostrarPista(hint);
        this.reiniciarJuego();
    }

    finalizarJuego(victoria) {
        setTimeout(() => {
            this.dom.mostrarModal(victoria, this.palabraActual);
        }, CONFIG.DELAY_MODAL);
    }

    manejarIntento(boton, letraSeleccionada) {
        if (this.palabraActual.includes(letraSeleccionada)) {
            [...this.palabraActual].forEach((letra, indice) => {
                if (letra === letraSeleccionada) {
                    this.letrasCorrectas.push(letra);
                    const elementos = this.dom.displayPalabra.querySelectorAll("li");
                    elementos[indice].innerText = letra;
                    elementos[indice].classList.add("guessed");
                }
            });
        } else {
            this.contadorIntentosFallidos++;
            this.dom.actualizarImagenAhorcado(this.contadorIntentosFallidos);
        }

        boton.disabled = true;
        this.dom.actualizarIntentos(this.contadorIntentosFallidos, CONFIG.MAX_INTENTOS);

        if (this.contadorIntentosFallidos === CONFIG.MAX_INTENTOS) {
            this.finalizarJuego(false);
        } else if (this.letrasCorrectas.length === this.palabraActual.length) {
            this.finalizarJuego(true);
        }
    }
}

// Iniciar el juego
new JuegoAhorcado();