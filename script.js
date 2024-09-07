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
// Form submission event listener
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
    // Save data to localStorage with a key based on the username
    var username = resumeData.name.replace(/\s+/g, '_').toLowerCase();
    localStorage.setItem("resume-".concat(username), JSON.stringify(resumeData));
    // Update the URL with the username
    var newURL = "".concat(window.location.origin, "?resume=").concat(username);
    window.history.pushState({}, '', newURL);
    // Update the resume display
    updateResumeDisplay(resumeData);
    // Display the generated unique URL for sharing
    document.getElementById('share-link').textContent = newURL;
});
// On page load, check if the URL has the "resume=username" parameter
window.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var resumeKey = urlParams.get('resume');
    if (resumeKey) {
        var savedData = localStorage.getItem("resume-".concat(resumeKey));
        if (savedData) {
            var resumeData = JSON.parse(savedData);
            updateResumeDisplay(resumeData);
        }
    }
});
// Share the resume link
function shareResume() {
    var _a;
    var shareLink = (_a = document.getElementById('share-link')) === null || _a === void 0 ? void 0 : _a.textContent;
    if (navigator.share && shareLink) {
        navigator.share({
            title: 'Check out my resume',
            text: 'Here is my resume:',
            url: shareLink,
        }).catch(function (error) { return console.log('Error sharing:', error); });
    }
    else {
        alert('Sharing not supported on this browser.');
    }
}
function downloadPDF() {
    var resumeElement = document.getElementById('resume-display');
    if (resumeElement) {
        // Call html2pdf on the resume element
        html2pdf()
            .from(resumeElement) // Convert the resume HTML to PDF
            .set({
            margin: 1,
            filename: 'resume.pdf',
            html2canvas: { scale: 2 },
            jsPDF: { orientation: 'portrait' }
        })
            .save();
    }
    else {
        console.error('Resume element not found!');
    }
}
