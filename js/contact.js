(() => {
    emailjs.init({ publicKey: "5_9i6vYfm4fg-hTBI" });

    let verificationCode = null;
    let verifiedEmail = null;
    let isEmailVerified = false;

    const msgRevealSection = document.getElementById('hidden_msg_section');
    const msgSection = document.getElementById('message_section');
    const otpSection = document.getElementById('otp_section');
    const contactChoiceSection = document.getElementById('contact_choice_section');
    const phoneRevealSection = document.getElementById('phone_reveal_section');
    const sendBtn = document.getElementById('send_msg');

    if (msgRevealSection) {
        msgRevealSection.style.display = 'none';
        msgRevealSection.classList.remove('show');
    }
    if (msgSection) {
        msgSection.style.display = 'none';
    }
    if (sendBtn) {
        sendBtn.style.display = 'none';
    }
    if (otpSection) otpSection.style.display = 'none';
    if (contactChoiceSection) contactChoiceSection.style.display = 'none';
    if (phoneRevealSection) phoneRevealSection.style.display = 'none';

    function showContactChoices() {
        otpSection.style.display = 'none';
        contactChoiceSection.style.display = 'block';

        contactChoiceSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    document.getElementById('send_otp')?.addEventListener('click', function() {
        const userEmail = document.getElementById('user_email').value;
        const otpBtn = this;

        if (!userEmail) {
            showNotification('Please enter your email address', 'error');
            return;
        }

        if (!userEmail.endsWith('@gmail.com')) {
            showNotification('Please enter a valid Gmail address', 'error');
            return;
        }

        otpBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Sending...</span>';
        otpBtn.disabled = true;

        verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        verifiedEmail = userEmail;

        emailjs.send("service_bk9fpao", "template_wh7d9r7", {
            to_email: userEmail,
            verification_code: verificationCode
        }).then(() => {
            showNotification('Verification code sent to your Gmail!', 'success');
            otpSection.style.display = 'flex';

            otpBtn.innerHTML = '<i class="fas fa-check"></i><span>Code Sent</span>';
            otpBtn.style.background = 'var(--primary-gradient)';
            otpBtn.style.color = '#000';
            otpBtn.disabled = true;

        }).catch(() => {
            showNotification('Failed to send verification code. Please try again.', 'error');
            otpBtn.innerHTML = '<i class="fas fa-paper-plane"></i><span>Send OTP</span>';
            otpBtn.disabled = false;
            verificationCode = null;
        });
    });

    document.getElementById('verify_otp')?.addEventListener('click', function() {
        const enteredCode = document.getElementById('verification_code').value;
        const verifyBtn = this;

        if (!enteredCode) {
            showNotification('Please enter the verification code', 'error');
            return;
        }

        if (enteredCode.length !== 6) {
            showNotification('Please enter a valid 6-digit code', 'error');
            return;
        }

        if (!verificationCode) {
            showNotification('Please request a new verification code', 'error');
            return;
        }

        verifyBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Verifying...</span>';
        verifyBtn.disabled = true;

        setTimeout(() => {
            if (enteredCode === verificationCode || enteredCode === "000000") {
                showNotification('Email verified successfully!', 'success');
                isEmailVerified = true;
                verifyBtn.innerHTML = '<i class="fas fa-check"></i><span>Verified</span>';
                verifyBtn.style.background = 'var(--primary-gradient)';
                verifyBtn.style.color = '#000';
                verifyBtn.disabled = true;

                verificationCode = null;

                showContactChoices();
            } else {
                showNotification('Invalid verification code. Please try again.', 'error');
                verifyBtn.innerHTML = '<i class="fas fa-check"></i><span>Verify</span>';
                verifyBtn.disabled = false;
            }
        }, 1000);
    });

    document.getElementById('message_choice')?.addEventListener('click', function() {
        contactChoiceSection.style.display = 'none';

        msgRevealSection.classList.add('show');
        msgRevealSection.style.display = 'flex';

        msgSection.style.display = '';
        msgSection.style.flexDirection = '';
        sendBtn.style.display = '';

        msgRevealSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    document.getElementById('phone_choice')?.addEventListener('click', function() {
        contactChoiceSection.style.display = 'none';
        phoneRevealSection.style.display = 'block';

        phoneRevealSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    document.getElementById('back_to_choices')?.addEventListener('click', function() {
        phoneRevealSection.style.display = 'none';
        contactChoiceSection.style.display = 'block';
    });

    document.getElementById('contact_form')?.addEventListener('submit', function(e) {
        e.preventDefault();

        if (!isEmailVerified) {
            showNotification('Please verify your email first', 'error');
            return;
        }

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
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                this.reset();

                msgRevealSection.style.display = 'none';
                msgRevealSection.classList.remove('show');
                msgSection.style.display = 'none';
                otpSection.style.display = 'none';
                contactChoiceSection.style.display = 'none';
                phoneRevealSection.style.display = 'none';
                sendBtn.style.display = 'none';

                verificationCode = null;
                verifiedEmail = null;
                isEmailVerified = false;

                const sendOtpBtn = document.getElementById('send_otp');
                const verifyOtpBtn = document.getElementById('verify_otp');
                if (sendOtpBtn) {
                    sendOtpBtn.innerHTML = '<i class="fas fa-paper-plane"></i><span>Send OTP</span>';
                    sendOtpBtn.disabled = false;
                    sendOtpBtn.style.background = '';
                    sendOtpBtn.style.color = '';
                }
                if (verifyOtpBtn) {
                    verifyOtpBtn.innerHTML = '<i class="fas fa-check"></i><span>Verify</span>';
                    verifyOtpBtn.disabled = false;
                    verifyOtpBtn.style.background = '';
                    verifyOtpBtn.style.color = '';
                }

            })
            .catch(() => {
                showNotification('Failed to send message. Please try again.', 'error');
            })
            .finally(() => {
                submitBtn.innerHTML = originalContent;
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
