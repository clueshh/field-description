// change major qualifing paragraph
$("#select_major_fraction").change(function () {
    var selected = $(this).find(":selected").text();

    // show fine/medium/coarse input
    if (selected == "SILT" || selected == "CLAY" || selected == '') {
        $("#form_behaviour").hide();
        $("#select_behaviour").val('');
    } else {
        $("#form_behaviour").show();
    }

    $("#input_major_fraction").val(selected.toLowerCase())
});

// enable additional minor fraction box
$("#select_minor_fraction1").change(function () {
    var selected = $(this).find(":selected").text();

    if (selected != '') {
        $("#select_minor_fraction2").prop("disabled", false);
    } else {
        $("#select_minor_fraction2").val('')
        $("#select_minor_fraction2").prop("disabled", true);
    }
});

// change qualifing paragraph on change
$("#select_minor_fraction1, #select_minor_fraction2").change(change_minor);

// change minor qualifing paragraph
function change_minor() {
    var minor_fraction1 = $('#select_minor_fraction1').find(":selected").text();
    var minor_fraction2 = $('#select_minor_fraction2').find(":selected").text();

    if (minor_fraction1 == '' && minor_fraction2 == '') {
        var minor_val = ''
    } else if (minor_fraction1 != '' && minor_fraction2 != '') {
        var minor_val = minor_fraction1 + " and " + minor_fraction2
    } else if (minor_fraction1 != '') {
        var minor_val = minor_fraction1
    } else if (minor_fraction2 != '') {
        var minor_val = minor_fraction2
    }

    $("#input_minor_fraction").val(minor_val)
};

// changes plus to minus
$("#minor_fraction_plus").click(function () {
    var list = $(this).attr("class").split(' ')

    if ($.inArray("fa-minus", list) !== -1) {
        $("#select_minor_fraction2").val('')
        change_minor()
    }

    $(this).toggleClass('fa-plus fa-minus')
});
