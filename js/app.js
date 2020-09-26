
                 //fix players

const selector = (num) =>{
    let first_selector = document.getElementById("first_selector");
    let second_selector = document.getElementById("second_selector");

    if(num == 1){

        first_selector.style.display="none";
        second_selector.style.display="flex";

        document.getElementById('user1').innerHTML = player_1.renderPlayer();
        //contenido first selector actua al click
        document.getElementById('player_picked').style.backgroundColor='red';
        document.getElementById('fijar_player').style.backgroundColor='gray';
    }
 
    if(num == 2){
        second_selector.style.display="none";
        
        //contenido second selector actua al click
        document.getElementById('cpu_picked').style.backgroundColor='blue';
        document.getElementById('fijar_cpu').style.backgroundColor='gray';
        document.getElementById('PC').innerHTML = player_2.renderPlayer();
        
        //si first y second selector están con display none accede
        if(first_selector.style.display === "none" && second_selector.style.display === "none"){
            //aparece el botón para pasar a la fase3
            document.getElementById('fight_start').style.visibility="visible";
        }       
    }
}

                //player selector
let player_1 = {};
let player_2 = {};
let player_picked = document.getElementById('player_picked');
let cpu_picked = document.getElementById('cpu_picked');

const player_selector = (name,num)=>{

    switch(num){
        case 1:
            player_1 = new personajes(name);
            console.log(`${name} player selecionado`);
            player_picked.innerHTML = player_1.renderStats("first","player",1);
            player_picked.style.visibility="visible"; 
            document.getElementById('fijar_player').style.display="block";
            break;

        case 2: 
            player_2 = new personajes(name);
            console.log(`${name} cpu selecionado`);
            cpu_picked.innerHTML = player_2.renderStats("second","cpu",2,"rotate");
            cpu_picked.style.visibility="visible"; 
            document.getElementById('fijar_cpu').style.display="block";
            break;   
    }
}


             //cambiar de pantallas

const cambia_pantalla = (valor) =>{
  
    let array_fases = ["fase_1","fase_2","fase_3"];

    let fasedestino = "fase_" + valor;

    array_fases = array_fases.filter( val => !fasedestino.includes(val)); 
    
    
    document.getElementById(fasedestino).style.display ="flex";

    for(let pantalla of array_fases){
        document.getElementById(pantalla).style.display="none";
    }
}
 
                //class de personajes

class personajes {
    constructor (nombre){
        this.name = nombre;
        this.img_directory = "img/" + nombre + "/posicion_base.gif";
        this.max_health = 100;
        this.health = 100;
        this.power = 60;
    }

    addPower(number) {
        this.power += parseInt(number);
    }
    
    getCurrentHealth() {
        return this.health;
    }

    getHealthPercentage(){
        return (this.health*this.max_health)/100;
    }
    
    renderStats(first,id,num,clase = null){
        return `<div id=${first}_player_stats" class="atributos">
                <h2>PLAYER ${num}</h2>
                <h2>${this.name.toUpperCase()}</h2>
                <p>Health: ${this.health}</p>
                <p>Power: ${this.power}</p>
                <button onclick = "selector(${num})" id="fijar_${id}">PICK</button></div>
                <img class="${clase}" src="${this.img_directory}">`;
    }
    renderPlayer(){
        return `<img src="${this.img_directory}">
                <p>Name: ${this.name.toUpperCase()}</p>
                <p>Health: ${this.health}</p>`;
    }
}
