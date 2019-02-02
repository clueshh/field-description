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

// change qualifing paragraph on change
$("#select_minor_fraction1").change(change_minor);

// change minor qualifing paragraph
function change_minor() {
    var minor_fraction1 = $('#select_minor_fraction1').val();
    $("#input_minor_fraction").val(minor_fraction1)
};

// function to update textarea
function update() {
    var output = parser()
    $('#output').val(output)
};

// calls function to update text on form change
$(".form-control").change(function () {
    if ($(this).attr('id') != "output"){
        update()
    }
});

// recalc button update
$("#recalc").click(function(){
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