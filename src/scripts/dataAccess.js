
const API = 'http://localhost:8084'
const mainContainer = document.querySelector("#container")

export const postRequest = (dataCollectedFromInput) => {
    const specifiedPostFectchOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataCollectedFromInput)
    }

    return fetch(`${API}/requests`, specifiedPostFectchOptions)
        .then(res => res.json())
        .then(() => { mainContainer.dispatchEvent(new CustomEvent('stateChanged')) })
}

const applicationState = {}

export const fetchResources = (resourceArrayNameString) => {
    return fetch(`${API}/${resourceArrayNameString}`).then(res => res.json())
        .then((fetchedArray) => { applicationState[resourceArrayNameString] = fetchedArray })
}


export const getRequests = () => applicationState.requests.map(obj => ({ ...obj }))
export const getClowns = () => applicationState.clowns.map(obj => ({ ...obj }))
export const getCompletions = () => applicationState.completions.map(obj => ({ ...obj }))