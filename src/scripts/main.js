import { generateHTML } from "./generateHTML.js"
import { fetchResources, postToDatabase, deleteRequest } from "./dataAccess.js"

//第一步: render HTML
const mainContainer = document.querySelector("#container")
export const renderMainContainerHTML = () => {
    fetchResources('requests')
        .then(() => fetchResources('clowns'))
        .then(() => fetchResources('completions'))
        .then(
            () => {
                mainContainer.innerHTML = generateHTML()
            }
        )
}

renderMainContainerHTML()

//第二步: 用户输入完成并click submit button时,保证api收到数据

mainContainer.addEventListener("click", event => {
    if (event.target.id === "submitButton") {

        const userInput = {
            parentName: document.querySelector("input[name='parentName']").value,
            childName: document.querySelector("input[name='childName']").value,
            numberOfChildren: document.querySelector("input[name='numberOfChildren']").value,
            address: document.querySelector("input[name='address']").value,
            date: document.querySelector("input[name='date']").value,
            lengthOfHour: document.querySelector("input[name='lengthOfHour']").value
        }

        postToDatabase('requests', userInput)
    }
})

//第三步: stateChanged, re-render HTML

mainContainer.addEventListener('stateChanged', () => {
    console.log('State Changed. Re-rendering HTML.')
    renderMainContainerHTML()
})

//第四步: 工作人员点击delete button时, request消失

/*方法一*/

mainContainer.addEventListener('click', event => {
    if (event.target.id.startsWith('delete')) {
        const [, requestId] = event.target.id.split('--')

        deleteRequest(Number(requestId))
    }
}
)

/*方法二*/
// mainContainer.addEventListener('click', event => {
//     if (event.target.class === 'deleteButton'){

//     deleteRequest(Number(event.target.dataset.id))
// }})

//第五步: 工作人员change select时,选择新建一个obj,并post到json的completions

mainContainer.addEventListener('change', event => {
    if (event.target.id === "completedBy") {
        const completionObjToDatabase = {
            requestId: event.target.value.split('--')[0],
            clownId: event.target.value.split('--')[1],
            dateCompleted: Date.now()
        }

        postToDatabase('completions', completionObjToDatabase)
    }
}
)