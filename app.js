//Data
let produits = []

let familleActive = ""

// date du jour

const today = new Date().toLocaleDateString()

document.getElementById("date").innerText = today
document.getElementById("date-pointage").innerText = today



// navigation

function openSelection(){

document.getElementById("screen-home").classList.remove("active")
document.getElementById("screen-selection").classList.add("active")

}



function retourSelection(){

document.getElementById("screen-produits").classList.remove("active")
document.getElementById("screen-familles").classList.add("active")

}



function openMasses(){

document.getElementById("screen-selection").classList.remove("active")
document.getElementById("screen-familles").classList.add("active")

}


// afficher produits

function afficherProduits(){

const container = document.getElementById("liste-produits")

container.innerHTML = ""

// filtrer produits de la famille

const produitsFamille = produits.filter(p => p.famille === familleActive)

produitsFamille.forEach(p=>{

const card = document.createElement("div")

card.className = "tuile-produit"

card.innerHTML = `

<div class="nom">${p.nom}</div>

<div class="compteur">

<button class="moins">-</button>

<div class="count">${p.count}</div>

</div>

`

// clic +1

card.onclick = ()=>{

p.count++

afficherProduits()

majPointage()

}

// bouton -

const boutonMoins = card.querySelector(".moins")

boutonMoins.onclick = (e)=>{

e.stopPropagation()

if(p.count>0){

p.count--

afficherProduits()

majPointage()

}

}

container.appendChild(card)

})

}



// mise à jour pointage

function majPointage(){

let total = 0

const liste = document.getElementById("liste-pointage")

liste.innerHTML = ""

produits.forEach(p=>{

if(p.count > 0){

total += p.count

const ligne = document.createElement("div")

ligne.className = "ligne-ticket"

ligne.innerHTML = `

<span class="ticket-code">${p.code}</span>

<span class="ticket-nom">${p.nom}</span>

<span class="ticket-count">${p.count}</span>

`

liste.appendChild(ligne)

}

})

document.getElementById("total").innerText = total

}


function openFamille(famille){

familleActive = famille

document.getElementById("screen-familles").classList.remove("active")
document.getElementById("screen-produits").classList.add("active")

afficherProduits()

}

function retourMasses(){

document.getElementById("screen-familles").classList.remove("active")
document.getElementById("screen-selection").classList.add("active")

}

// terminer pointage

function terminerPointage(){

const pointage = document.querySelector(".pointage")

html2canvas(pointage).then(canvas => {

const image = canvas.toDataURL("image/png")

document.getElementById("image-resultat").src = image

// afficher écran résultat

document.querySelectorAll(".screen").forEach(s=>{
s.classList.remove("active")
})

document.getElementById("screen-resultat").classList.add("active")

})

}

function retourMenu(){

// reset pointage

produits.forEach(p=>{
p.count = 0
})

majPointage()
afficherProduits()

// retour écran accueil

document.querySelectorAll(".screen").forEach(s=>{
s.classList.remove("active")
})

document.getElementById("screen-home").classList.add("active")

}

function chargerProduits(){

fetch("data/produits.json")
.then(response => response.json())
.then(data => {

produits = data

produits.forEach(p=>{
p.count = 0
})

console.log("Produits chargés :", produits)

})

.catch(error=>{
console.error("Erreur chargement JSON :", error)
})

}

chargerProduits()