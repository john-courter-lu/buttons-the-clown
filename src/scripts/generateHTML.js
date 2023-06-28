

export const ServiceForm = () => {
    let html = `
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
    <label class="label" for="serviceDate">Date Needed</label>
    <input type="date" name="serviceDate" class="input" />
    </div>
    
    <div class="field">
    <label class="label" for="lengthOfHour">Length Of Hour</label>
    <input type="number" name="lengthOfHour" class="input" />
    </div>
    
    <button class="button" id="submitRequest">Submit Request</button>
    `

    return html
}

export const generateHTML = () => {
    return `
    <h1>Buttons The Clown</h1>

    <section class="serviceForm">
        ${ServiceForm()}
    </section>

    <section class="serviceRequests">
        <h2>Service Requests</h2>
      
    </section>
`
}