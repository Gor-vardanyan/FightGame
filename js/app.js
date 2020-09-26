
                 //fix players

const selector = (num) =>{
    let first_selector = document.getElementById("first_selector");
    let second_selector = document.getElementById("second_selector");

    if(num == 1){

        first_selector.style.display="none";
        second_selector.style.display="flex";

        document.getElementById('user1').innerHTML = player_1.renderPlayer();
        //contenido first selector actua al click
        document.getElementById('player_picked').style.backgroundColor='gray';
        document.getElementById('fijar_player').style.backgroundColor='gray';
    }
 
    if(num == 2){
        second_selector.style.display="none";
        
        //contenido second selector actua al click
        document.getElementById('cpu_picked').style.backgroundColor='gray';
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

const player_selector = (name,num)=>{

    switch(num){
        case 1:
            player_1 = new personajes(name,1);
            console.log(`${name} player selecionado`);
            document.getElementById('fijar_player').style.display="block";
            document.getElementById('player_picked').style.visibility="visible"; 
            document.getElementById('first_player_stats').innerHTML = player_1.renderStats();
            break;

        case 2: 
            player_2 = new personajes(name,2);
            console.log(`${name} cpu selecionado`);
            document.getElementById('fijar_cpu').style.display="block";
            document.getElementById('cpu_picked').style.visibility="visible"; 
            document.getElementById('second_player_stats').innerHTML = player_2.renderStats();
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
    constructor (nombre,rotate){
        this.name = nombre;
        this.img_directory = "img/" + nombre + "/posicion_base"+ rotate +".gif";
        this.img_directoryRotate = "img/" + nombre + "/posicion_base2.gif";
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
    
    renderStats(){
        return `<h2>${this.name.toUpperCase()}</h2>
                <p>Health: ${this.health}</p>
                <p>Power: ${this.power}</p>`;
    }
    renderPlayer(){
        return `<img src="${this.img_directory}">
                <p>Name: ${this.name}</p>
                <p>Health: ${this.health}</p>`;
    }
}
