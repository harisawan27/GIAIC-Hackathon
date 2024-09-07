// Toggle skills section
var toggleButton = document.getElementById('toggle-skills');
var skillsSection = document.getElementById('skills');
toggleButton.addEventListener('click', function () {
    if (skillsSection.style.display === 'none') {
        skillsSection.style.display = 'block';
    }
    else {
        skillsSection.style.display = 'none';
    }
});
// Resume builder form
var form = document.getElementById('user-form');
// Get references to input fields
var resume = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    degree: document.getElementById('degree'),
    university: document.getElementById('university'),
    graduationYear: document.getElementById('graduation-year'),
    jobTitle: document.getElementById('job-title'),
    company: document.getElementById('company'),
    yearsWorked: document.getElementById('years'),
    skillsSet: document.getElementById('skills-set'),
};
// Get references to resume display sections
var resumeDisplay = {
    name: document.getElementById('resume-name'),
    email: document.getElementById('resume-email'),
    phone: document.getElementById('resume-phone'),
    degree: document.getElementById('resume-degree'),
    university: document.getElementById('resume-university'),
    graduationYear: document.getElementById('resume-graduation-year'),
    jobTitle: document.getElementById('resume-job-title'),
    company: document.getElementById('resume-company'),
    yearsWorked: document.getElementById('resume-years-worked'),
    skillsSet: document.getElementById('resume-skills'),
};
form.addEventListener('submit', function (event) {
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
form.addEventListener('submit', function (event) {
    event.preventDefault();
    // Capture all form data
    var resumeData = {
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
    window.history.pushState({}, '', "?resume=my-resume");
    // Update the resume display
    updateResumeDisplay(resumeData);
});
// Function to update the resume display
function updateResumeDisplay(resumeData) {
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
window.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var resumeKey = urlParams.get('resume');
    if (resumeKey === 'my-resume') {
        var savedData = localStorage.getItem('my-resume');
        if (savedData) {
            var resumeData = JSON.parse(savedData);
            updateResumeDisplay(resumeData);
        }
    }
});
