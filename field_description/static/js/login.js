$(document).ready(function () {

    //==============___ Validator and Ajax Sender___================
    $("#loginForm").submit(function (e) {
        e.preventDefault();
    }).validate({
        errorClass: 'is-invalid',

        errorPlacement: function (error, element) {
            error.addClass("invalid-feedback"); // add invalid class
            error.insertAfter(element)
        },

        submitHandler: function (form) {
            $.ajax({
                type: "POST",
                url: "/login/",
                data: {
                    "email": $("#email").val(),
                    "password": $("#password").val(),
                },
                dataType: "json",
                success: function (data) {
                    if (data.response == "email doesnt exist") {
                        if ($("#email-error").length ) {
                            $("#email").addClass("is-invalid");
                            $("#email-error").text("Email doesnt exist.")
                            $("#email-error").show()
                        } else{
                            $("#email").addClass("is-invalid");
                            var errmsg = '<label id="email-error" class="is-invalid invalid-feedback" for="email">Email doesnt exist.</label>'
                            $(errmsg).insertAfter("#email");
                        }
                    } else if (data.response == "incorrect password") {
                        if ($("#password-error").length ) {
                            $("#password").addClass("is-invalid");
                            $("#password-error").text("Incorrect Password.")
                            $("#password-error").show()
                        } else {
                            $("#password").addClass("is-invalid");
                            var errmsg = '<label id="password-error" class="is-invalid invalid-feedback" for="password">Incorrect Password.</label>'
                            $(errmsg).insertAfter("#password");
                        }
                    } else {
                        var url = window.location.origin
                        window.location.replace(url);
                    }
                }

            });
        }
    });


});