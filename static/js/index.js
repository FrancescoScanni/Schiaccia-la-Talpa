
let button=document.querySelector("#button")
let punti=document.querySelector("#punti")
let mole=document.querySelectorAll(".mole")
let tana=document.querySelectorAll(".den")

let finito
let score
let max
let min
let index=generateRandomIndex()

function generateRandomIndex(){
    return Math.floor(Math.random()*9)   
}
function generateRandomTime(max,min){
    return Math.floor(Math.random()*(max-min)+min)  
}

function show() {
    index = generateRandomIndex();
    let time = generateRandomTime(700, 1700);

    mole[index].addEventListener("click", hit);
    mole[index].classList.add("hit");


    setTimeout(function () {
        mole[index].classList.remove("hit");
        mole[index].removeEventListener("click", hit);

        if (!finito) {
            show();
        } else {
            button.style.visibility = "visible";
        }
    }, time);
}

function hit() {
    mole[index].classList.remove("hit");
    score++;
    punti.innerHTML = score;    
    
    console.log(score);
}



function start(){
    button.style.visibility="hidden"
    finito=false
    score=0
    punti.innerHTML="-"
    show()
    setTimeout(function(){
        for(let i=0;i<mole.length;i++){
            mole[i].removeEventListener("click",hit)   //rimozione eventlistener in modo da non avere una talpa ancora cliccabile quando termina il tempo
        }
        finito=true
        
    },10000)
    
}



//MAIN

button.addEventListener("click",start)
    
