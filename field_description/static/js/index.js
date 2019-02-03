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
$(".form-control").change(function () {
    if ($(this).attr('id') != "output") {
        update()
    }
});

// recalc button update
$("#recalc").click(function () {
    update()
});

// function to update textarea
function reset() {
    $(".form-control").val('');
};

// recalc button update
$("#reset").click(function () {
    reset()
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
$("textarea").keydown(function(e){
    // Enter was pressed without shift key
    if (e.keyCode == 13 && !e.shiftKey)
    {
        // prevent default behavior
        e.preventDefault();
    }
    });