$(document).ready(function () {
    var file = $('#pdf_container').attr('data-pdf');

    if (file == "field-guide") {
        name = "Field-guide-sheet-description-of-soil-and-rock-2005.pdf";
    } else {
        name = "NZGS-2005-Field-description-of-soil-and-rock.pdf";
    }

    PDFObject.embed("../static/pdf/" + name, "#pdf_container")
});