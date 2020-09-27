
                 //fix players

const selector = (num) =>{
    let first_selector = document.getElementById("first_selector");
    let second_selector = document.getElementById("second_selector");

    if(num == 1){

        first_selector.style.display="none";
        second_selector.style.display="flex";
 
        document.getElementById('stadium').insertAdjacentHTML('beforeend',player_1.renderPlayer("user1"));
        //contenido first selector actua al click
        document.getElementById('player_picked').style.backgroundColor='red';
        document.getElementById('fijar_player').style.backgroundColor='gray';
    }
 
    if(num == 2){
        second_selector.style.display="none";
        
        //contenido second selector actua al click
        document.getElementById('cpu_picked').style.backgroundColor='blue';
        document.getElementById('fijar_cpu').style.backgroundColor='gray';
        document.getElementById('stadium').insertAdjacentHTML('beforeend',player_2.renderPlayer("PC"));
        
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
        this.power = 10;
        this.position_x = 0;
        this.boundries = {
            min: 0,
            max: 75
        }
        this.position_y = 0;
        this.punch = "img/" + nombre + "/punch_posicion_base.gif";
    }

    addPower(number) {
        this.power += parseInt(number);
    }
    
    getCurrentHealth(){
        return this.health;
    }

    getHealthPercentage(){
        return (this.health*this.max_health)/100;
    }

    getPositionPercentage(){
       return (this.position_x*100)/this.boundries.max;
    }

    get_dmg(num){
        this.health -= num;
        if((this.health*this.max_health)/100 === 0){
            playON()
        }
    }

    move_right(){
        if(this.position_x < this.boundries.max){
            this.position_x += 5;
        }
    }

    move_left(){
        if(this.position_x > this.boundries.min){
            this.position_x -= 5;
        }
    }

    move_up(){

    }
    move_bottom(){

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
    renderPlayer(target){
        if(target === "PC"){
            var direction = "right";
        }
        else{
            var direction = "left";
        }
        return `<div style="${direction}:${this.position_x}vw" id="${target}">
                <img class="charactersize" src="${this.img_directory}">
                </div>`;
    }
    renderPlayerPunch(target){
        if(target === "PC"){
            var direction = "right";
        }
        else{
            var direction = "left";
        }
        return `<div style="${direction}:${this.position_x}vw" id="${target}">
                <img class="charactersize" src="${this.punch}">
                </div>`;
    }

    renderLife(player){
        document.getElementById(`${player}_life`).style.width = `${this.getHealthPercentage()}%`;
    }
}

const checkRange = (pos_player, pos_cpu) =>{
    var calc = ((pos_player + pos_cpu) - 100);
    return ( calc > -15 && calc < 0)
}


let gameOn = document.addEventListener('keypress',(e)=>{
    switch (e.key){
    case 'd':
        player_1.move_right();
        document.getElementById("user1").remove();
        document.getElementById('stadium').insertAdjacentHTML('beforeend',player_1.renderPlayer("user1"));
        break;

    case 'f':
        document.getElementById("user1").remove();
        document.getElementById('stadium').insertAdjacentHTML('beforeend',player_1.renderPlayerPunch("user1"));
        let timeout_1 = setTimeout(() => {
            if(checkRange(player_1.getPositionPercentage(),player_2.getPositionPercentage())){
                player_2.get_dmg(10);
                player_2.renderLife("PC");
            }
            document.getElementById("user1").remove();
            document.getElementById('stadium').insertAdjacentHTML('beforeend',player_1.renderPlayer("user1"));
        }, 500);
        break;

    case 'h':
        
        document.getElementById("PC").remove();
        document.getElementById('stadium').insertAdjacentHTML('beforeend',player_2.renderPlayerPunch("PC"));
        let timeout_2 = setTimeout(() => {
            if(checkRange(player_1.getPositionPercentage(),player_2.getPositionPercentage())){
                player_1.get_dmg(10);
                player_1.renderLife("user1");
            }
            document.getElementById("PC").remove();
            document.getElementById('stadium').insertAdjacentHTML('beforeend',player_2.renderPlayer("PC"));
        }, 500);
        break;
    
    case 'a':
        document.getElementById("user1").remove();
        player_1.move_left();
        document.getElementById('stadium').insertAdjacentHTML('beforeend',player_1.renderPlayer("user1"));
        break;
    
    case 'l':
        player_2.move_left();
        document.getElementById("PC").remove();
        document.getElementById('stadium').insertAdjacentHTML('beforeend',player_2.renderPlayer("PC"));
        break;
    
    case 'j':
        player_2.move_right();
        document.getElementById("PC").remove();
        document.getElementById('stadium').insertAdjacentHTML('beforeend',player_2.renderPlayer("PC"));
        break;
    }

})


let playON = ()=>{
    if(player_1.health > 0){
      winner = "player 1";
    }else{
      winner = "player 2";
    }
    document.getElementById('stadium').innerHTML =`<div class="gameOff"> Player ${winner} won!!! </div>`;
}