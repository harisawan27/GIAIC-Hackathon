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

// Form submission event listener
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

    // Save data to localStorage with a key based on the username
    const username = resumeData.name.replace(/\s+/g, '_').toLowerCase(); 
    localStorage.setItem(`resume-${username}`, JSON.stringify(resumeData));

    // Update the URL with the username
    const newURL = `${window.location.origin}?resume=${username}`;
    window.history.pushState({}, '', newURL);

    // Update the resume display
    updateResumeDisplay(resumeData);

    // Display the generated unique URL for sharing
    document.getElementById('share-link')!.textContent = newURL;
});

// On page load, check if the URL has the "resume=username" parameter
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const resumeKey = urlParams.get('resume');

    if (resumeKey) {
        const savedData = localStorage.getItem(`resume-${resumeKey}`);

        if (savedData) {
            const resumeData = JSON.parse(savedData);
            updateResumeDisplay(resumeData);
        }
    }
});

// Share the resume link
function shareResume() {
    const shareLink = document.getElementById('share-link')?.textContent;
    if (navigator.share && shareLink) {
        navigator.share({
            title: 'Check out my resume',
            text: 'Here is my resume:',
            url: shareLink,
        }).catch((error) => console.log('Error sharing:', error));
    } else {
        alert('Sharing not supported on this browser.');
    }
}

// Download resume as PDF using html2pdf
declare var html2pdf: any;
function downloadPDF() {
    const resumeElement = document.getElementById('resume-display');
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
    } else {
        console.error('Resume element not found!');
    }
}

