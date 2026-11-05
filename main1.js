const btn = document.querySelector('#toggle-button')
const body = document.querySelector('body')

btn.addEventListener('click', function(e) {
    body.classList.toggle('dark-theme')
})

const subBtn = document.querySelector("#subtract-btn")
const addBtn = document.querySelector("#add-btn")
const numberText = document.querySelector("#number")

const questionBox = document.querySelector("#question")
const answerBox = document.querySelector("#answer")

const cardContainers = document.querySelectorAll(".card-Column")
const cards = document.querySelectorAll(".card")

const questionsNAnswers = {
    [1]: {
        Question: "What is",
        Answer: "Yes",
    },
}

const cardsNames = [
    "Coding",
    "Fun",
    "Uhh",
    "Jorking",
    "Bird",
    "RAHHH",
    "Lolz"
]

let count = 0

function updateInnerText(element, text) {
    element.innerText = text
}

subBtn.addEventListener("click", (e) => {
    const subTrack = new Audio('audio/Sub.wav')

    count-=1
    updateInnerText(numberText, count)
    subTrack.volume = 0.2
    subTrack.play()
})

addBtn.addEventListener("click", (e) => {
    const addTrack = new Audio('audio/Add.wav')

    count+=1
    updateInnerText(numberText, count)
    addTrack.volume = 0.2
    addTrack.play()
})

questionBox.addEventListener("click", () => {
    answerBox.style.display = "flex"
    questionBox.style.display = "none"
})

answerBox.addEventListener("mouseout", () => {
    answerBox.style.display = "none"
    questionBox.style.display = "flex"
})

function dragStart(card) {
    card.draggable="true"

    card.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", e.target.id);
    })
}

for (let card of cards) {
    console.log(card)
    
   dragStart(card)
}

for (let cardContainer of cardContainers) {
    cardContainer.addEventListener("dragover", (e) => {
        e.preventDefault();
    })

    cardContainer.addEventListener("drop", (e) => {
        e.preventDefault();
        const draggedId = e.dataTransfer.getData("text/plain");
        const draggedElement = document.getElementById(draggedId);

        cardContainer.querySelector(".card-container").appendChild(draggedElement)
        console.log(draggedElement)
    })
}

console.log(cardsNames)
for (let i in cardsNames) {
    const parent = cardContainers[Math.floor(Math.random() * cardContainers.length)]
    const card = document.createElement("div")

    const name = cardsNames[i]

    card.id = name.toLowerCase()
    card.classList.add("card")
    card.textContent = name

    parent.querySelector(".card-container").appendChild(card)
    dragStart(card)
}