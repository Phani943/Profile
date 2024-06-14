var typed = new Typed(".text", {
    strings:["AI Developer", "Robotics Enthusiast", "Python Developer"],
    typeSpeed:100,
    backSpeed:100,
    backDelay:1000,
    loop:true
});

const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav_link');

// navbar.classList.remove('active');

menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
    });
});

document.getElementById('contact_form').addEventListener('submit', function(event) {
    event.preventDefault();

    var formData = {
        from_name: document.getElementById('user_name').value,
        email_id: document.getElementById('user_email').value,
        message: document.getElementById('message').value
    };

    emailjs.send("service_bk9fpao", "template_wnctq6s", formData)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Message sent successfully!');
            document.getElementById('contact_form').reset();
        }, function(error) {
            console.log('FAILED...', error);
            alert('Message sending failed.');
        });
});

