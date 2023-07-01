// fetch: POST 
const API = 'http://localhost:8084'
const mainContainer = document.querySelector("#container")

export const postToDatabase = (databaseArrayNameString, dataCollectedFromInput) => {
    const specifiedPostFectchOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataCollectedFromInput)
    }

    return fetch(`${API}/${databaseArrayNameString}`, specifiedPostFectchOptions)
        .then(res => res.json())
        .then(() => { mainContainer.dispatchEvent(new CustomEvent('stateChanged')) })
}

// export const postCompletion = (dataCollectedFromInput) => {
//     const specifiedPostFectchOptions = {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(dataCollectedFromInput)
//     }

//     return fetch(`${API}/completions`, specifiedPostFectchOptions)
//         .then(res => res.json())
//         .then(() => { mainContainer.dispatchEvent(new CustomEvent('stateChanged')) })
// }

// fetch: GET 
// getter functions
const applicationState = {}

export const fetchResources = (resourceArrayNameString) => {
    return fetch(`${API}/${resourceArrayNameString}`)
        .then(res => res.json())
        .then((fetchedArray) => { applicationState[resourceArrayNameString] = fetchedArray })
}

export const getRequests = () => {
    const requests = applicationState.requests.map(obj => ({ ...obj }))
    requests.sort((a, b) => new Date(a.date) - new Date(b.date))

    for (const request of requests) {
        const completions = getCompletions()
        request.completed = completions.some(obj => Number(obj.requestId) === request.id)
    }
    requests.sort((a, b) => a.completed - b.completed)

    return requests

}

export const getClowns = () => applicationState.clowns.map(obj => ({ ...obj }))
export const getCompletions = () => applicationState.completions.map(obj => ({ ...obj }))

// fetch: DELETE

export const deleteRequest = (idNumber) => {
    return fetch(`${API}/requests/${idNumber}`, { method: "DELETE" })
        .then(res => res.json())
        .then(() => { mainContainer.dispatchEvent(new CustomEvent('stateChanged')) })
}