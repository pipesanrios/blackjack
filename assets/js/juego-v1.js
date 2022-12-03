let mazoCompleto=[];
let mazo = ['C', 'P', 'D', 'T'];    
let valor =['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
let cartas = 0;
let numero = 0;
let cartasJugador=[];
let puntajeJugador = 0;
let puntajeDealer = 0;
const pedir = document.querySelector('#pedirCarta');
const pantarse = document.querySelector('#plantarse');
const reiniciar = document.querySelector('#empezar');
const imgCartasJugador = document.querySelector('#cartasJugador');
const imgCartasDealer = document.querySelector('#cartasDealer');
const modificarPuntos = document.querySelectorAll('strong');


const barajarCartas =()=>{
    for (let i = 0; i < mazo.length; i++) {
        baraja = mazo[i];
        for (let j = 0; j < valor.length; j++) {
            numero = valor[j];
            mazoCompleto.push(numero+baraja)
        }
    }
    mazoCompleto =mazoCompleto.sort(function(){return Math.random() - 0.5});
}
barajarCartas();
console.log(mazoCompleto);


const entregarCartas =()=>{
    
    let carta = mazoCompleto.shift();
        
    //console.log(mazoCompleto);
    //console.log(carta);
    return carta;
}

const valorCarta =(cartas)=>{
    const valor1 = cartas.substring(0, cartas.length -1);
    return (isNaN(valor1)) ?
        (valor1 === "A") ? 11 : 10
        : valor1 * 1;

}

const turnoDealer =(valorDealer)=>{
    do {
        const carta = entregarCartas();
        puntajeDealer = puntajeDealer + valorCarta (carta)
        modificarPuntos[1].innerText = puntajeDealer;
        
        const imgCarta = document.createElement('img');
        imgCarta.src = `./assets/images/${carta}.png`;
        imgCarta.classList.add('cartas')
        imgCartasDealer.append(imgCarta);

        if( valorDealer > 21){
            break;
        }
    } while ((puntajeDealer < valorDealer) && (valorDealer <= 21));
    
    setTimeout(()=>{
        if(puntajeJugador === puntajeDealer){
            console.log("Haz empatado");
        }else if(puntajeJugador> 21){
            console.log("Haz perdido");
        }else if(puntajeDealer > 21){
            console.log("Haz Ganado");
        }else{
            console.log("Haz perdido");
        }

    },20);
    

}
//const valor1 = valorCarta(entregarCartas());

pedir.addEventListener('click', () =>{
    const carta = entregarCartas();
    puntajeJugador = puntajeJugador + valorCarta (carta)
    modificarPuntos[0].innerText = puntajeJugador;
    
    const imgCarta = document.createElement('img');
    imgCarta.src = `./assets/images/${carta}.png`;
    imgCarta.classList.add('cartas')
    imgCartasJugador.append(imgCarta);
    

    if (puntajeJugador > 21) {
        console.warn("Haz perdido");
        pedir.disabled = true;
        plantarse.disabled = true;
        //turnoDealer(puntajeJugador);         
        
    }else if(puntajeJugador === 21){
        console.warn("21! Haz ganado!");
        //turnoDealer(puntajeJugador);
    }
});
plantarse.addEventListener('click', () =>{
    pedir.disabled = true;
    plantarse.disabled = true;
    turnoDealer(puntajeJugador);

    /* if ((puntajeJugador > puntajeDealer) && (puntajeDealer > 21)) {
        console.log("Haz ganado");
    }else if (puntajeJugador === puntajeDealer){
        console.log("Haz empatado");
    }else{
        console.log("haz perdido");
    }
 */
});
reiniciar.addEventListener('click', () =>{

    mazoCompleto=[];    
    cartas = 0;
    numero = 0;
    cartasJugador=[];
    puntajeJugador = 0;
    puntajeDealer = 0;
    modificarPuntos[0].innerText = 0;
    modificarPuntos[1].innerText = 0;
    imgCartasJugador.innerHTML = '';
    imgCartasDealer.innerHTML = '';
    pedir.disabled = false;
    plantarse.disabled = false;

});