function sentenceCase(str) {
    return str.replace(/[a-z]/i, function (letter) {
        return letter.toUpperCase();
    }).trim();
}

function sentenceCase2(str){
	var str = str.toLowerCase().replace(/\si\s/g, ' I ');
	str = str.charAt(0).toUpperCase() + str.slice(1);
	return str
}

// main parser for output string
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
                section2.push(minor_fraction1.toLowerCase())
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

        // join lists into sentence
        var outputa = sentence_main_paragraph(section1, section2, section3, section3a, section4);
        var outputb = sentence_qualifying_paragraph(major_fraction);
        var output = outputa + ' ' + outputb

    } else {
        var output = ''
    }

    sentence_qualifying_paragraph()
    return sentenceCase(output)
};

function sentence_main_paragraph(section1, section2, section3, section3a, section4) {
    // joiner
    var jsection1 = section1.join(' ');
    var jsection2 = section2.join(' ');
    if (section3.length && section3a.length) {
        var jsection3 = section3.join(' ') + ', ' + section3a.join(' ');
    }
    else {
        var jsection3 = section3.join(' ');
    }
    var jsection4 = section4.join(' ');

    // compiler - ifs through each possibility
    if (section2.length) {
        if (section3.length) {
            if (section4.length) {
                var output = jsection1 + ' ' + jsection2 + "; " + jsection3 + ', ' + jsection4 + ".";
            }
            else {
                var output = jsection1 + ' ' + jsection2 + "; " + jsection3 + ".";
            }
        }
        else if (section4.length) {
            var output = jsection1 + ' ' + jsection2 + "; " + jsection4 + ".";
        }
        else {
            var output = jsection1 + ' ' + jsection2 + ".";
        }
    }
    else if (section3.length) {
        if (section4.length) {
            var output = jsection1 + '; ' + jsection3 + ', ' + jsection4 + ".";
        }
        else {
            var output = jsection1 + '; ' + jsection3 + ".";
        }
    }
    else if (section4.length) {
        var output = jsection1 + '; ' + jsection4 + ".";
    }
    else {
        var output = jsection1 + ".";
    }
    return output;
};


function sentence_qualifying_paragraph(major_fraction) {
    var strength = $("#select_strength1").find(":selected").text();
    var moisture = $("#select_moisture").find(":selected").text();
    var grading = $("#select_grading").find(":selected").text();
    var bedding1 = $("#select_bedding1").find(":selected").text();
    var bedding2 = $("#select_bedding2").find(":selected").text();
    var plasticity = $("#select_plasticity").find(":selected").text();
    var sensitivity = $("#select_sensitivity").find(":selected").text();
    // ---------------------------------------------------------
    var qmajor_fraction1 = $("#input_major_fraction").val();
    var qmajor_fraction2 = $("#area_major_fraction").val()

    var qsubordinate_fraction1 = $("#input_subordinate_fraction").val()
    var qsubordinate_fraction2 = $("#area_subordinate_fraction").val()

    var qminor_fraction1 = $("#input_minor_fraction").val()
    var qminor_fraction2 = $("#area_minor_fraction").val()

    var additional_structures = $("#additional_structures").val()
    var additional_info = $("#additional_info").val()
    // ---------------------------------------------------------

    if (bedding1 && bedding2){
        var bedding = `bedding, ${bedding1}, ${bedding2}`
    } else {
        var bedding = ''
    }

    if (qmajor_fraction1 && qmajor_fraction2){
        var qmajor_fraction = `${qmajor_fraction2} ${qmajor_fraction1}`
    } else {
        var qmajor_fraction = ''
    }

    if (qsubordinate_fraction1 && qsubordinate_fraction2){
        var qsubordinate_fraction = `${qsubordinate_fraction1}, ${qsubordinate_fraction2}`
    } else {
        var qsubordinate_fraction = ''
    }

    if (qminor_fraction1 && qminor_fraction2){
        var qminor_fraction = `${qminor_fraction1}, ${qminor_fraction2}`
    } else {
        var qminor_fraction = ''
    }

    if (additional_info){
        additional_info = "(" + additional_info.toUpperCase() + ")"
    }

    if (major_fraction == 'SAND' || major_fraction == 'GRAVEL'){
        punct = '; '
    } else {
        punct = ', '
    }

    // ---------------------------------------------------------
    var list = [strength, moisture, grading, bedding, plasticity, sensitivity, qmajor_fraction, qsubordinate_fraction, qminor_fraction, additional_structures]
    var section = []

    for (var i in list) {
        var val = list[i]

        if (val){
            section.push(list[i])
        }
    }

    if (section.length) {
        var join = sentenceCase2(section.join(punct))
        if (additional_info){
            return join + ' ' + additional_info + '.'
        } else{
            return join + '.'
        }
        
    } else {
        return ''
    }
    
};
