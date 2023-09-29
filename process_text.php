<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get email and textarea content from the form
    $email = $_POST["email_textarea"];
    $textareaContent = $_POST["textarea_content"];

    // Prepare the email content
    $subject = "New Message from Website";
    $message = "Textarea Content: $textareaContent";

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
