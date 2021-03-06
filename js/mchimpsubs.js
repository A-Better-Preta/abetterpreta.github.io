$(document).ready(function () {
    ajaxMailChimpForm($(".mailchimp-subscribe"), $(".mchimp-sucmessage"));
    // Turn the given MailChimp form into an ajax version of it.
    // If resultElement is given, the subscribe result is set as html to
    // that element.
    function ajaxMailChimpForm($form, $resultElement) {
        // Hijack the submission. We'll submit the form manually.
        $form.submit(function (e) {
            e.preventDefault();
            if (!isValidEmail($form)) {
                var error = "A valid email address must be provided.";
                $resultElement.html(error).fadeOut(3000);
                $resultElement.css("color", "red");
            } else {
                $resultElement.css("color", "black");
                $resultElement.html("Subscribing...").fadeOut(3000);
                submitSubscribeForm($form, $resultElement);
            }
        });
    }
    // Validate the email address in the form
    function isValidEmail($form) {
        // If email is empty, show error message.
        // contains just one @
        var email = $form.find("input[type='email']").val();
        if (!email || !email.length) {
            return false;
        } else if (email.indexOf("@") == -1) {
            return false;
        }
        return true;
    }
    // Submit the form with an ajax/jsonp request.
    // Based on http://stackoverflow.com/a/15120409/215821
    function submitSubscribeForm($form, $resultElement) {
        $.ajax({
            type: "POST",
            url: "https://abetterpreta.us4.list-manage.com/subscribe/post-json?u=6d9e6a4c1ef1a68764c7abc71&id=0f2b13b4e3&c=?",
            data: $form.serialize(),
            cache: false,
            dataType: "jsonp",
            jsonp: "c", // trigger MailChimp to return a JSONP response
            contentType: "application/json; charset=utf-8",
            error: function (resp, text) {
                console.log('mailchimp ajax submit error: ' + text);
            },
            success: function (data) {
                if (data.result != "success") {
                    var message = data.msg || "Sorry. Unable to subscribe. Please try again later.";
                    $resultElement.css("color", "red");
                    if (data.msg && data.msg.indexOf("already subscribed") >= 0) {
                        message = "You're already subscribed. Thank you.";
                        $resultElement.css("color", "black");
                    }
                    $resultElement.html(message);
                } else {
                    $resultElement.css("color", "black");
                    $resultElement.html("Thank you!<br>You must confirm the subscription in your inbox.");
                }
            }
        });
    }
    function submitSubscribeForm2($form, $resultElement) {
        $.ajax({
            type: "POST",
            url: "https://abetterpreta.us4.list-manage.com/subscribe/post-json?u=6d9e6a4c1ef1a68764c7abc71&id=0f2b13b4e3&c=?",
            data: $form.serialize(),
            cache: false,
            dataType: "jsonp",
            jsonp: "c", // trigger MailChimp to return a JSONP response
            contentType: "application/json; charset=utf-8",
            error: function (resp, text) {
                console.log('mailchimp ajax submit error: ' + text);
            },
            success: function (data) {
                if (data.result != "success") {
                    var message = data.msg || "Sorry. Unable to subscribe. Please try again later.";
                    $resultElement.css("color", "red");
                    if (data.msg && data.msg.indexOf("already subscribed") >= 0) {
                        message = "You're already subscribed. Thank you.";
                        $resultElement.css("color", "black");
                    }
                    $resultElement.html(message);
                } else {
                    $resultElement.css("color", "black");
                    $resultElement.html("Thank you!<br>You must confirm the subscription in your inbox.");
                }
            }
        });
    }
});