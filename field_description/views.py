from field_description import app

from flask import render_template, redirect, url_for


# Homepage
@app.route('/')
def index():
    return render_template('index.html')


@app.route('/<string:page_name>/')
def render_static(page_name):
    return render_template('%s.html' % page_name, page_name=page_name)


# @app.route('/guidelines')
# def guidelines():
#     return render_template('guidelines.html')


@app.errorhandler(404)
def page_not_found():
    return redirect(url_for("index"))


@app.errorhandler(500)
def internal_error(error):
    return redirect(url_for("index"))


@app.errorhandler(405)
def internal_error(error):
    return redirect(url_for("index"))
