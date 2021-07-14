<?php
require_once 'header.php';

$msg = "";
$msgClass = "";
if (filter_has_var(INPUT_POST,'contactSubmit')) {
    $email = htmlspecialchars($_POST["contactEmail"]);
    $name = htmlspecialchars($_POST["contactName"]);
    $message = htmlspecialchars($_POST["contactText"]);

    //check required fields
    if (!empty($email) && !empty($name) && !empty($message)) {

        if (filter_var($email,FILTER_VALIDATE_EMAIL) === false) {
            $msg = "Please use a valid e-mail";
            $msgClass = "alert-danger";
        } else {
            $toEmail = "dr1nky@tlu.ee";
            $subject = "Contact Request from " .$name;
            $body = "<h2> Contact Request</h2><br><br>
                <h4>Name</h4><p>" .$name ."</p><br>
                <h4>E-mail</h4><p>" .$email ."</p><br>
                <h4>Message</h4><p>" .$message ."</p>";
            
            $headers = "MIME-Version: 1.0" ."\r\n";
            $headers .= "Content-Type:text/html;charset=UTF-8" ."\r\n";

            $headers .= "From: " .$name ."<" .$email .">" ."\r\n";
            if (mail($toEmail, $subject, $body, $headers)) {
                $msg = "Your message has been sent!";
                $msgClass = "alert-success";
            } else {
                $msg = "Error sending an e-mail!";
                $msgClass = "alert-danger";
            }
        }
    } else {
        $msg = "Please fill in all fields";
        $msgClass = "alert-danger";
    }
}


?>


<body>


    <main class="container">
    <h1>Contact me</h1>
    <section>

    <!-- status message -->
    <?php if($msg !=''): ?>
        <div class="alert <?php echo $msgClass; ?>">
        <?php echo $msg; ?></div>
    <?php endif; ?>

    <form action="<?php echo $_SERVER["PHP_SELF"]?>" method="post" class="form-group">
        <input type="text" value="<?php echo isset($_POST["contactName"]) ? $name : ""; ?>" name="contactName" placeholder="Your name" class="form-control"><br>
        <input type="email" value="<?php echo isset($_POST["contactEmail"]) ? $name : ""; ?>" name="contactEmail" placeholder="Your e-mail" class="form-control"><br>
        <textarea name="contactText" value="<?php echo isset($_POST["contactText"]) ? $name : ""; ?>" cols="30" rows="10" class="form-control"></textarea><br>
        <button type="submit" name="contactSubmit" class="btn btn-primary">Login</button>
    </form>
    </section>

    </main>
</body>
<script src="scripts.js"></script>
<?php
require_once 'footer.php';
?>

