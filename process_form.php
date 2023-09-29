<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get email and domain from the form
    $email = $_POST["email"];
    $domain = $_POST["domain"];

    // Prepare the email content
    $subject = "New Connection Request";
    $message = "Email: $email\nDomain: $domain";

    // Send the email
    $to = "your@example.com"; // Replace with your email address
    $headers = "From: $email";

    // Send the email using mail() function
    if (mail($to, $subject, $message, $headers)) {
        echo "Email sent successfully.";
    } else {
        echo "Failed to send the email.";
    }
}
?>
