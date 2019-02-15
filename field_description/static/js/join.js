$(document).ready(function () {

    //==============___ Validator and Ajax Sender___================
    $("#joinForm").submit(function (e) {
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
                url: "/join/",
                data: {
                    "name": $("#name").val(),
                    "email": $("#email").val(),
                    "password": $("#password").val(),
                },
                dataType: "json",
                success: function (data) {
                    if (data.response == "email already exists") {
                        $("#email").addClass("is-invalid");
                        var errmsg = '<label id="email-error" class="is-invalid invalid-feedback" for="email">Email already exists.</label>'
                        $(errmsg).insertAfter("#email");
                    } else {
                        var url = window.location.origin
                        window.location.replace(url);
                    }
                }

            });
        }
    });


});