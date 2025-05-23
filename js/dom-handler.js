// Manejador de elementos del DOM
class DOMHandler {
    constructor() {
        this.imagenAhorcado = document.querySelector(".hangman-box img");
        this.displayPalabra = document.querySelector(".word-display");
        this.textoIntentos = document.querySelector(".guesses-text b");
        this.teclado = document.querySelector(".keyboard");
        this.modalJuego = document.querySelector(".game-modal");
        this.botonJugarDeNuevo = document.querySelector(".play-again");
        this.textoPista = document.querySelector(".hint-text b");
        this.pantallaInicio = document.querySelector(".welcome-screen");
        this.botonComenzar = document.querySelector(".start-game");
    }

    actualizarImagenAhorcado(intentos) {
        this.imagenAhorcado.src = `images/hangman/hangman-${intentos}.svg`;
    }

    actualizarDisplayPalabra(palabra) {
        this.displayPalabra.innerHTML = palabra
            .split("")
            .map(() => `<li class="letter"></li>`)
            .join("");
    }

    actualizarIntentos(intentos, maxIntentos) {
        this.textoIntentos.innerText = `${intentos} / ${maxIntentos}`;
    }

    mostrarModal(victoria, palabra) {
        const textoModal = victoria ? `Encontraste la palabra:` : `La palabra correcta era:`;
        this.modalJuego.querySelector("img").src = `images/hangman/${victoria ? 'victory' : 'lost'}.gif`;
        this.modalJuego.querySelector("h4").innerText = `${victoria ? '¡Felicitaciones!' : '¡Game Over!'}`;
        this.modalJuego.querySelector("p").innerHTML = `${textoModal} <b>${palabra}</b>`;
        this.modalJuego.classList.add("show");
    }

    ocultarModal() {
        this.modalJuego.classList.remove("show");
    }

    mostrarPista(pista) {
        this.textoPista.innerText = pista;
    }

    ocultarPantallaInicio() {
        this.pantallaInicio.classList.add("hide");
    }
}

export default DOMHandler;