import { fetchResources, getRequests } from "./dataAccess.js"

export const generateServiceFormSectionHTML = () => {
    return `
    <div class="field">
        <label class="label" for="parentName">Parent Name</label>
        <input type="text" name="parentName" class="input" />
    </div>

    <div class="field">
        <label class="label" for="childName">Child Name</label>
        <input type="text" name="childName" class="input" />
    </div>
    
    <div class="field">
    <label class="label" for="numberOfChildren">Number of Children</label>
    <input type="number" name="numberOfChildren" class="input" />
    </div>
    
    <div class="field">
    <label class="label" for="address">Address</label>
    <input type="text" name="address" class="input" />
    </div>
    
    <div class="field">
    <label class="label" for="date">Date Needed</label>
    <input type="date" name="date" class="input" />
    </div>
    
    <div class="field">
    <label class="label" for="lengthOfHour">Length Of Hour</label>
    <input type="number" name="lengthOfHour" class="input" />
    </div>
    
    <button class="button" id="submitRequest">Submit Request</button>
    `
}


// Section 2 HTML
export const mapObjectToListElement = (obj) => {
    return `<li>${obj.id}: ${obj.childName}'s birthday for ${obj.numberOfChildren} kids on ${obj.date}</li>`
}

export const generateRequestsSectionHTML = () => {
    const requests = getRequests()
    return `
        <ul>
            ${requests.map(mapObjectToListElement).join("")
        }
        </ul>
    `
}

// Main Container HTML
export const generateHTML = () => {
    return `
    <h1>Buttons The Clown</h1>

    <section class="serviceForm">
        ${generateServiceFormSectionHTML()}
    </section>

    <section class="serviceRequests">
        <h2>Service Requests</h2>
        ${generateRequestsSectionHTML()}
    </section>
`
}

// Render HTML
const mainContainer = document.querySelector("#container")
export const renderMainContainerHTML =()=>{
    fetchResources('requests').then(
        () => {
            mainContainer.innerHTML = generateHTML()
        }
    )
}