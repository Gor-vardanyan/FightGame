
/*
let pantalla1 = document.getElementById("fase_1");
let pantalla2 = document.getElementById("fase_2");
let pantalla3 = document.getElementById("fase_3");
*/
/* Creamos variable const con funcion cambia pantalla y le ponemos que recoja un valor*/
const cambia_pantalla = (valor) =>{
  
    /* Creamos array de strings con los id de elementos en html*/
    let array_fases = ["fase_1","fase_2","fase_3"];

    /* Creamos variable que concatena el valor que recibe la funcion cambia pantalla y la junta al string para targetear al id de html*/
    let fasedestino = "fase_" + valor;

    // El array_fases recibe a el mismo con el filtro de una funcion que recoje un parametro val 
    // El val que le damos existe en el array entonces el resulta en true, pero queremos que sea diferencia de true ósea que le asignamos contrario de resultado true
    // Al decirle que este val sea false lo extirpa del nuevo arrayfondos.filter dejándolo con el resto de contenido del nuevo array y lo asignamos a reescribir arrayfondos.
    array_fases = array_fases.filter( val => !fasedestino.includes(val));

    if(fasedestino == "fase_3"){
        let sleccionado_off = document.querySelector('[name=personaje_seleccionado]:checked');
        
        if(sleccionado_off === null){
            return false;
        }   
    }

    document.getElementById(fasedestino).style.display ="flex";

    for(let pantalla of array_fases){
        document.getElementById(pantalla).style.display="none";
    }
}
 


class personaje {
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
