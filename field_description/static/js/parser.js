function sentenceCase(str) {
    return str.replace(/[a-z]/i, function (letter) {
        return letter.toUpperCase();
    }).trim();
}

// main parser ofr output string
function parser() {
    var subordinate_fraction = $("#select_subordinate_fraction").find(":selected").text();

    var major_fraction = $("#select_major_fraction").find(":selected").text();
    var grain_size = $("#select_behaviour").find(":selected").text();

    var minor_fraction_with = $("#select_minor_fraction_with").find(":selected").text();
    var minor_fraction1 = $("#select_minor_fraction1").val();

    var color1 = $("#select_color1").find(":selected").text();
    var color2 = $("#select_color2").find(":selected").text();
    var color3 = $("#select_color3").find(":selected").text();
    var color4 = $("#select_dist_colour1").find(":selected").text();
    var color5 = $("#select_dist_colour2").find(":selected").text();

    var structure = $("#select_structure").find(":selected").text();
    // ---------------------------------------------------------

    // section 1
    var section1 = []
    var section2 = []
    var section3 = []
    var section3a = []
    var section4 = []

    if (major_fraction) {
        if (subordinate_fraction) {
            section1.push(subordinate_fraction)
        }
        if ((major_fraction == 'SAND' || major_fraction == 'GRAVEL') && grain_size) {
            section1.push(grain_size)
        }

        section1.push(major_fraction)
    }

    if (section1.length) {
        // section 2
        if (minor_fraction1) {

            if (minor_fraction_with) {
                section2.push(minor_fraction_with)
            } else {
                section2.push('with minor')
            }
            if (minor_fraction1) {
                section2.push(minor_fraction1)
            }
        }

        // section 3
        if (color1) {
            section3.push(color1)
        }
        if (color2) {
            section3.push(color2)
        }
        if (color3) {
            section3.push(color3)
        }
        if (color4 && color5){
            section3a.push(color4)
            section3a.push(color5)
        }


        // section 4
        if (structure) {
            section4.push(structure)
        }

        // joiner
        var jsection1 = section1.join(' ')
        var jsection2 = section2.join(' ') 
        if (section3.length && section3a.length){
            var jsection3 = section3.join(' ') + ', ' + section3a.join(' ')
        } else {
            var jsection3 = section3.join(' ')
        }
        var jsection4 = section4.join(' ')

        // compiler
        if (section2.length) {
            if (section3.length) {
                if (section4.length) {
                    var output = jsection1 + ' ' + jsection2 + "; " + jsection3 + ', ' + jsection4 + "."
                } else {
                    var output = jsection1 + ' ' + jsection2 + "; " + jsection3 + "."
                }
            } else if (section4.length) {
                var output = jsection1 + ' ' + jsection2 + "; " + jsection4 + "."
            } else {
                var output = jsection1 + ' ' + jsection2 + "."
            }
        } else if (section3.length) {
            if (section4.length){
                var output = jsection1 + '; ' + jsection3 + ', ' + jsection4 + "."
            } else {
                var output = jsection1 + '; ' + jsection3 + "."
            }
        } else if (section4.length) {
            var output = jsection1 + '; ' + jsection4 + "."
        } else {
            var output = jsection1 + "."
        }

    } else {
        var output = ''
    }

    return sentenceCase(output)
};