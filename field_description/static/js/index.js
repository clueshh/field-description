$("#select_major_fraction").change(function () {
    var selected = $(this).find(":selected").text();

    if (selected == "SILT" || selected == "CLAY") {
        $("#select_behaviour").hide();
        $("#select_behaviour").val('');
    } else {
        $("#select_behaviour").show();
    }
});