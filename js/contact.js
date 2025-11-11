(() => {
    emailjs.init({ publicKey: "5_9i6vYfm4fg-hTBI" });

    // Handle main contact form submission
    document.getElementById('contact_form')?.addEventListener('submit', function(e) {
        e.preventDefault();

        const submitBtn = document.getElementById('send_msg');
        const originalContent = submitBtn.innerHTML;

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Sending...</span>';
        submitBtn.disabled = true;

        fetch('https://api.ipify.org?format=json')
            .then(res => res.json())
            .then(data => {
                const formData = {
                    from_name: document.getElementById('user_name').value,
                    email_id: document.getElementById('user_email').value,
                    message: document.getElementById('message').value,
                    user_ip: data.ip,
                    user_platform: navigator.userAgent,
                    current_datetime: new Date().toLocaleString('en-IN', {
                        timeZone: 'Asia/Kolkata',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    })
                };

                return emailjs.send("service_bk9fpao", "template_ho5mu82", formData);
            })
            .then(() => {
                showNotification('Message received successfully! I\'ll get back to you soon.', 'success');
                this.reset();
            })
            .catch(() => {
                showNotification('Failed to send message. Please try again.', 'error');
            })
            .finally(() => {
                submitBtn.innerHTML = originalContent;
                submitBtn.disabled = false;
            });
    });

    // Toggle phone card
    document.getElementById('toggle_phone_card')?.addEventListener('click', function() {
        const phoneCard = document.getElementById('phone_verification_card');
        const isExpanded = phoneCard.classList.contains('expanded');

        phoneCard.classList.toggle('expanded');

        const icon = this.querySelector('.toggle-arrow i');
        if (isExpanded) {
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        } else {
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
            phoneCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    });

    // Submit phone number
    document.getElementById('submit_phone')?.addEventListener('click', function() {
        const phoneNumber = document.getElementById('user_phone').value;
        const submitBtn = this;

        if (!phoneNumber) {
            showNotification('Please enter your phone number', 'error');
            return;
        }

        // Validate Indian phone number (10 digits)
        if (!/^[6-9]\d{9}$/.test(phoneNumber)) {
            showNotification('Please enter a valid 10-digit Indian phone number', 'error');
            return;
        }

        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Submitting...</span>';
        submitBtn.disabled = true;

        fetch('https://api.ipify.org?format=json')
            .then(res => res.json())
            .then(data => {
                // Send phone number to your email
                const phoneData = {
                    to_email: "phanichaitanya63@gmail.com",
                    phone_number: phoneNumber,
                    user_ip: data.ip,
                    user_platform: navigator.userAgent,
                    request_time: new Date().toLocaleString('en-IN', {
                        timeZone: 'Asia/Kolkata',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    }),
                    subject: "Direct Contact Request - Phone Number Submission"
                };

                return emailjs.send("service_bk9fpao", "template_wh7d9r7", phoneData);
            })
            .then(() => {
                showNotification('Request submitted successfully!', 'success');

                // Hide input section and show success message
                document.getElementById('phone_input_section').style.display = 'none';
                document.getElementById('phone_success_section').style.display = 'block';

                // Reset button state
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i><span>Submit</span>';
                submitBtn.disabled = false;

                // Clear input
                document.getElementById('user_phone').value = '';
            })
            .catch(() => {
                showNotification('Failed to submit request. Please try again.', 'error');
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i><span>Submit</span>';
                submitBtn.disabled = false;
            });
    });

})();

function showNotification(message, type = 'info') {
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 500;
        max-width: 350px;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
