from field_description import app

from flask import render_template, redirect, url_for


# Homepage
@app.route('/')
def index():
    return render_template('index.html', page=1)


@app.route('/field-guide/')
def field_guide():
    return render_template('field-pdf.html', page=2, page_name="field-guide")


@app.route('/field-description/')
def field_description():
    return render_template('field-pdf.html', page=3, page_name="field-description")


@app.errorhandler(404)
def page_not_found():
    return redirect(url_for("index"))


@app.errorhandler(500)
def internal_error(error):
    return redirect(url_for("index"))


@app.errorhandler(405)
def internal_error(error):
    return redirect(url_for("index"))
