var typed = new Typed(".text", {
    strings: ["AI Developer", "Robotics Enthusiast", "Python Developer"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav_link');

document.getElementById('message').style.display = 'none';
document.getElementById('send_msg').style.display = 'none';

// navbar.classList.remove('active');

menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const selectedValue = document.querySelector('.selected_value');
    const customOptions = document.querySelector('.custom_options');
    const caretIcon = document.querySelector('.selected_value i.fa-caret-down');

    selectedValue.addEventListener('click', function () {
        customOptions.style.display = (customOptions.style.display === 'block') ? 'none' : 'block';
        caretIcon.classList.toggle('rotated');
    });

    document.addEventListener('click', function (event) {
        const isClickInside = selectedValue.contains(event.target) || customOptions.contains(event.target);
        if (!isClickInside) {
            customOptions.style.display = 'none';
            caretIcon.classList.remove('rotated');
        }
    });

    document.querySelectorAll('.custom_option').forEach(option => {
        option.addEventListener('click', function () {

            const value = this.getAttribute('data-value');
            const select = document.getElementById('project_category');
            const selectedText = this.textContent;

            select.value = value;

            const textNode = document.createTextNode(selectedText + " ");
            selectedValue.childNodes[0].replaceWith(textNode);

            customOptions.style.display = 'none';

            caretIcon.classList.toggle('rotated');

            updateDisplayedProjects(value);
        });
    });
});

function updateDisplayedProjects(category) {
    const projects = document.querySelectorAll('.project');
    let projectFound = false;

    projects.forEach(project => {
        if (category === 'all' || project.getAttribute('data-category') === category) {
            project.style.display = '';
            projectFound = true;
        } else {
            project.style.display = 'none';
        }
    });

    const projectsContainer = document.querySelector('.projects_container');
    // Remove existing no-projects message if any
    const noProjectsMsg = projectsContainer.querySelector('.no-projects-message');
    if (noProjectsMsg) {
        projectsContainer.removeChild(noProjectsMsg);
    }

    // If no projects found, display a message
    if (!projectFound) {
        const msgElement = document.createElement('div');
        msgElement.classList.add('no-projects-message');
        msgElement.textContent = 'Currently, No projects in this category - will update soon';
        projectsContainer.appendChild(msgElement);
    }
}

document.getElementById('send_otp').addEventListener('click', function () {
    var userEmail = document.getElementById('user_email').value;
    
    if (!userEmail.endsWith('@gmail.com')) {
        alert('Make sure, you entered a valid Gmail address.');
        return;
    }

    var verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    sessionStorage.setItem('verificationCode', verificationCode);

    emailjs.send("service_bk9fpao", "template_wh7d9r7", {
        to_email: userEmail,
        verification_code: verificationCode
    }).then(function (response) {
        alert('Verification code sent to your Gmail address.');
    }, function (error) {
        alert('Failed to send verification code.');
    });
});

document.getElementById('verify_otp').addEventListener('click', function () {
    var enteredCode = document.getElementById('verification_code').value;
    var storedCode = sessionStorage.getItem('verificationCode');

    if (enteredCode === storedCode) {
        alert('Verification successful! You can now send your message.');
        document.getElementById('message').style.display = 'block';
        document.getElementById('send_msg').style.display = 'block';
    } else {
        alert('Verification failed. Check the code and try again.');
    }
});

document.getElementById('contact_form').addEventListener('submit', function (event) {
    event.preventDefault();

    var formData = {
        from_name: document.getElementById('user_name').value,
        email_id: document.getElementById('user_email').value,
        message: document.getElementById('message').value
    };

    emailjs.send("service_bk9fpao", "template_wnctq6s", formData)
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Message sent successfully!');
            document.getElementById('contact_form').reset();
        }, function (error) {
            console.log('FAILED...', error);
            alert('Message sending failed.');
        });
});
