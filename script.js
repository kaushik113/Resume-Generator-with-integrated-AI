// Initialize arrays to store data for internships, projects, skills, positions of responsibility (PORs), and achievements
let internships = [];
let projects = [];
let projectsHtml = [];
let skills = [];
let PORs = [];
let achievements = [];

// Hide the PhD section and its related UI elements by default
document.getElementById("phdDiv").classList.add("hidden");
document.getElementById("phdDivR").classList.add("hidden");
const phdCheckbox = document.getElementById("phdCheckbox");

// Toggle visibility of the PhD section based on checkbox state
phdCheckbox.addEventListener("change", () => {
    if (phdCheckbox.checked) {
        // Show PhD input fields and reset their values
        document.getElementById("phdDiv").classList.remove("hidden");
        document.getElementById("institutephdF").value = "";
        document.getElementById("specializationphdF").value = "";
        document.getElementById("marksphdF").value = "";
        document.getElementById("yearphdF").value = "";
        document.getElementById("phdDivR").classList.remove("hidden");
    } else {
        // Hide PhD input fields and clear their values
        document.getElementById("phdDiv").classList.add("hidden");
        document.getElementById("institutephdF").value = "";
        document.getElementById("specializationphdF").value = "";
        document.getElementById("marksphdF").value = "";
        document.getElementById("yearphdF").value = "";
        document.getElementById("phdDivR").classList.add("hidden");
    }
})

// Hide the MTech section and its related UI elements by default
document.getElementById("mtechDiv").classList.add("hidden");
document.getElementById("mtechDivR").classList.add("hidden");
const mtechCheckbox = document.getElementById("mtechCheckbox");

// Toggle visibility of the MTech section based on checkbox state
mtechCheckbox.addEventListener("change", () => {
    if (mtechCheckbox.checked) {
        // Show MTech input fields and reset their values
        document.getElementById("mtechDiv").classList.remove("hidden");
        document.getElementById("institutemtechF").value = "";
        document.getElementById("specializationmtechF").value = "";
        document.getElementById("marksmtechF").value = "";
        document.getElementById("yearmtechF").value = "";
        document.getElementById("mtechDivR").classList.remove("hidden");
    } else {
        // Hide MTech input fields and clear their values
        document.getElementById("mtechDiv").classList.add("hidden");
        document.getElementById("institutemtechF").value = "";
        document.getElementById("specializationmtechF").value = "";
        document.getElementById("marksmtechF").value = "";
        document.getElementById("yearmtechF").value = "";
        document.getElementById("mtechDivR").classList.add("hidden");
    }
})

// Set up the internship section to be hidden initially
document.getElementById("userEnteredInternshipsLatex").innerHTML = "";
const internCheckBox = document.getElementById("internshipCheckBox");
document.getElementById("internshipDetailR").classList.add("hidden");

// Toggle visibility of internship-related fields and UI elements
internCheckBox.addEventListener("change", function () {
    // Show internship fields and add default content to the Latex template
    if (internCheckBox.checked) {
        document.getElementById("internshipDetailL1").classList.remove("hidden");
        document.getElementById("internshipDetailL2").classList.remove("hidden");
        document.getElementById("internaddbutton").classList.remove("hidden");
        document.getElementById("internenhancebutton").classList.remove("hidden");
        document.getElementById("internshipDetailR").classList.remove("hidden");
        document.getElementById("internshipDetailRC").classList.remove("hidden");
        document.getElementById("userEnteredInternshipsLatex").innerHTML = `
        \\resheading{\\textbf{ INTERNSHIPS} }
        \\vspace{-0.4cm}
        \\begin{itemize}\\itemsep\\isep
        <span id="userEnteredInternships">DELETE THIS</span>
        \\end{itemize}`;
        document.getElementById("internsEdit").innerHTML = "";
        document.getElementById("internEditComment").classList.add("hidden");
    } else {
        // Hide internship fields and clear the Latex template
        internships = [];
        updateInternshipList();
        document.getElementById("internshipDetailL1").classList.add("hidden");
        document.getElementById("internshipDetailL2").classList.add("hidden");
        document.getElementById("internshipDetailR").classList.add("hidden");
        document.getElementById("internshipDetailRC").classList.add("hidden");
        document.getElementById("userEnteredInternshipsLatex").innerHTML = "";
    }
});

// Function to add a new internship entry
function addNewIntern() {
    // Retrieve input values from the form
    let title = document.getElementById("internTitleF").value;
    let info = document.getElementById("internInfoF").value;
    let link = document.getElementById("internLinkF").value;
    let description = document.getElementById("interndescriptionF").value;
    let description2 = document.getElementById("interndescription2F").value;
    let year = document.getElementById("yearinternF").value;
    let id = `${title}-${Date.now()}`;

    // Add the new internship to the array
    internships.push({
        id: `${title}-${Date.now()}`,
        title: title,
        info: info,
        link: link,
        description: description,
        description2: description2,
        year: year
    });

    // Refresh the internship display and reset input fields
    updateInternshipList();
    document.getElementById("internTitleF").value = "";
    document.getElementById("internInfoF").value = "";
    document.getElementById("internLinkF").value = "";
    document.getElementById("interndescriptionF").value = "";
    document.getElementById("interndescription2F").value = "";
    document.getElementById("yearinternF").value = "";

    // Append the new internship to the editable list
    const internsEdit = document.getElementById("internsEdit");
    internsEdit.innerHTML += `
    <div class="border bg-white p-2 rounded" style="height: auto;">
        <div class="row align-items-center">
            <div class="col-md-8">
                <h5 class="mb-0">Internship Title-Year: <strong id="${id}name">${title} ${year}</strong></h5>
            </div>
            <div class="col-md-4 text-right" id="${id}">
                <button class="btn btn-dark btn-sm" onclick="editInternsList(this)">Edit</button>
                <button class="btn btn-dark btn-sm" onclick="deleteInternsList(this)">Delete</button>
            </div>
        </div>
    </div>`;
    document.getElementById("internEditComment").classList.remove("hidden");
}

// Function to delete an internship entry
function deleteInternsList(buttonElI) {
    const internDeleteId = internships.find(intern => intern.id == buttonElI.parentElement.id);
    const internDeleteIndex = internships.findIndex(intern => intern.id == buttonElI.parentElement.id);

    if (confirm(`Are you sure, you want to delete ${internDeleteId.title} internship`)) {
        internships.splice(internDeleteIndex, 1);
        buttonElI.parentElement.parentElement.parentElement.remove();
        if (internships.length === 0) {
            document.getElementById("internEditComment").classList.add("hidden");
        }
        updateInternshipList();
    }
}

// Function to edit an existing internship entry
function editInternsList(buttonElI) {
    document.getElementById("internupdatebutton").classList.remove("hidden");
    document.getElementById("internaddbutton").classList.add("hidden");
    const internEditId = internships.find(intern => intern.id == buttonElI.parentElement.id);

    // Populate form fields with existing data
    document.getElementById("internTitleF").value = internEditId.title;
    document.getElementById("internInfoF").value = internEditId.info;
    document.getElementById("internLinkF").value = internEditId.link;
    document.getElementById("interndescriptionF").value = internEditId.description;
    document.getElementById("interndescription2F").value = internEditId.description2;
    document.getElementById("yearinternF").value = internEditId.year;

    // Set the update button's action
    document.getElementById("internupdatebutton").onclick = function () {
        confirmEditinternList(internEditId);
    }
}

// Function to confirm and apply edits to an internship entry
function confirmEditinternList(intern) {
    // Update the properties of the internship object from form inputs
    intern.title = document.getElementById("internTitleF").value;
    intern.info = document.getElementById("internInfoF").value;
    intern.link = document.getElementById("internLinkF").value;
    intern.description = document.getElementById("interndescriptionF").value;
    intern.description2 = document.getElementById("interndescription2F").value;
    intern.year = document.getElementById("yearinternF").value;

    // Clear the form fields after updating the internship
    document.getElementById("internTitleF").value = "";
    document.getElementById("internInfoF").value = "";
    document.getElementById("internLinkF").value = "";
    document.getElementById("interndescriptionF").value = "";
    document.getElementById("interndescription2F").value = "";
    document.getElementById("yearinternF").value = "";

    // Refresh the displayed list of internships
    updateInternshipList();

    // Update UI to toggle visibility of add and update buttons
    document.getElementById("internupdatebutton").classList.add("hidden");
    document.getElementById("internaddbutton").classList.remove("hidden");

    // Update the displayed name of the edited internship
    document.getElementById(`${intern.id}name`).innerText = `${internships.find(intr => intr.id === intern.id).title}-${internships.find(intr => intr.id === intern.id).year}`;
}

// Function to refresh and display the updated list of internships
function updateInternshipList() {
    // Get references to list and display elements
    let internList = document.getElementById("internlistT");
    let internsSpan = document.getElementById("userEnteredInternships");

    // Clear existing content in the list and span
    internList.innerHTML = "";
    internsSpan.innerHTML = "";

    // Iterate over the internships array and generate HTML for each entry
    for (let internship of internships) {
        // Create main container for the internship details
        let newListItem = document.createElement("div");

        // Create sub-container for title and year
        let firstnewListItem = document.createElement("div");
        firstnewListItem.classList.add("d-flex", "justify-content-between", "align-items-center");

        // Create title and year elements
        let titleElement = document.createElement("p");
        titleElement.classList.add("fw-bold", "my-0", "w-75");
        titleElement.textContent = internship.title;
        let yearElement = document.createElement("p");
        yearElement.classList.add("text-sm-end", "fw-bold", "my-0", "w-25", "me-2");
        yearElement.textContent = internship.year;

        // Append title and year to the sub-container
        firstnewListItem.appendChild(titleElement);
        firstnewListItem.appendChild(yearElement);

        // Create another sub-container for additional info and project link
        let secondnewListItem = document.createElement("div");
        secondnewListItem.classList.add("d-flex", "justify-content-between", "align-items-center");

        // Create info and link elements
        let infoElement = document.createElement("p");
        infoElement.classList.add("text-sm", "fst-italic", "my-0", "w-75");
        infoElement.textContent = internship.info;
        let linkElement = document.createElement("a");
        linkElement.classList.add("text-sm-end", "text-decoration-none", "fst-italic", "my-0", "w-25", "me-2");
        linkElement.textContent = "Project Link";
        linkElement.href = internship.link;
        linkElement.target = "_blank";

        // Append info and link to the sub-container
        secondnewListItem.appendChild(infoElement);
        secondnewListItem.appendChild(linkElement);

        // Append both sub-containers to the main container
        newListItem.appendChild(firstnewListItem);
        newListItem.appendChild(secondnewListItem);

        // Add Description
        let descriptionElement = document.createElement("p");
        descriptionElement.classList.add("text-sm", "p-0", "my-0", "justify-content");
        descriptionElement.textContent = internship.description;
        newListItem.appendChild(descriptionElement);

        let descriptionElement2 = document.createElement("p");
        descriptionElement2.classList.add("text-sm", "p-0", "my-0", "justify-content");
        descriptionElement2.textContent = internship.description2;
        newListItem.appendChild(descriptionElement2);

        // Add the completed internship details to the list
        internList.appendChild(newListItem);

        // Append details to the LaTeX-compatible span element
        internsSpan.innerHTML += "\\item \\textbf{" + escapeLaTeX(internship.title) + "} \\hfill [" + escapeLaTeX(internship.year) + "]\\\\\\emph{(" + internship.info + ") | \n\\href{" + internship.link + "}{Project Link}} \\\\[-0.7cm]\n" +
            "\\begin{itemize}\\itemsep  \\isep\n" +
            "   \\item " + escapeLaTeX(internship.description) + "\n" +
            "   \\item " + escapeLaTeX(internship.description2) +
            "\n   \\end{itemize}" +
            "";
    }
}

// Helper function to escape special characters for LaTeX formatting
function escapeLaTeX(text) {
    return text.replace(/([&%$#{}_])/g, "\\$1");
}

// To show the "Add Project" button when needed
document.getElementById("projectaddbutton").classList.remove("hidden");

/**
 * Function to add a new project to the list
 * 1. Retrieves input values from the form
 * 2. Creates a project object and adds it to the `projects` array
 * 3. Updates the project display list
 * 4. Clears the form fields for new input
 */
function addNewProject() {
    // Get values from the form
    let title = document.getElementById("projectTitleF").value;
    let info = document.getElementById("projectInfoF").value;
    let link = document.getElementById("projectLinkF").value;
    let description = document.getElementById("projectdescriptionF").value;
    let description2 = document.getElementById("projectdescription2F").value;
    let year = document.getElementById("yearprojectF").value;
    let id = `${title}-${Date.now()}` // Unique identifier for the project

    // Create and add the new project to the array
    projects.push({
        id,
        title,
        info,
        link,
        description,
        description2,
        year,
    });

    // Update the display list with the new project
    updateProjectList();

    // Clear the input fields for new entries
    document.getElementById("projectTitleF").value = "";
    document.getElementById("projectInfoF").value = "";
    document.getElementById("projectLinkF").value = "";
    document.getElementById("projectdescriptionF").value = "";
    document.getElementById("projectdescription2F").value = "";
    document.getElementById("yearprojectF").value = "";

    // Append the new project to the editable section
    const projectsEdit = document.getElementById("projectsEdit");

    projectsEdit.innerHTML += `
        <div class="border bg-white p-2 rounded" style="height: auto;">
            <div class="row align-items-center">
                <div class="col-md-8">
                    <h5 class="mb-0">Project Title-Year: <strong id="${id}name">${title}-${year}</strong></h5>
                </div>
                <div class="col-md-4 text-right" id="${id}">
                    <button class="btn btn-dark btn-sm" onclick="editProjectsList(this)">Edit</button>
                    <button class="btn btn-dark btn-sm" onclick="deleteProjectsList(this)">Delete</button>
                </div>
            </div>
        </div>
    `;
    // Show edit comment if applicable
    document.getElementById("projectEditComment").classList.remove("hidden");
}

/**
 * Function to delete a project
 * 1. Finds the project in the array using its ID
 * 2. Confirms deletion with the user
 * 3. Removes the project from the array and updates the display
 */
function deleteProjectsList(buttonElP) {
    const projectDeleteId = projects.find(project => project.id == buttonElP.parentElement.id);
    const projectDeleteIndex = projects.findIndex(project => project.id == buttonElP.parentElement.id);

    if (confirm(`Are you sure, you want to delete ${projectDeleteId.title} project`)) {
        projects.splice(projectDeleteIndex, 1); // Remove project from array
        buttonElP.parentElement.parentElement.parentElement.remove(); // Remove from DOM
        if (projects.length === 0) {
            document.getElementById("projectEditComment").classList.add("hidden");
        }
        updateProjectList(); // Refresh project display
    }
}

/**
 * Function to edit an existing project
 * 1. Retrieves the project details from the array
 * 2. Pre-fills the form with existing details
 * 3. Displays the update button and hides the add button
 */
function editProjectsList(buttonElP) {
    document.getElementById("projectupdatebutton").classList.remove("hidden");
    document.getElementById("projectaddbutton").classList.add("hidden");

    const projectEditId = projects.find(project => project.id == buttonElP.parentElement.id);

    // Populate form fields with project data
    document.getElementById("projectTitleF").value = projectEditId.title;
    document.getElementById("projectInfoF").value = projectEditId.info;
    document.getElementById("projectLinkF").value = projectEditId.link;
    document.getElementById("projectdescriptionF").value = projectEditId.description;
    document.getElementById("projectdescription2F").value = projectEditId.description2;
    document.getElementById("yearprojectF").value = projectEditId.year;

    // Attach the confirmation function to the update button
    document.getElementById("projectupdatebutton").onclick = function () {
        confirmEditProjectList(projectEditId);
    };
}

// function to change edits in right side
function confirmEditProjectList(project){
    project.title = document.getElementById("projectTitleF").value;
    project.info = document.getElementById("projectInfoF").value;
    project.link = document.getElementById("projectLinkF").value;
    project.description = document.getElementById("projectdescriptionF").value;
    project.description2 = document.getElementById("projectdescription2F").value;
    project.year = document.getElementById("yearprojectF").value;

    updateProjectList();

    document.getElementById(`${project.id}name`).innerText = `${projects.find(pro => pro.id === project.id).title}-${projects.find(pro => pro.id === project.id).year}`;

    document.getElementById("projectTitleF").value = "";
    document.getElementById("projectInfoF").value = "";
    document.getElementById("projectLinkF").value = "";
    document.getElementById("projectdescriptionF").value = "";
    document.getElementById("projectdescription2F").value = "";
    document.getElementById("yearprojectF").value = "";

    document.getElementById("projectupdatebutton").classList.add("hidden");
    document.getElementById("projectaddbutton").classList.remove("hidden");
}

/**
 * Function to update the displayed list of projects
 * Loops through the `projects` array and updates the DOM
 */
function updateProjectList() {
    // Get the List element
    let projectList = document.getElementById("projectlist");

    // Get the Span element to display Internship details
    let projectsSpan = document.getElementById("userEnteredProjects");

    // Clear existing List and Content in the "interns" span
    projectList.innerHTML = "";
    projectsSpan.innerHTML = "";

    // Loop through each internship in the array
    for (let project of projects) {
        // Create elements to display project details
        let newListItem = document.createElement("div");

        let firstnewListItem = document.createElement("div");
        firstnewListItem.classList.add("d-flex", "justify-content-between", "align-items-center");

        let secondnewListItem = document.createElement("div");
        secondnewListItem.classList.add("d-flex", "justify-content-between", "align-items-center");

        // Create and configure elements for the project title and year
        let titleElement = document.createElement("p");
        titleElement.classList.add("fw-bold", "my-0", "w-75");
        titleElement.textContent = project.title; // Assign project title
        firstnewListItem.appendChild(titleElement);

        let yearElement = document.createElement("p");
        yearElement.classList.add("text-sm-end", "fw-bold", "my-0", "w-25", "me-2");
        yearElement.textContent = project.year; // Assign project year
        firstnewListItem.appendChild(yearElement);

        newListItem.appendChild(firstnewListItem);

        // Create and configure elements for additional project info and link
        let infoElement = document.createElement("p");
        infoElement.classList.add("text-sm", "fst-italic", "my-0", "w-75");
        infoElement.textContent = project.info; // Assign project info
        secondnewListItem.appendChild(infoElement);

        let linkElement = document.createElement("a");
        linkElement.classList.add("text-sm-end", "text-decoration-none", "fst-italic", "my-0", "w-25", "me-2");
        linkElement.textContent = "Project Link"; // Assign text for the link
        linkElement.href = project.link; // Assign project link
        linkElement.target = "_blank";
        secondnewListItem.appendChild(linkElement);

        newListItem.appendChild(secondnewListItem);

        // Create and configure elements for detailed descriptions
        let descriptionElement = document.createElement("p");
        descriptionElement.classList.add("text-sm", "p-0", "my-0", "justify-content");
        descriptionElement.textContent = project.description; // Assign primary description
        newListItem.appendChild(descriptionElement);

        let descriptionElement2 = document.createElement("p");
        descriptionElement2.classList.add("text-sm", "p-0", "my-0", "justify-content");
        descriptionElement2.textContent = project.description2; // Assign secondary description
        newListItem.appendChild(descriptionElement2);

        // Add the new project details to the project list container
        projectList.appendChild(newListItem);

        // Append a formatted LaTeX version of the project details
        projectsSpan.innerHTML += "\\item \\textbf{" + escapeLaTeX(project.title) + "} \\hfill [" + escapeLaTeX(project.year) + "]\\\\\\emph{(" + project.info + ") | \n\\href{" + project.link + "}{Project Link}} \\\\[-0.7cm]\n" +
            "\\begin{itemize}\\itemsep  \\isep\n" +
            "   \\item " + escapeLaTeX(project.description) + "\n" +
            "   \\item " + escapeLaTeX(project.description2) +
            "\n   \\end{itemize}" +
            "";
    }
}

// Initialize an empty array to store skills

// Function to add a new skill
function addNewSkill() {
    // Get skill type and description from form inputs
    let type = document.getElementById("skilltypeF").value;
    let description = document.getElementById("skilldescriptionF").value;
    let id = `${type}-${Date.now()}`;

    // Add the new skill to the skills array
    skills.push({
        id: id,
        type: type,
        description: description
    });

    // Refresh the skills display list
    updateSkillList();

    // Clear form inputs
    document.getElementById("skilltypeF").value = "";
    document.getElementById("skilldescriptionF").value = "";

    // Add the skill to the editable list in the interface
    const skillsEdit = document.getElementById("skillsEdit");
    skillsEdit.innerHTML += `
            <div class="border bg-white p-2 rounded" style="height: auto;">
              <div class="row align-items-center">
                <div class="col-md-8">
                    <h5 class="mb-0">Skill type: <strong id="${id}name">${type}</strong></h5>
                </div>
                <div class="col-md-4 text-right" id="${id}">
                    <button class="btn btn-dark btn-sm"  onclick="editskillsList(this)">Edit</button>
                    <button class="btn btn-dark btn-sm"  onclick="deleteskillsList(this)">Delete</button>
                    </div>
            </div>
        </div> `;
    document.getElementById("skillEditComment").classList.remove("hidden");
}

// Function to delete a skill
function deleteskillsList(buttonElS) {
    // Locate the skill to be deleted
    const skillDeleteId = skills.find(skill => skill.id == buttonElS.parentElement.id);
    const skillDeleteIndex = skills.findIndex(skill => skill.id == buttonElS.parentElement.id);

    if (confirm(`Are you sure, you want to delete ${skillDeleteId.type} skill`)) {
        // Remove the skill from the array and DOM
        skills.splice(skillDeleteIndex, 1);
        buttonElS.parentElement.parentElement.parentElement.remove();

        // Hide edit comment if no skills remain
        if (skills.length === 0) {
            document.getElementById("skillEditComment").classList.add("hidden");
        }
        updateSkillList();
    }
}

// Function to edit a skill
function editskillsList(buttonElS) {
    document.getElementById("skillUpdateButton").classList.remove("hidden");
    document.getElementById("skillAddButton").classList.add("hidden");

    // Retrieve skill details for editing
    const skillEditId = skills.find(skill => skill.id === buttonElS.parentElement.id);
    document.getElementById("skilltypeF").value = skillEditId.type;
    document.getElementById("skilldescriptionF").value = skillEditId.description;

    // Assign functionality to confirm button
    document.getElementById("skillUpdateButton").onclick = function () {
        confirmEditSkillList(skillEditId)
    };
}

// Function to confirm and save edits to a skill
function confirmEditSkillList(skill) {
    skill.type = document.getElementById("skilltypeF").value;
    skill.description = document.getElementById("skilldescriptionF").value;

    // Update display list with new details
    updateSkillList();

    // Update inline skill name in the DOM
    document.getElementById(`${skill.id}name`).innerText = document.getElementById("skilltypeF").value;

    // Reset form inputs
    document.getElementById("skilltypeF").value = "";
    document.getElementById("skilldescriptionF").value = "";
    document.getElementById("skillUpdateButton").classList.add("hidden");
    document.getElementById("skillAddButton").classList.remove("hidden");
}

// Function to update the skill list display
function updateSkillList() {
    // Get the list element
    let skillList = document.getElementById("skillList");
    let skillsSpan = document.getElementById("userEnteredSkills");

    // Clear existing content
    skillList.innerHTML = "";
    skillsSpan.innerHTML = "";

    // Loop through each Skill in the Array
    for (let skill of skills) {
        // Create a new list item element
        let newListItem = document.createElement("li");

        // Create and configure elements for skill type and description
        let skillTypeElement = document.createElement("p");
        skillTypeElement.classList.add("fw-bold", "my-0", "p-0");
        skillTypeElement.textContent = skill.type;
        newListItem.appendChild(skillTypeElement);

        let skillDescriptionElement = document.createElement("p");
        skillDescriptionElement.classList.add("text-sm", "p-0", "my-0", "justify-content");
        skillDescriptionElement.textContent = skill.description;
        newListItem.appendChild(skillDescriptionElement);

        // Add list item to the skill list container
        skillList.appendChild(newListItem);

        // Append LaTeX version to the 'skills' span
        skillsSpan.innerHTML += "\\item \\textbf{" + escapeLaTeX(skill.type) + ":} " + escapeLaTeX(skill.description) + "\n";  // FIXED: Added escapeLaTeX for safety
    }
}

// Initialize an empty array to store PORs

// Function to add a new Position of Responsibility (POR)
function addNewPOR() {
    // Extract values entered by the user in the form fields
    let PORName = document.getElementById("PORNameF").value;
    let PORDescription = document.getElementById("PORdescriptionF").value;
    let PORDescription2 = document.getElementById("PORdescription2F").value;
    let PORDuration = document.getElementById("PORdurationF").value;
    let id = `${PORName}-${Date.now()}` // Unique ID for each POR using the name and timestamp

    // Add a new POR object to the array
    PORs.push({
        id: id,
        name: PORName,
        description: PORDescription,
        description2: PORDescription2,
        duration: PORDuration
    });

    // Refresh the displayed list of PORs
    updatePORList();

    // Clear the form fields after submission
    document.getElementById("PORNameF").value = "";
    document.getElementById("PORdescriptionF").value = "";
    document.getElementById("PORdescription2F").value = "";
    document.getElementById("PORdurationF").value = "";

    // Add the new POR to the editable list section
    const PORsEdit = document.getElementById("PORsEdit");
    PORsEdit.innerHTML += `
            <div class="border bg-white p-2 rounded" style="height: auto;">
              <div class="row align-items-center">
                <div class="col-md-8">
                  <h5 class="mb-0">POR name-duration: <strong id="${id}name">${PORName}-${PORDuration}</strong></h5>
                </div>
                <div class="col-md-4 text-right" id="${id}">
                    <button class="btn btn-dark btn-sm"  onclick="editPORsList(this)">Edit</button>
                    <button class="btn btn-dark btn-sm"  onclick="deletePORsList(this)">Delete</button>
                    </div>
            </div>
        </div>`;

    // Make the edit comment visible
    document.getElementById("POREditComment").classList.remove("hidden");
}

// Function to delete a POR
function deletePORsList(buttonElPOR) {
    // Identify the POR to be deleted using its ID
    const PORDeleteId = PORs.find(por => por.id == buttonElPOR.parentElement.id);
    const PORDeleteIndex = PORs.findIndex(por => por.id == buttonElPOR.parentElement.id);

    // Confirm deletion before proceeding
    if (confirm(`Are you sure, you want to delete ${PORDeleteId.name} POR`)) {  // FIXED: Changed 'type' to 'name' (typo in original)
        // Remove the POR from the array and update the display
        PORs.splice(PORDeleteIndex, 1);
        buttonElPOR.parentElement.parentElement.parentElement.remove();

        // Hide the edit comment if no PORs remain
        if (PORs.length === 0) {
            document.getElementById("POREditComment").classList.add("hidden");
        }

        // Refresh the displayed list of PORs
        updatePORList();
    }
}

// Function to enable editing of a POR
function editPORsList(buttonElPOR) {
    // Show the update button and hide the add button
    document.getElementById("PORUpdateButton").classList.remove("hidden");
    document.getElementById("PORAddButton").classList.add("hidden");

    // Retrieve the POR object being edited
    const POREditId = PORs.find(POR => POR.id === buttonElPOR.parentElement.id);

    // Populate form fields with the POR details
    document.getElementById("PORNameF").value = POREditId.name;
    document.getElementById("PORdescriptionF").value = POREditId.description;
    document.getElementById("PORdescription2F").value = POREditId.description2;
    document.getElementById("PORdurationF").value = POREditId.duration;

    // Assign the confirm function to the update button
    document.getElementById("PORUpdateButton").onclick = function () {
        confirmEditPORList(POREditId)
    }
}

// Function to confirm editing of a POR
function confirmEditPORList(POR) {
    // Update the POR object with new values from the form
    POR.name = document.getElementById("PORNameF").value;
    POR.description = document.getElementById("PORdescriptionF").value;
    POR.description2 = document.getElementById("PORdescription2F").value;
    POR.duration = document.getElementById("PORdurationF").value;

    // Refresh the displayed list of PORs
    updatePORList();

    // Update the editable list's display
    document.getElementById(`${POR.id}name`).innerText = `${document.getElementById("PORNameF").value} ${document.getElementById("PORdurationF").value}`;

    // Clear the form fields and reset button visibility
    document.getElementById("PORNameF").value = "";
    document.getElementById("PORdescriptionF").value = "";
    document.getElementById("PORdescription2F").value = "";
    document.getElementById("PORdurationF").value = "";
    document.getElementById("PORUpdateButton").classList.add("hidden");
    document.getElementById("PORAddButton").classList.remove("hidden");
}

// Function to refresh the displayed list of PORs
function updatePORList() {
    // Get the list elements
    let PORList = document.getElementById("PORList");
    let PORSpan = document.getElementById("userEnteredPORs");

    // Clear existing list
    PORList.innerHTML = "";
    PORSpan.innerHTML = "";

    // Loop through the POR array and create new list items
    for (let porr of PORs) {
        // Create a New List item element
        let newListItem = document.createElement("li");

        // Add POR name, duration, and descriptions to the list item
        let PORNameElement = document.createElement("p");
        PORNameElement.classList.add("fw-bold", "my-0", "p-0");
        PORNameElement.textContent = porr.name;
        newListItem.appendChild(PORNameElement);

        let PORDurationElement = document.createElement("p");
        PORDurationElement.classList.add("text-sm-end", "fw-bold", "my-0");
        PORDurationElement.textContent = "[" + porr.duration + "]";
        newListItem.appendChild(PORDurationElement);

        let PORDescriptionElement = document.createElement("p");
        PORDescriptionElement.classList.add("text-sm", "p-0", "my-0", "justify-content");
        PORDescriptionElement.textContent = porr.description;
        newListItem.appendChild(PORDescriptionElement);

        let PORDescriptionElement2 = document.createElement("p");
        PORDescriptionElement2.classList.add("text-sm", "p-0", "my-0", "justify-content");
        PORDescriptionElement2.textContent = porr.description2;
        newListItem.appendChild(PORDescriptionElement2);

        // Append the new list item to the displayed list
        PORList.appendChild(newListItem);

        // Update LaTeX representation (FIXED: Added escapeLaTeX for descriptions)
        PORSpan.innerHTML += "\\item \\textbf{" + escapeLaTeX(porr.name) + "}\n" +
            "\\hfill [" + escapeLaTeX(porr.duration) + "] \\\\[-0.7cm]\n" +
            "   \\begin{itemize} \\itemsep \\isep\n" +
            "      \\item " + escapeLaTeX(porr.description) + "\n" +
            "      \\item " + escapeLaTeX(porr.description2) + "\n" +
            "        \\end{itemize}\n";
    }
}

// Function to add a new achievement to the achievements list
function addNewAchievement() {
    // Get the name of the new achievement from the input field
    let achievementName = document.getElementById("achievementNameF").value;
    // Generate a unique ID for the achievement using its name and a timestamp
    let id = `${achievementName}-${Date.now()}`;

    if (achievementName) {
        // Add the new achievement to the achievements array
        achievements.push({
            id: id,
            name: achievementName,
        });

        // Clear the input field after adding the achievement
        document.getElementById("achievementNameF").value = "";

        // Update the achievements list displayed on the webpage
        updateAchievementsList();

        // Add the achievement to the editable section
        const achievementsEdit = document.getElementById("achievementsEdit");
        achievementsEdit.innerHTML += `
            <div class="border bg-white p-2 rounded" style="height: auto;">
                <div class="row align-items-center">
                    <div class="col-md-8">
                        <h5 class="mb-0">achievement name: <strong id="${id}name">${achievementName}</strong></h5>
                    </div>
                    <div class="col-md-4 text-right" id="${id}">
                        <button class="btn btn-dark btn-sm"  onclick="editachievementsList(this)">Edit</button>
                        <button class="btn btn-dark btn-sm"  onclick="deleteachievementsList(this)">Delete</button>
                    </div>
                </div>
            </div>`;

        // Show the comment section if hidden
        document.getElementById("achievementEditComment").classList.remove("hidden");
    }
}

// Function to delete an achievement from the list
function deleteachievementsList(buttonElA) {
    // Find the achievement object and its index in the array using the ID
    const achievementDeleteId = achievements.find(achievement => achievement.id == buttonElA.parentElement.id);
    const achievementDeleteIndex = achievements.findIndex(achievement => achievement.id == buttonElA.parentElement.id);

    // Confirm deletion with the user
    if (confirm(`Are you sure, you want to delete ${achievementDeleteId.name} achievement`)) {
        // Remove the achievement from the array
        achievements.splice(achievementDeleteIndex, 1);

        // Remove the achievement's HTML element from the DOM
        buttonElA.parentElement.parentElement.parentElement.remove();

        // Hide the comment section if the list is empty
        if (achievements.length === 0) {
            document.getElementById("achievementEditComment").classList.add("hidden");
        }

        // Update the achievements list displayed on the webpage
        updateAchievementsList();
    }
}

// Function to initiate the editing of an achievement
function editachievementsList(buttonElA) {
    // Show the update button and hide the add button
    document.getElementById("achievementUpdateButton").classList.remove("hidden");
    document.getElementById("achievementAddButton").classList.add("hidden");

    // Find the achievement object using its ID
    const achievementEditId = achievements.find(achievement => achievement.id === buttonElA.parentElement.id);

    // Pre-fill the input field with the achievement's current name
    document.getElementById("achievementNameF").value = achievementEditId.name;

    // Set up the update button to save changes to the edited achievement
    document.getElementById("achievementUpdateButton").onclick = function () {
        confirmEditachievementList(achievementEditId)
    }
}

// Function to confirm and save the edits made to an achievement
function confirmEditachievementList(achievement) {
    // Update the achievement name in the array with the new value
    achievement.name = document.getElementById("achievementNameF").value;

    // Update the achievements list displayed on the webpage
    updateAchievementsList();

    // Update the displayed name of the edited achievement in the editable section
    document.getElementById(`${achievement.id}name`).innerText = document.getElementById("achievementNameF").value;

    // Clear the input field and reset button visibility
    document.getElementById("achievementNameF").value = "";
    document.getElementById("achievementUpdateButton").classList.add("hidden");
    document.getElementById("achievementAddButton").classList.remove("hidden");
}

// Function to refresh and display the list of achievements on the webpage
function updateAchievementsList() {
    let achievementsList = document.getElementById("achievementList");
    let achievementsSpan = document.getElementById("userEnteredAchievements");

    // clear the existing list and LaTeX code
    achievementsList.innerHTML = "";
    achievementsSpan.innerHTML = "";

    // Loop through each achievement and update the list
    for (let achievement of achievements) {
        // Create a new list item for each achievement
        let newListItem = document.createElement("li");
        let achievementNameElement = document.createElement("p");
        achievementNameElement.classList.add("my-0", "p-0");
        achievementNameElement.textContent = achievement.name;
        newListItem.appendChild(achievementNameElement);

        // Add the list item to the achievements section
        achievementsList.appendChild(newListItem);

        // Generate LaTeX code for the achievements section (FIXED: Added escapeLaTeX)
        achievementsSpan.innerHTML += "\\item {" + escapeLaTeX(achievement.name) + "}\\vspace{0.1cm}\n";  // adjust the spacing as needed
    }
}

// NEW: Separate function for switching to preview mode (was causing constant hiding in interval)
function switchToPreview() {
    document.getElementById("cv-form").style.display = "none";
    document.getElementById("CVtemplate").style.display = "block";
}

// Function to generate the CV template with user-provided input values (FIXED: Removed display switch for interval use)
function generateCV() {
    // Personal Details Section
    // Retrieves and updates the user's name, graduation year, branch, email, and contact.
    let nameField = document.getElementById("nameF").value || "Name";  // FIXED: Default values to avoid blank
    document.getElementById("nameT").innerHTML = nameField;

    let GradField = document.getElementById("CGradF").value || "Year";
    document.getElementById("CGradT").innerHTML = GradField;

    document.getElementById("BranchT").innerHTML = document.getElementById("BranchF").value || "Discipline";
    document.getElementById("emailT").innerHTML = document.getElementById("emailF").value || "Email";
    document.getElementById("contactT").innerHTML = document.getElementById("contactF").value || "Contact";
    
    // Academic Details Section
    // Updates academic details for PhD, M.Tech, B.Tech, 12th, and 10th qualifications.

    // PhD
    document.getElementById("PCPIT").innerHTML = document.getElementById("marksphdF").value || "CPI";
    document.getElementById("PYOJT").innerHTML = document.getElementById("yearphdF").value || "Year";
    document.getElementById("PINST").innerHTML = document.getElementById("institutephdF").value || "Institute";

    // M.Tech
    document.getElementById("MCPIT").innerHTML = document.getElementById("marksmtechF").value || "CPI";
    document.getElementById("MYOJT").innerHTML = document.getElementById("yearmtechF").value || "Year";
    document.getElementById("MINST").innerHTML = document.getElementById("institutemtechF").value || "Institute";

    // B.Tech
    document.getElementById("CPIT").innerHTML = document.getElementById("CPIF").value || "CPI";
    document.getElementById("YOJT").innerHTML = document.getElementById("YOJF").value || "Year";
    document.getElementById("INST").innerHTML = document.getElementById("InsF").value || "Institute";

    // Class 12th
    document.getElementById("institutetwelveT").innerHTML = document.getElementById("institutetwelveF").value || "Institute";
    document.getElementById("markstwelveT").innerHTML = document.getElementById("markstwelveF").value || "Marks";
    document.getElementById("yeartwelveT").innerHTML = document.getElementById("yeartwelveF").value || "Year";

    // Class 10th
    document.getElementById("institutetenT").innerHTML = document.getElementById("institutetenF").value || "Institute";
    document.getElementById("markstenT").innerHTML = document.getElementById("markstenF").value || "Marks";
    document.getElementById("yeartenT").innerHTML = document.getElementById("yeartenF").value || "Year";

    // Internship Details Section (FIXED: Defaults for single-entry preview)
    document.getElementById("internTitleT").innerHTML = document.getElementById("internTitleF").value || "Title";
    document.getElementById("internInfoT").innerHTML = document.getElementById("internInfoF").value || "Info";
    document.getElementById("interndescriptionT").innerHTML = document.getElementById("interndescriptionF").value || "...";
    document.getElementById("interndescription2T").innerHTML = document.getElementById("interndescription2F").value || "...";
    document.getElementById("yearinternT").innerHTML = document.getElementById("yearinternF").value || "Duration";

    // Project Details Section
    document.getElementById("projectTitleT").innerHTML = document.getElementById("projectTitleF").value || "Title";
    document.getElementById("projectInfoT").innerHTML = document.getElementById("projectInfoF").value || "Info";
    document.getElementById("projectLinkT").innerHTML = document.getElementById("projectLinkF").value || "Link";
    document.getElementById("projectDescriptionT").innerHTML = document.getElementById("projectdescriptionF").value || "...";
    document.getElementById("projectDescription2T").innerHTML = document.getElementById("projectdescription2F").value || "...";
    document.getElementById("yearprojectT").innerHTML = document.getElementById("yearprojectF").value || "Duration";

    // Skills Section
    document.getElementById("skilltypeT").innerHTML = document.getElementById("skilltypeF").value || "Type";
    document.getElementById("skilldescriptionT").innerHTML = document.getElementById("skilldescriptionF").value || "...";

    // Positions of Responsibility (POR) Section
    document.getElementById("PORNameT").innerHTML = document.getElementById("PORNameF").value || "Name";
    document.getElementById("PORdurationT").innerHTML = document.getElementById("PORdurationF").value || "Duration";
    document.getElementById("PORdescriptionT").innerHTML = document.getElementById("PORdescriptionF").value || "...";
    document.getElementById("PORdescription2T").innerHTML = document.getElementById("PORdescription2F").value || "...";

    // Achievements Section
    document.getElementById("achievementNameT").innerHTML = document.getElementById("achievementNameF").value || "Achievement";
}

// FIXED: Interval for live updates only (no view switch)
setInterval(generateCV, 100);

// NEW: Manual switch to preview (call from HTML button, e.g., onclick="switchToPreview()")
function switchToPreview() {
    document.getElementById("cv-form").style.display = "none";
    document.getElementById("CVtemplate").style.display = "block";
}

/**
 * This function copies the LaTeX representation of the CV to the clipboard.
 */
function copyToClipboard() {
    // Retrieve and populate various user-entered details into the LaTeX format fields.
    let userName = document.getElementById("nameF").value || "Your Name";
    let userYear = document.getElementById("CGradF").value || "Your Year";
    let userEmail = document.getElementById("emailF").value || "email@example.com";
    let userBranch = document.getElementById("BranchF").value || "Your Branch";
    let userContact = document.getElementById("contactF").value || "Your Contact";
    let userGithub = document.getElementById("gitF").value || "";
    let userLinkedIn = document.getElementById("linkedinF").value || "";
    let userWebsite = document.getElementById("websiteF").value || "";

    // Update corresponding placeholders in the LaTeX CV template with user-entered values.
    document.getElementById("userEnteredYear").innerText = escapeLaTeX(userYear);  // FIXED: Escape for LaTeX
    document.getElementById("userEnteredEmail").innerText = escapeLaTeX(userEmail);
    document.getElementById("userEnteredEmailText").innerText = escapeLaTeX(userEmail);
    document.getElementById("userEnteredContact").innerText = escapeLaTeX(userContact);
    document.getElementById("userEnteredGithub").innerText = escapeLaTeX(userGithub);
    document.getElementById("userEnteredLinkedIn").innerText = escapeLaTeX(userLinkedIn);
    document.getElementById("userEnteredWebsite").innerText = escapeLaTeX(userWebsite);
    document.getElementById("userEnteredName").innerText = escapeLaTeX(userName);
    document.getElementById("userEnteredBranch").innerText = escapeLaTeX(userBranch);

    // Fetch and populate PhD-related details, if provided.
    let userInstitutephd = document.getElementById("institutephdF").value || "";
    let userSpecializationphd = document.getElementById("specializationphdF").value || "";
    let userCPIphd = document.getElementById("marksphdF").value || "";
    let userYOJphd = document.getElementById("yearphdF").value || "";

    // If no PhD details are entered, clear the corresponding LaTeX section.
    if (userInstitutephd === "") {
        document.getElementById("userphd").innerText = "";
    }
    else {
        // Update the LaTeX template with PhD details.
        document.getElementById("userphd").innerText = "PhD & \\textit{" + escapeLaTeX(userSpecializationphd) + "} & " + escapeLaTeX(userInstitutephd) + " & " + escapeLaTeX(userYOJphd) + " & " + escapeLaTeX(userCPIphd) + " \\\\";
    }

    // Fetch and populate M.Tech-related details, if provided.
    let userInstituteMtech = document.getElementById("institutemtechF").value || "";
    let userSpecializationMtech = document.getElementById("specializationmtechF").value || "";
    let userCPIMtech = document.getElementById("marksmtechF").value || "";
    let userYOJMtech = document.getElementById("yearmtechF").value || "";

    // If no M.Tech details are entered, clear the corresponding LaTeX section.
    if (userInstituteMtech === "") {
        document.getElementById("usermtech").innerText = "";
    }
    else {
         // Update the LaTeX template with M.Tech details.
        document.getElementById("usermtech").innerText = "M.Tech. & \\textit{" + escapeLaTeX(userSpecializationMtech) + "} & " + escapeLaTeX(userInstituteMtech) + " & " + escapeLaTeX(userYOJMtech) + " & " + escapeLaTeX(userCPIMtech) + " \\\\";
    }

    // Fetch and populate B.Tech-related details.
    let userCPI = document.getElementById("CPIF").value || "";
    let userIns = document.getElementById("InsF").value || "";
    let userYOJ = document.getElementById("YOJF").value || "";
    let userSpec = document.getElementById("SpecF").value || "";

    // Update the LaTeX template with B.Tech details
    document.getElementById("userEnteredCPI").innerText = escapeLaTeX(userCPI);
    document.getElementById("userEnteredIns").innerText = escapeLaTeX(userIns);
    document.getElementById("userEnteredYOJ").innerText = escapeLaTeX(userYOJ);
    document.getElementById("userEnteredBranch2").innerText = escapeLaTeX(userSpec);

    // Fetch and populate Class 12th-related details.
    let userInstituteTwelve = document.getElementById("institutetwelveF").value || "";
    let userMarksTwelve = document.getElementById("markstwelveF").value || "";
    let userYearTwelve = document.getElementById("yeartwelveF").value || "";

    // Update the LaTeX template with Class 12th details.
    document.getElementById("userEnteredInstituteTwelve").innerText = escapeLaTeX(userInstituteTwelve);
    document.getElementById("userEnteredMarksTwelve").innerText = escapeLaTeX(userMarksTwelve);
    document.getElementById("userEnteredYearTwelve").innerText = escapeLaTeX(userYearTwelve);

    // Fetch and populate Class 10th-related details.
    let userInstituteTen = document.getElementById("institutetenF").value || "";
    let userMarksTen = document.getElementById("markstenF").value || "";
    let userYearTen = document.getElementById("yeartenF").value || "";

    // Update the LaTeX template with Class 10th details.
    document.getElementById("userEnteredInstituteTen").innerText = escapeLaTeX(userInstituteTen);
    document.getElementById("userEnteredMarksTen").innerText = escapeLaTeX(userMarksTen);
    document.getElementById("userEnteredYearTen").innerText = escapeLaTeX(userYearTen);

    // NEW: Force update dynamic sections (internships, projects, etc.) to populate LaTeX spans
    updateInternshipList();
    updateProjectList();
    updateSkillList();
    updatePORList();
    updateAchievementsList();

    // Get the updated LaTeX code from the template.
    let latexCode = document.getElementById("latexCode").innerText;

    // Create a temporary textarea element to hold the LaTeX code for copying.
    var tempTextarea = document.createElement("textarea");

    // Set the textarea value to the updated LaTeX code.
    tempTextarea.value = latexCode;

    // Append the textarea element to the DOM to make it accessible.
    document.body.appendChild(tempTextarea);

    // Select the text in the textarea for copying.
    tempTextarea.select();

    // Execute the "copy" command to copy the LaTeX code to the clipboard.
    document.execCommand("copy");

    // Remove the temporary textarea element from the DOM.
    document.body.removeChild(tempTextarea);

    // Optionally, provide feedback to the user about the successful copy action.
    alert("Copied LaTeX code to clipboard. Paste in any LaTeX editor. Eg: Overleaf.");
}

// NEW: Direct LaTeX to PDF compilation (client-side with texlive.js)
let pdftex = null;  // Global for reuse

async function compileAndDownloadPDF() {
    // First, populate LaTeX (reuse copy logic)
    copyToClipboard();  // This updates all spans

    // Get full LaTeX
    let latexCode = document.getElementById("latexCode").innerText;

    if (!latexCode.includes("\\end{document}")) {
        alert("LaTeX template incomplete—fill more fields or check #latexCode.");
        return;
    }

    if (!pdftex) {
        try {
            pdftex = new PDFTeX();  // Init (loads wasm first time)
        } catch (e) {
            alert("PDF engine load failed—ensure <script src='https://manuels.github.io/texlive.js/texlive.js'></script> in HTML.");
            return;
        }
    }

    try {
        alert("Compiling LaTeX to PDF... (First time ~10s)");
        const pdfData = await pdftex.compile(latexCode, { fmt: 'pdf' });  // Compile

        // Download
        const blob = new Blob([pdfData], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'resume.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        alert("PDF downloaded! Exact LaTeX output. 📄");
    } catch (error) {
        console.error("Compile error:", error);
        alert(`Compile failed: ${error.message}\n\nTip: Check console. Common: Missing packages in template (add \\usepackage{...}).`);
    }
}

// FIXED: Interval for live updates only (no view switch)
setInterval(generateCV, 100);