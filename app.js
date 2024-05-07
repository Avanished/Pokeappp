const poke = document.querySelector('#poke');
const pokeStats = document.querySelector('#tipoRival');

let poke2 = document.querySelector('#poke2');
const poke2Stats = document.querySelector('#tipoPropio');

const btn = document.querySelector('#btn-eleccion');

const input = document.querySelector('#numPoke')

btn.addEventListener('click',()=>{

    let value = input.value;

    axios.get(`https://pokeapi.co/api/v2/pokemon/${value}`).then((res)=>{
        console.log(res);

        return res.data
    }).then((res)=>{

        console.log(res.sprites.back_default);
        poke.src = res.sprites.back_default;
        pokeStats.innerHTML = res.types[0].type.name;
    })

});

window.addEventListener('load',()=>{
    axios.get('https://pokeapi.co/api/v2/pokemon/4/').then((res)=>{

        return res.data
    }).then((res)=>{
        console.log(res);
        poke2.src = res.sprites.front_default;
        poke2Stats.innerHTML = res.types[0].type.name;
    })
})

