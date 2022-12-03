(()=>{
    

    let mazoCompleto=[];
    let mazo = ['C', 'P', 'D', 'T'];    
    let valor =['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
    let numero = []; 
    let ases=[];
    let jugadores = [];
    const pedir = document.querySelector('#pedirCarta');
    const plantarse = document.querySelector('#plantarse');
    const reiniciar = document.querySelector('#empezar');
    const imgCartasJugador = document.querySelector('#cartasJugador');
    const imgCartasDealer = document.querySelector('#cartasDealer');
    const modificarPuntos = document.querySelectorAll('strong');
    const notificacion = document.querySelectorAll('#notificacion');
   

   const botonesDisabled = ()=>{
    pedir.disabled = true;
    plantarse.disabled = true;
   }
   botonesDisabled();

    const iniciarJuego = (cantJugadores = 2)=>{
        mazoCompleto = barajarCartas();
        for (let i = 0; i < cantJugadores; i++) {
            jugadores.push(0)
            
        }
    }
    const barajarCartas =()=>{
        mazoCompleto =[];
        for (let i = 0; i < mazo.length; i++) {
            baraja = mazo[i];
            for (let j = 0; j < valor.length; j++) {
                numero = valor[j];
                mazoCompleto.push(numero+baraja)
            }
        }
        mazoCompleto =mazoCompleto.sort(function(){return Math.random() - 0.5});
        return mazoCompleto;
    }



    const entregarCartas =()=>{    
        ases.push(mazoCompleto[0]);
        return mazoCompleto.shift();
    };

    const valorCarta =(carta)=>{
        const valor1 = carta.substring(0, carta.length -1);
        return (isNaN(valor1)) ?
            (valor1 === "A") ? 11 : 10
            : valor1 * 1;

    };
    

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
                notificacion[0].innerText = "Haz empatado";
                notificacion[0].classList.remove('dNone')
                notificacion[0].classList.add('dBlock')
            }else if(puntajeJugador> 21){
                notificacion[0].innerText = "Haz perdido";
                notificacion[0].classList.remove('dNone')
                notificacion[0].classList.add('dBlock')
            }else if(puntajeDealer > 21){
                notificacion[0].innerText = "Haz ganado";
                notificacion[0].classList.remove('dNone')
                notificacion[0].classList.add('dBlock')
            }else{
                notificacion[0].innerText = "Haz perdido";
                notificacion[0].classList.remove('dNone')
                notificacion[0].classList.add('dBlock')
            }

        },20);
        

    }
  

    pedir.addEventListener('click', () =>{
        
        plantarse.disabled = false;
        const carta = entregarCartas();
        puntajeJugador = puntajeJugador + valorCarta (carta)
        modificarPuntos[0].innerText = puntajeJugador;
        
        const imgCarta = document.createElement('img');
        imgCarta.src = `./assets/images/${carta}.png`;
        imgCarta.classList.add('cartas')
        imgCartasJugador.append(imgCarta);
        

        if (puntajeJugador > 21) {
            notificacion[0].innerText = "Haz perdido";
            notificacion[0].classList.remove('dNone')
            notificacion[0].classList.add('dBlock')
            pedir.disabled = true;
            plantarse.disabled = true;
                
            
        }else if(puntajeJugador === 21){
            notificacion[0].innerText = "Haz ganado";
            notificacion[0].classList.remove('dNone')
            notificacion[0].classList.add('dBlock')
           
        }
    });
    plantarse.addEventListener('click', () =>{
        pedir.disabled = true;
        plantarse.disabled = true;
        turnoDealer(puntajeJugador);
        
    });
    reiniciar.addEventListener('click', () =>{

        console.clear();
        iniciarJuego();    
        puntajeJugador = 0;
        puntajeDealer = 0;
        modificarPuntos[0].innerText = 0;
        modificarPuntos[1].innerText = 0;
        imgCartasJugador.innerHTML = '';
        imgCartasDealer.innerHTML = '';
        pedir.disabled = false;
        notificacion[0].innerText = "";
        notificacion[0].classList.remove('dBlock')
        notificacion[0].classList.add('dNone')

    });
})();