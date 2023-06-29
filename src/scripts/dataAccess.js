
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