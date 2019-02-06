// change major qualifing paragraph
$("#select_major_fraction").change(function () {
    var selected = $(this).find(":selected").text();

    // show fine/medium/coarse input
    if (selected == "SILT" || selected == "CLAY" || selected == '') {
        $("#select_behaviour").prop('disabled', true);
        $("#select_grading").prop('disabled', true);

        $("#select_behaviour").val('');
        $("#select_grading").val('');
    } else {
        $("#select_behaviour").prop('disabled', false);
        $("#select_grading").prop('disabled', false);
    }

    if (selected == 'SAND' || selected == 'GRAVEL' || selected == '') {
        $("#select_plasticity").prop('disabled', true);
        $("#select_plasticity").val('');
    } else {
        $("#select_plasticity").prop('disabled', false);
    }


    $("#input_major_fraction").val(selected.toLowerCase())
});

// change qualifing paragraph on change
$("#select_minor_fraction1").change(change_minor);

$("#select_subordinate_fraction").change(function () {
    var selected = $(this).find(":selected").text();

    if (selected == '') {
        $("#input_subordinate_fraction").val('');
    } else if (selected == 'clayey') {
        $("#input_subordinate_fraction").val('clay');
    } else if (selected == 'silty') {
        $("#input_subordinate_fraction").val('silt');
    } else if (selected == 'sandy') {
        $("#input_subordinate_fraction").val('sand');
    } else if (selected == 'gravelly') {
        $("#input_subordinate_fraction").val('gravel');
    }
});

// change minor qualifing paragraph
function change_minor() {
    var minor_fraction1 = $('#select_minor_fraction1').val();
    $("#input_minor_fraction").val(minor_fraction1.toLowerCase())
};

// function to update textarea
function update() {
    var output = parser()
    $('#output').val(output)
};

// calls function to update text on form change
$('.form-control', '#div_paragraph').change(function () {
    update()
});

// recalc button update
$("#recalc").click(function () {
    update()
});

// function to clear form
function clear_form() {
    // removes all values from form
    $('.form-control', '#div_paragraph').val('');

    // resets fields to disabled
    $("#select_behaviour").prop('disabled', true)
    $("#select_grading").prop('disabled', true)
    $("#select_plasticity").prop('disabled', true)

    change_strength()
    $("#output").val('')
};

// function to clear form
function reset_form() {
    $("#detailsForm").validate().resetForm()
    $("#detailsForm").validate().reset()
    
    sessionStorage.setItem('maxdepth', '0')
    depth_to_update()
    depth_from_update()

    $('.form-control', '#div_details').val('');
    $("#site_name").prop('readonly', false)

    $("#depth_from").val('0.00').attr('placeholder', '0.00')
    $("#depth_to").val('').attr('placeholder', '0.50')
    $("#auger_name").val('').attr('placeholder', 'Auger 1')
    $("#output").val('')
}

// recalc button update
$("#clear").click(function () {
    clear_form()
});

// reset button update
$("#reset").click(function () {
    clear_form()
    reset_form()
});

// change Strength box
function change_strength() {
    var cohesiveOptions = {
        "": "",
        "Very soft": "Very soft",
        "Soft": "Soft",
        "Firm": "Firm",
        "Very stiff": "Very stiff",
        "Hard": "Hard"
    };

    var noncohesiveOptions = {
        "": "",
        "Very dense": "Very dense",
        "Dense": "Dense",
        "Medium dense": "Medium dense",
        "Loose": "Loose",
        "Very loose": "Very loose"
    };

    var selected = $("#select_major_fraction").find(":selected").text();
    var $el = $("#select_strength1");
    $el.empty(); // remove old options

    if (selected == '') {
        var options = {
            "": ""
        }

        $("#info_strength").hide()
        $('#strength-collapse').collapse("hide")
        $('#strength2-collapse').collapse("hide")
    } else {
        if (selected == "SILT" || selected == "CLAY") {
            var options = cohesiveOptions
            $('#info_strength_collapse').attr('data-target', '#strength-collapse');

            if ($("#strength2-collapse").hasClass('show')) {
                $('#strength2-collapse').collapse("hide")
            }
        } else {
            var options = noncohesiveOptions
            $('#info_strength_collapse').attr('data-target', '#strength2-collapse');

            if ($("#strength-collapse").hasClass('show')) {
                $('#strength-collapse').collapse("hide")
            }
        }

        $("#info_strength").show()
    }

    $.each(options, function (key, value) {
        $el.append($("<option></option>").attr("value", value).text(key));
    });

};

$("#select_major_fraction").change(change_strength);

// disable newline in text area
$("textarea").keydown(function (e) {
    // Enter was pressed without shift key
    if (e.keyCode == 13 && !e.shiftKey) {
        // prevent default behavior
        e.preventDefault();
    }
});

function update_table(from, to, description) {
    // remove placeholder row if exists
    if ($("#tr-placeholder").length != 0) {
        $("#tr-placeholder").remove()
    }

    var fdepth_from = Number(from).toFixed(2)
    var fdepth_to = Number(to).toFixed(2)

    var depth = `${fdepth_from} - ${fdepth_to}`

    $('#auger_log_table').append(`<tr><td>${depth}</td><td>${description}</td></tr>`);
}

function maxdepth_update(depth) {
    var maxdepth = Number(sessionStorage.getItem("maxdepth"))
    var depthN = Number(depth)

    if (depthN > maxdepth) {
        sessionStorage.setItem('maxdepth', depth)
        return true
    } else {
        return false
    }
}

$(document).ready(function () {
    sessionStorage.setItem('maxdepth', '0')

    // Reset form on refresh
    $("#detailsForm").trigger("reset");

    // initiate form validation
    $('#detailsForm').validate({
        errorClass: 'is-invalid',

        rules: {
            depth_from: {
                required: true,
                number: true,
                range: [0, 0]
            },
            depth_to: {
                required: true,
                number: true,
                min: 0
            },
            auger_name: {
                required: true,
            },
            select_major_fraction: {
                required: true,
            },
        },

        messages: {
            depth_from: {
                range: "Value must be equal to {0}."
            }
        },

        errorPlacement: function (error, element) {
            error.addClass("invalid-feedback"); // add invalid class
            error.insertAfter(element)
        },

        submitHandler: function (form) {
            var depth_from = $('#depth_from').val()
            var depth_to = $('#depth_to').val()
            var description = $('#output').val()

            clear_form()

            maxdepth_update(depth_to);
            update_table(depth_from, depth_to, description)

            depth_from_update()
            depth_to_update()

            $("#depth_to").val('').attr('placeholder', '')
            $("#depth_from").val(depth_to).attr('placeholder', '')
            $("#auger_name").attr('placeholder', '')
            $("#site_name").prop('readonly', true)
            return false;
        }
    });
});

$("#depth_to").change(depth_to_update);
$("#depth_from").change(depth_from_update);


// functions to update validation rules on change
function depth_to_update() {
    $("#depth_to").rules('remove')

    var add = {
        required: true,
        number: true,
        min: Number(sessionStorage.getItem("maxdepth"))
    }

    $("#depth_to").rules('add', add)
}

function depth_from_update() {
    $("#depth_from").rules('remove')

    var max = sessionStorage.getItem("maxdepth")

    var add = {
        required: true,
        number: true,
        range: [max, max]
    }

    $("#depth_from").rules('add', add)
}

// force number input boxes to display 2dp
$('#depth_from, #depth_to').blur(function () {
    var num = parseFloat($(this).val());
    if ($.isNumeric(num)) {
        var cleanNum = num.toFixed(2);
        $(this).val(cleanNum);
    }
});