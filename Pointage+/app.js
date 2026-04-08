// Data
let produits = []
let familleActive = ""
let lastScreen = ""

// date du jour
const today = new Date().toLocaleDateString()

document.getElementById("date").innerText = today
document.getElementById("date-pointage").innerText = today


// navigation

function openSelection(){
document.getElementById("screen-home").classList.remove("active")
document.getElementById("screen-selection").classList.add("active")
}

function openMasses(){
lastScreen = "familles"
document.getElementById("screen-selection").classList.remove("active")
document.getElementById("screen-familles").classList.add("active")
}


// MASSES

function afficherProduits(){

const container = document.getElementById("liste-produits")
container.innerHTML = ""

const produitsFamille = produits.filter(p => p.famille === familleActive && p.type === "masses")

produitsFamille.forEach(p=>{

const card = document.createElement("div")
card.className = "tuile-produit"

card.innerHTML = `
<div class="nom">${p.nom}</div>
<div class="code">${p.code}</div>

<div class="compteur">
<button class="moins">-</button>
<div class="count">${p.count}</div>
</div>
`

card.onclick = ()=>{
p.count++
afficherProduits()
majPointage()
}

const boutonMoins = card.querySelector(".moins")

boutonMoins.onclick = (e)=>{
e.stopPropagation()
if(p.count > 0){
p.count--
afficherProduits()
majPointage()
}
}

container.appendChild(card)

})

}


// POINTAGE

function majPointage(){

let total = 0
const liste = document.getElementById("liste-pointage")

liste.innerHTML = ""

produits.forEach(p=>{

if(p.count > 0){

let valeurAffichee = p.count

if(p.isTKT && p.tktList){
valeurAffichee = p.tktList.length
}else if(p.isCustom && p.customList){
valeurAffichee = p.customList.length
}

total += valeurAffichee

const ligne = document.createElement("div")
ligne.className = "ligne-ticket"

ligne.innerHTML = `
<span class="ticket-code">${p.code}</span>
<span class="ticket-nom">
${p.nom}
${p.isTKT && p.tktList ? "<br>" + p.tktList.join(", ") : ""}
${p.isCustom && p.customList ? "<br>" + p.customList.join("<br>") : ""}
</span>
<span class="ticket-count">${valeurAffichee}</span>
`

liste.appendChild(ligne)

}

})

document.getElementById("total").innerText = total

}


// FAMILLES

function openFamille(famille){

familleActive = famille
lastScreen = "familles"

document.getElementById("type-actif").innerText = famille.toUpperCase()

document.getElementById("screen-familles").classList.remove("active")
document.getElementById("screen-produits").classList.add("active")

afficherProduits()

}


// TYPES

function afficherType(type){

const container = document.getElementById("liste-produits")
container.innerHTML = ""

const produitsType = produits.filter(p => p.type === type)

produitsType.forEach(p=>{

const card = document.createElement("div")
card.className = "tuile-produit"

let valeurAffichee = p.count

if(p.isTKT && p.tktList){
valeurAffichee = p.tktList.length
}else if(p.isCustom && p.customList){
valeurAffichee = p.customList.length
}

card.innerHTML = `
<div class="nom">${p.nom}</div>
<div class="code">${p.code}</div>

<div class="compteur">
<button class="moins">-</button>
<div class="count">${valeurAffichee}</div>
</div>
`

card.onclick = ()=>{

// BOX CUSTOM
if(p.isCustom){

let valeur = prompt("Qu'est-ce qui a été reçu ?")

if(valeur){

valeur = valeur.trim()

if(!p.customList){
p.customList = []
}

if(!p.customList.includes(valeur)){
p.customList.push(valeur)
}

p.count = p.customList.length

}

// TKT
}else if(p.isTKT){

let numero = prompt("Numéro du TKT ?")

if(numero){

numero = numero.trim()

if(!p.tktList){
p.tktList = []
}

if(!p.tktList.includes(numero)){
p.tktList.push(numero)
}

p.count = p.tktList.length

}

// NORMAL
}else{
p.count++
}

afficherType(type)
majPointage()
}

const boutonMoins = card.querySelector(".moins")

boutonMoins.onclick = (e)=>{
e.stopPropagation()

if(p.isCustom && p.customList){
p.customList.pop()
p.count = p.customList.length
}else if(p.isTKT && p.tktList){
p.tktList.pop()
p.count = p.tktList.length
}else if(p.count > 0){
p.count--
}

afficherType(type)
majPointage()
}

container.appendChild(card)

})

}


// OUVERTURE TYPES

function openFrais(){
lastScreen = "selection"
document.getElementById("type-actif").innerText = "FRAIS"
document.getElementById("screen-selection").classList.remove("active")
document.getElementById("screen-produits").classList.add("active")
afficherType("frais")
}

function openDetails(){
lastScreen = "selection"
document.getElementById("type-actif").innerText = "DETAIL"
document.getElementById("screen-selection").classList.remove("active")
document.getElementById("screen-produits").classList.add("active")
afficherType("detail")
}

function openFL(){
lastScreen = "selection"
document.getElementById("type-actif").innerText = "FL / FLEURS"
document.getElementById("screen-selection").classList.remove("active")
document.getElementById("screen-produits").classList.add("active")
afficherType("fl")
}

function openAction(){
lastScreen = "selection"
document.getElementById("type-actif").innerText = "ACTION"
document.getElementById("screen-selection").classList.remove("active")
document.getElementById("screen-produits").classList.add("active")
afficherType("action")
}

function openVV(){
lastScreen = "selection"
document.getElementById("type-actif").innerText = "VV"
document.getElementById("screen-selection").classList.remove("active")
document.getElementById("screen-produits").classList.add("active")
afficherType("vv")
}

function openDepotes(){
lastScreen = "selection"
document.getElementById("type-actif").innerText = "DEPOTES"
document.getElementById("screen-selection").classList.remove("active")
document.getElementById("screen-produits").classList.add("active")
afficherType("depotes")
}


// RETOUR

function retour(){

if(document.getElementById("screen-produits").classList.contains("active")){

document.getElementById("screen-produits").classList.remove("active")

if(lastScreen === "familles"){
document.getElementById("screen-familles").classList.add("active")
}else{
document.getElementById("screen-selection").classList.add("active")
}

}else if(document.getElementById("screen-familles").classList.contains("active")){

document.getElementById("screen-familles").classList.remove("active")
document.getElementById("screen-selection").classList.add("active")

}

}


// EXPORT

function terminerPointage(){

let utilisateur = prompt("Qui fait le pointage ? (Nom ou initiales)")

if(!utilisateur || utilisateur.trim() === ""){
alert("Nom obligatoire pour valider le pointage")
return
}

utilisateur = utilisateur.trim()

const exportZone = document.getElementById("export-zone")

let contenu = `
<div style="padding:20px; width:320px; font-family:sans-serif; background:white;">
<h2 style="text-align:center;">Pointage+</h2>
<div style="text-align:center; margin-bottom:5px;">${today}</div>

<div style="text-align:center; font-size:14px; margin-bottom:10px;">
Pointé par : <strong>${utilisateur}</strong>
</div>
`

let total = 0

const typesOrdre = ["masses", "frais", "detail", "vv", "fl", "action", "depotes"]

typesOrdre.forEach(type => {

const produitsType = produits.filter(p => 
p.type === type && (
p.count > 0 ||
(p.isTKT && p.tktList && p.tktList.length > 0) ||
(p.isCustom && p.customList && p.customList.length > 0)
)
)

if(produitsType.length > 0){

let totalType = 0

produitsType.forEach(p=>{

if(p.isTKT && p.tktList){
totalType += p.tktList.length
}else if(p.isCustom && p.customList){
totalType += p.customList.length
}else{
totalType += p.count || 0
}

})

contenu += `
<div style="margin-top:12px;font-weight:bold;border-top:2px solid black;padding-top:6px;font-size:16px;">
${type.toUpperCase()} (${totalType})
</div>
`

produitsType.forEach(p => {

let valeur = p.count

if(p.isTKT && p.tktList){
valeur = p.tktList.length
}else if(p.isCustom && p.customList){
valeur = p.customList.length
}

total += valeur

contenu += `
<div style="display:grid;grid-template-columns:80px 1fr 40px;margin-bottom:5px;border-bottom:1px dashed #ccc;padding-bottom:3px;font-size:14px;align-items:center;">
<span>${p.code}</span>
<span style="padding:0 8px;">
${p.nom}
${p.isTKT && p.tktList ? "<br>" + p.tktList.join(", ") : ""}
${p.isCustom && p.customList ? "<br>" + p.customList.join("<br>") : ""}
</span>
<span style="text-align:right;">${valeur}</span>
</div>
`

})

}

})

contenu += `
<div style="margin-top:10px; font-weight:bold; text-align:right;">
TOTAL : ${total}
</div>
</div>
`

exportZone.innerHTML = contenu

html2canvas(exportZone).then(canvas => {

const image = canvas.toDataURL("image/png")

document.getElementById("image-resultat").src = image

document.querySelectorAll(".screen").forEach(s=>{
s.classList.remove("active")
})

document.getElementById("screen-resultat").classList.add("active")

})

}


// RESET

function retourMenu(){

produits.forEach(p=>{
p.count = 0
p.tktList = []
p.customList = []
})

majPointage()
afficherProduits()

document.querySelectorAll(".screen").forEach(s=>{
s.classList.remove("active")
})

document.getElementById("screen-home").classList.add("active")

}


// LOAD JSON

function chargerProduits(){

fetch("data/produits.json")
.then(response => response.json())
.then(data => {

produits = data

produits.forEach(p=>{
p.count = 0
})

})
.catch(error=>{
console.error(error)
})

}

chargerProduits()