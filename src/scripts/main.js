import { generateHTML } from "./generateHTML.js"


const mainContainer = document.querySelector("#container")
const renderMainContainerHTML =()=>{
    mainContainer.innerHTML = generateHTML()
}

renderMainContainerHTML()