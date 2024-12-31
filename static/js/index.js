
let button=document.querySelector("#button")
let punti=document.querySelector("#punti")
let timer=document.querySelector("#cronometro")
let life=document.querySelectorAll(".life .heart")
let stars=document.querySelectorAll(".stars .star")
let mole=document.querySelectorAll(".mole")
let bomb=document.querySelectorAll(".bomb")
let tana=document.querySelectorAll(".den")

let finito //booleana fine/inizio gioco
let score  //punteggio talpe prese
let max   //massimo tempo di durata item
let min   //minimo tempo dI durata item
let index  //indice talpa
let indexB   //indice bomba
let err  //errori click bomba
let right  //punti su talpe


//generazione indici talpe e bombe
function generateRandomIndex(){
    return Math.floor(Math.random()*9)   
}
function generateRandomBombIndex(){
    return Math.floor(Math.random()*9)   //sostiture con 9 per l'index bomba
}

function countdown(){
    while(!finito){
        setTimeout(function(){
            timer.value=timer.value-1000
        },1000)
    }
}

//generazioe tempo durata randomico
function generateRandomTime(max,min){
    return Math.floor(Math.random()*(max-min)+min)  
}
function generateRandomBombTime(max,min){
    return Math.floor(Math.random()*(max-min)+min) 
}


//oggetti che spawnano
function show() {
    index = generateRandomIndex()
    let time = generateRandomTime(700, 2000)
    console.log(time)  //debug
    while(index===indexB){
        index=generateRandomIndex()
    }
    mole[index].addEventListener("click", hit)
    mole[index].classList.add("hit")
    setTimeout(function () {
        mole[index].classList.remove("hit")
        mole[index].removeEventListener("click", hit)
        
        if (!finito) {
            show()
        } else {
            button.style.visibility = "visible"
        }
    }, time);
}
function showBomb(){
    indexB=generateRandomBombIndex()
    let timeB=generateRandomBombTime(2000,3000)
    while(indexB===index){
        indexB=generateRandomBombIndex()
    }
    setTimeout(function(){
        if(!finito){
            bomb[indexB].style.visibility="visible"
            bomb[indexB].addEventListener("click",explode)
            bomb[indexB].style.opacity="1"
            bomb[indexB].classList.add("hit") //bomba
        
            setTimeout(function(){
                bomb[indexB].removeEventListener("click",explode)
                bomb[indexB].classList.remove("hit") //bomba
                bomb[indexB].style.opacity="0"
                
                if (!finito) {
                    showBomb()
                }
                },2000)
        }
    },timeB) 
}


//iterazioni al tocco bomba/talpa
function hit() {
    right=right+1
    stars[right].classList.remove("is-transparent") 

    mole[index].classList.remove("hit")
    score++
    punti.innerHTML = score  
    console.log(score) //debig
}
function explode(){
    err=err+1
    life[err].classList.add("is-empty") 
    bomb[indexB].removeEventListener("click",explode)
    bomb[indexB].classList.remove("hit") //bomba
    bomb[indexB].style.opacity="0"
    //rimozione cuore
    console.log("boom")
      //riduci vita
}


//inizio gioco
function start(){
    countdown()
    err=-1
    right=-1
    for(let i=0;i<life.length;i++){
        life[i].classList.remove("is-empty")   //riduci vita
    }
    for(let i=0;i<stars.length;i++){
        stars[i].classList.add("is-transparent")   //riduci vita
    }
    button.style.visibility="hidden"

    finito=false
    score=0
    punti.innerHTML="-"
    show()
    showBomb()
    setTimeout(function(){
        for(let i=0;i<mole.length;i++){
            mole[i].removeEventListener("click",hit)   //rimozione eventlistener in modo da non avere una talpa ancora cliccabile quando termina il tempo
        }
        finito=true

        
    },10000)
    
}


//-----------------------------------------------MAIN-----------------------------------------------

button.addEventListener("click",start)



    
