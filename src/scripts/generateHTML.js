import { getRequests, getClowns } from "./dataAccess.js"

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
    
    <button id="submitButton">Submit Request</button>
    `
}


// Section 2 HTML
export const mapObjectToListElement = (request) => {
    const clowns = getClowns()

    if (request.completed === true) {
        return `
        <li class = 'completedList'>
            <p>
                🤡Completed: ${request.childName}'s birthday on ${request.date}.
            </p>
            <button class="deleteButton" data-id="${request.id}" id="delete--${request.id}">DELETE</button>
        </li>`
    } else {
        return `
        <li>
            <p>
                🤡${request.childName}'s birthday for ${request.numberOfChildren} kids on ${request.date}
            </p>
            <select id='completedBy'>
                <option value='option-0'>Choose</option>
                ${clowns.map(clown => `
                    <option value='${request.id}--${clown.id}'>${clown.name}</option>
                ` )}.join(' ')
            </select>
            <button class="deleteButton" data-id="${request.id}" id="delete--${request.id}">DELETE</button>
        </li>`
    }
}

export const generateRequestsSectionHTML = () => {
    const requests = getRequests()

    return `
        <ul>
        <li class = 'listTitle'>
            <h3>Description</h3>
            <h3>Completed By</h3>
        </li>
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

// Render HTML 在main.js中因为涉及多次fetch
