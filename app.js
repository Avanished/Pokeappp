const imgPoke2 = document.querySelector('#poke2');
const namePoke2 = document.querySelector('#nombrePoke-rival');
const poke2Tipo = document.querySelector('#tipoRival');
const poke2Ataque = document.querySelector('#ataqueRival');

const imgPoke = document.querySelector('#poke');
const namePoke = document.querySelector('#nombrePoke-propio');
const pokeTipo = document.querySelector('#tipoPropio');
const pokeAtaque = document.querySelector('#ataquePropio');

const input = document.querySelector('#input');
const btnElegir = document.querySelector('#btn-poke');
const btnPelear = document.querySelector('#combate');

const getNumRandom = () => {
    let min = Math.ceil(1);
    let max = Math.floor(1001);

    return Math.floor(Math.random() * (max - min) + min);
}

const obtenerPokePropio = () => {
    const num = input.value;

    if (num < 1 || num > 1000) {
        alert('Por favor, ingrese un número entre 1 y 1000.');
        return;
    }

    axios.get(`https://pokeapi.co/api/v2/pokemon/${num}`).then((res) => {
        console.log(res);
        return res.data;
    }).then((res) => {
        console.log(res);
        imgPoke.src = res.sprites.back_default;
        pokeTipo.innerHTML = res.types[0].type.name;
        namePoke.innerHTML = res.name;
        pokeAtaque.innerHTML = res.stats[1].base_stat;
    }).catch((error) => {
        console.error(error);
        alert('No se encontró el Pokémon con ese número.');
    });
}

const obtenerPokeRival = () => {
    const numPokeRival = getNumRandom();

    axios.get(`https://pokeapi.co/api/v2/pokemon/${numPokeRival}`).then((res) => {
        console.log(res);
        return res.data;
    }).then((res) => {
        console.log(res);
        imgPoke2.src = res.sprites.front_default;
        poke2Tipo.innerHTML = res.types[0].type.name;
        namePoke2.innerHTML = res.name;
        poke2Ataque.innerHTML = res.stats[1].base_stat;
    }).catch((error) => {
        console.error(error);
        alert('Error al obtener el Pokémon oponente.');
    });
}

const obtenerNuevoPokeRival = () => {
    const numPokeRival = getNumRandom();

    axios.get(`https://pokeapi.co/api/v2/pokemon/${numPokeRival}`).then((res) => {
        console.log(res);
        return res.data;
    }).then((res) => {
        console.log(res);
        imgPoke2.src = res.sprites.front_default;
        poke2Tipo.innerHTML = res.types[0].type.name;
        namePoke2.innerHTML = res.name;
        poke2Ataque.innerHTML = res.stats[1].base_stat;
    }).catch((error) => {
        console.error(error);
        alert('Error al obtener el Pokémon oponente.');
    });
}

const combate = () => {
    const ataqueRival = parseInt(poke2Ataque.textContent);
    const ataquePropio = parseInt(pokeAtaque.textContent);

    if (ataquePropio > ataqueRival) {
        alert('¡Felicidades! Has ganado el enfrentamiento.');
        animarVictoria('propio');
    } else if (ataquePropio < ataqueRival) {
        alert('Lo siento, has perdido el enfrentamiento.');
        animarDerrota();
    } else {
        alert('Es un empate.');
        animarEmpate();
    }
}

const animarVictoria = (jugador) => {
    const poke2Img = document.querySelector('#poke2');
    poke2Img.classList.add('parpadear');

    setTimeout(() => {
        poke2Img.classList.remove('parpadear');
        poke2Img.classList.add('rotarDerecha');
        setTimeout(() => {
            poke2Img.classList.remove('rotarDerecha');
            if (jugador === 'propio') {
                obtenerNuevoPokeRival();
            } else {
                obtenerPokePropio();
                obtenerPokeRival();
            }
        }, 500); // Retraso de 0.5 segundos (500 milisegundos)
    }, 1000); // Retraso de 1 segundo (1000 milisegundos)
}

const animarDerrota = () => {
    const pokeImg = document.querySelector('#poke');
    pokeImg.classList.add('parpadear');
    setTimeout(() => {
        pokeImg.classList.remove('parpadear');
        pokeImg.classList.add('rotarIzquierda');
        setTimeout(() => {
            pokeImg.classList.remove('rotarIzquierda');
            alert('Elige otro Pokémon para poder seguir combatiendo');
            obtenerPokePropio();
            obtenerPokeRival();
        }, 500); // Retraso de 0.5 segundos (500 milisegundos)
    }, 1000); // Retraso de 1 segundo (1000 milisegundos)
}

const animarEmpate = () => {
    const poke2Img = document.querySelector('#poke2');
    const pokeImg = document.querySelector('#poke');
    poke2Img.classList.add('parpadear');
    pokeImg.classList.add('parpadear');

    setTimeout(() => {
        poke2Img.classList.remove('parpadear');
        pokeImg.classList.remove('parpadear');
        poke2Img.classList.add('rotarDerecha');
        pokeImg.classList.add('rotarIzquierda');
        setTimeout(() => {
            poke2Img.classList.remove('rotarDerecha');
            pokeImg.classList.remove('rotarIzquierda');
            obtenerPokePropio();
            obtenerPokeRival();
        }, 500); // Retraso de 0.5 segundos (500 milisegundos)
    }, 1000); // Retraso de 1 segundo (1000 milisegundos)
}

window.addEventListener('load', obtenerPokeRival);
btnElegir.addEventListener('click', obtenerPokePropio);
btnPelear.addEventListener('click', combate);