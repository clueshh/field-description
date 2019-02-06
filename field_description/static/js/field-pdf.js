$(document).ready(function () {
    var file = $('#pdf_container').attr('data-pdf');
    var args = "#toolbar=0&navpanes=0&scrollbar=0";

    if (file == "field-guide") {
        name = "Field-guide-sheet-description-of-soil-and-rock-2005.pdf" + args;
    } else {
        name = "NZGS-2005-Field-description-of-soil-and-rock.pdf" + args;
    }

    PDFObject.embed("../static/pdf/" + name, "#pdf_container")
    pdfHeight()
});

$(window).resize(function() {
    pdfHeight()
});

function pdfHeight() {
    var navheight = $('.navbar').outerHeight()
    var viewportHeight = $(window).height();

    var pdfHeight = viewportHeight-navheight

    $('.pdfobject-container').css("height", pdfHeight)
}