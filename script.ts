// Toggle skills section
const toggleButton = document.getElementById('toggle-skills') as HTMLButtonElement;
const skillsSection = document.getElementById('skills') as HTMLElement;

toggleButton.addEventListener('click', () => {
    if (skillsSection.style.display === 'none') {
        skillsSection.style.display = 'block';
    } else {
        skillsSection.style.display = 'none';
    }
});

// Resume builder form
const form = document.getElementById('user-form') as HTMLFormElement;

// Get references to input fields
const resume = {
    name: document.getElementById('name') as HTMLInputElement,
    email: document.getElementById('email') as HTMLInputElement,
    phone: document.getElementById('phone') as HTMLInputElement,
    degree: document.getElementById('degree') as HTMLInputElement,
    university: document.getElementById('university') as HTMLInputElement,
    graduationYear: document.getElementById('graduation-year') as HTMLInputElement,
    jobTitle: document.getElementById('job-title') as HTMLInputElement,
    company: document.getElementById('company') as HTMLInputElement,
    yearsWorked: document.getElementById('years') as HTMLInputElement,
    skillsSet: document.getElementById('skills-set') as HTMLInputElement, 
};

// Get references to resume display sections
const resumeDisplay = {
    name: document.getElementById('resume-name') as HTMLElement,
    email: document.getElementById('resume-email') as HTMLElement,
    phone: document.getElementById('resume-phone') as HTMLElement,
    degree: document.getElementById('resume-degree') as HTMLElement,
    university: document.getElementById('resume-university') as HTMLElement,
    graduationYear: document.getElementById('resume-graduation-year') as HTMLElement,
    jobTitle: document.getElementById('resume-job-title') as HTMLElement,
    company: document.getElementById('resume-company') as HTMLElement,
    yearsWorked: document.getElementById('resume-years-worked') as HTMLElement,
    skillsSet: document.getElementById('resume-skills') as HTMLElement,
};

form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Dynamically fill the resume with user input for name, email, phone, etc.
    resumeDisplay.name.textContent = resume.name.value;
    resumeDisplay.email.textContent = resume.email.value;
    resumeDisplay.phone.textContent = resume.phone.value;

    resumeDisplay.degree.textContent = resume.degree.value;
    resumeDisplay.university.textContent = resume.university.value;
    resumeDisplay.graduationYear.textContent = resume.graduationYear.value;

    resumeDisplay.jobTitle.textContent = resume.jobTitle.value;
    resumeDisplay.company.textContent = resume.company.value;
    resumeDisplay.yearsWorked.textContent = resume.yearsWorked.value;

    resumeDisplay.skillsSet.textContent = resume.skillsSet.value;

});



form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Capture all form data
    const resumeData = {
        name: resume.name.value,
        email: resume.email.value,
        phone: resume.phone.value,
        degree: resume.degree.value,
        university: resume.university.value,
        graduationYear: resume.graduationYear.value,
        jobTitle: resume.jobTitle.value,
        company: resume.company.value,
        yearsWorked: resume.yearsWorked.value,
        skills: resume.skillsSet.value
    };

    // Save data to localStorage with a fixed key
    localStorage.setItem('my-resume', JSON.stringify(resumeData));

    // Update the URL with a simple query parameter
    window.history.pushState({}, '', `?resume=my-resume`);

    // Update the resume display
    updateResumeDisplay(resumeData);
});




// Function to update the resume display
function updateResumeDisplay(resumeData: any) {
    resumeDisplay.name.textContent = resumeData.name;
    resumeDisplay.email.textContent = resumeData.email;
    resumeDisplay.phone.textContent = resumeData.phone;
    resumeDisplay.degree.textContent = resumeData.degree;
    resumeDisplay.university.textContent = resumeData.university;
    resumeDisplay.graduationYear.textContent = resumeData.graduationYear;
    resumeDisplay.jobTitle.textContent = resumeData.jobTitle;
    resumeDisplay.company.textContent = resumeData.company;
    resumeDisplay.yearsWorked.textContent = resumeData.yearsWorked;
    resumeDisplay.skillsSet.textContent = resumeData.skills;
}

// On page load, check if the URL has the "resume=my-resume" parameter
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const resumeKey = urlParams.get('resume');

    if (resumeKey === 'my-resume') {
        const savedData = localStorage.getItem('my-resume');

        if (savedData) {
            const resumeData = JSON.parse(savedData);
            updateResumeDisplay(resumeData);
        }
    }
});


