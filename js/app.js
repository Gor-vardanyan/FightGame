
                     // seltor de personajes

const selector = (num) =>{
    let first_selector = document.getElementById("first_selector");
    let second_selector = document.getElementById("second_selector");

    if(num == 1){

        first_selector.style.display="none";
        second_selector.style.display="flex";

        
        document.getElementById('player_picked').style.backgroundColor='gray';
        document.getElementById('fijar_player').style.backgroundColor='gray';
    }
 
    if(num == 2){
        second_selector.style.display="none";
        document.getElementById('cpu_picked').style.backgroundColor='gray';
        document.getElementById('fijar_cpu').style.backgroundColor='gray';

        if(first_selector.style.display === "none" && second_selector.style.display === "none"){
            document.getElementById('fight_start').style.visibility="visible";
        }       
    }
}

                     // fijación de personaje 

const fix = (num)=>{

    switch(num){
         case 1:
            document.getElementById('fijar_player').style.display="block";
            document.getElementById('player_picked').style.visibility="visible"; 
            
             break;

         case 2: 
             document.getElementById('fijar_cpu').style.display="block";
             document.getElementById('cpu_picked').style.visibility="visible"; 
             break;
     }
}

                     // cambiar de pantallas

const cambia_pantalla = (valor) =>{
  
    let array_fases = ["fase_1","fase_2","fase_3"];

    let fasedestino = "fase_" + valor;

    array_fases = array_fases.filter( val => !fasedestino.includes(val)); 
    
    
    document.getElementById(fasedestino).style.display ="flex";

    for(let pantalla of array_fases){
        document.getElementById(pantalla).style.display="none";
    }
}
 
                         // class de personajes

class personajes {
    constructor (nombre){
        this.img_directory = "img/" + nombre;
        this.max_health = 100;
        this.health = 100;
        this.mana = 50;
        this.power = 50;
        this.magic = 50;
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
    
}
