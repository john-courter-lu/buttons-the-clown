import { renderMainContainerHTML } from "./generateHTML.js"
import { postRequest } from "./dataAccess.js"

//第一步: render HTML
renderMainContainerHTML()

//第二步: 用户输入完成并click submit button时,保证api收到数据
const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitRequest") {

        const userInput = {
            parentName: document.querySelector("input[name='parentName']").value,
            childName: document.querySelector("input[name='childName']").value,
            numberOfChildren: document.querySelector("input[name='numberOfChildren']").value,
            address: document.querySelector("input[name='address']").value,
            date: document.querySelector("input[name='date']").value,
            lengthOfHour: document.querySelector("input[name='lengthOfHour']").value
        }

        postRequest(userInput)
    }
})

//第三步: stateChanged, re-render HTML
mainContainer.addEventListener('stateChanged',() => {
    console.log('State Changed. Re-rendering HTML.')
    renderMainContainerHTML()
})