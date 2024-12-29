
let button=document.querySelector("#button")
let mole=document.querySelectorAll(".mole")



function generateRandomIndex(){
    return Math.floor(Math.random()*9)   
}
function generateRandomTime(){
    return (Math.floor(Math.random()*4)+1)*1000   
}

function show(){
    let index=generateRandomIndex()
    mole[index].classList.add("hit")
    setTimeout(function(){
        mole[index].classList.remove("hit")
    },500)
}



button.addEventListener("click",show)
    
