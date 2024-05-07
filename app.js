const imgPoke = document.querySelector('#poke');
const namePoke = document.querySelector('#nombrePoke-propio');
const pokeTipo = document.querySelector('#tipoPropio');
const pokeAtaque = document.querySelector('#ataquePropio');

const imgPoke2 = document.querySelector('#poke2');
const namePoke2 = document.querySelector('#nombrePoke-rival');
const poke2Tipo = document.querySelector('#tipoRival');
const poke2Ataque = document.querySelector('#ataqueRival');

const btn = document.querySelector('#btn-eleccion');
const input = document.querySelector('#numPoke');
const btnCombate = document.querySelector('#combate');

const getNumRandom = () => {
    let min = Math.ceil(0);
    let max = Math.floor(1001);

    return Math.floor(Math.random() * (max - min) + min);
  }

btn.addEventListener('click',()=>{

    let value = input.value;

    axios.get(`https://pokeapi.co/api/v2/pokemon/${value}`).then((res)=>{
        console.log(res);

        return res.data
    }).then((res)=>{

        console.log(res.sprites.back_default);
        imgPoke.src = res.sprites.back_default;
        pokeTipo.innerHTML = res.types[0].type.name;
        namePoke.innerHTML = res.name;
        pokeAtaque.innerHTML = res.stats[0].base_stat;
    })

});

window.addEventListener('load',()=>{

    const numPokeRival = getNumRandom();

    axios.get(`https://pokeapi.co/api/v2/pokemon/${numPokeRival}`).then((res)=>{

        return res.data
    }).then((res)=>{
        console.log(res);
        imgPoke2.src = res.sprites.front_default;
        poke2Tipo.innerHTML = res.types[0].type.name;
        namePoke2.innerHTML = res.name;
        poke2Ataque.innerHTML = res.stats[0].base_stat;
    })
})

btnCombate.addEventListener('click',()=>{

    const ataquePokePropio = parseInt(pokeAtaque.textContent);
    const nombrePokePropio = namePoke.textContent;

    const ataquePokeRival = parseInt(poke2Ataque.textContent);
    const nombrePokeRival = namePoke2.textContent;
    

    if(ataquePokePropio > ataquePokeRival){

        alert(`El ganador es ${nombrePokePropio}`);

    }else if(ataquePokeRival > ataquePokePropio){

        alert(`El ganador es ${nombrePokeRival}`);

    }else{

        alert(`Fue un empate`);

    }
})

