const imgPoke = document.querySelector('#poke');
const namePoke = document.querySelector('#nombrePoke-propio');
const pokeStats = document.querySelector('#tipoPropio');

const imgPoke2 = document.querySelector('#poke2');
const namePoke2 = document.querySelector('#nombrePoke-rival');
const poke2Stats = document.querySelector('#tipoRival');

const btn = document.querySelector('#btn-eleccion');
const input = document.querySelector('#numPoke');

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
        pokeStats.innerHTML = res.types[0].type.name;
        namePoke.innerHTML = res.name;
    })

});

window.addEventListener('load',()=>{

    const numPokeRival = getNumRandom();

    axios.get(`https://pokeapi.co/api/v2/pokemon/${numPokeRival}`).then((res)=>{

        return res.data
    }).then((res)=>{
        console.log(res);
        imgPoke2.src = res.sprites.front_default;
        poke2Stats.innerHTML = res.types[0].type.name;
        namePoke2.innerHTML = res.name;
    })
})

