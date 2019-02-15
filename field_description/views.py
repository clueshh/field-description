from field_description import app, db, login
import json
from flask import render_template, redirect, url_for, request
from flask_login import current_user, login_user, logout_user, login_required


@login.user_loader
def load_user(user_id):
    from field_description.models import User
    return User.query.get(int(user_id))


# Homepage
@app.route('/')
@login_required
def index():
    user = current_user.uname()
    return render_template('index.html', page=1, name=user)


@app.route('/field-guide/')
@login_required
def field_guide():
    user = current_user.uname()
    return render_template('field-pdf.html', page=2, page_name="field-guide", name=user)


@app.route('/field-description/')
@login_required
def field_description():
    user = current_user.uname()
    return render_template('field-pdf.html', page=3, page_name="field-description", name=user)


@app.route("/login/", methods=["GET", "POST"])
def login():
    from field_description.models import User
    if request.method == "POST":
        email = request.form['email']
        password = request.form['password']

        user = User.query.filter_by(email=email).first()

        if user is None:
            return json.dumps({'response': 'email doesnt exist'}), 200, {'ContentType': 'application/json'}
        elif not user.check_password(password):
            return json.dumps({'response': 'incorrect password'}), 200, {'ContentType': 'application/json'}
        else:
            login_user(user)
            return json.dumps({'response': 'success'}), 200, {'ContentType': 'application/json'}

    elif request.method == 'GET':
        if current_user.is_authenticated:
            return redirect(url_for('index'))
        else:
            return render_template('login.html')


@app.route('/join/', methods=["GET", "POST"])
def join():
    from field_description.models import User
    if request.method == "POST":
        name = request.form['name']
        email = request.form['email']
        password = request.form['password']

        emailexists = db.session.query(User.email).filter_by(email=email).scalar() is not None

        if not emailexists:
            user = User(name, email, password)
            db.session.add(user)
            db.session.commit()
            login_user(user)

            return json.dumps({'response': 'success'}), 200, {'ContentType': 'application/json'}
        else:
            return json.dumps({'response': 'email already exists'}), 200, {'ContentType': 'application/json'}

    elif request.method == 'GET':
        if current_user.is_authenticated:
            return redirect(url_for('index'))
        else:
            return render_template('join.html')


@app.route('/logout/', methods=["GET"])
@login_required
def logout():
    user = current_user
    user.authenticated = False
    db.session.add(user)
    db.session.commit()
    logout_user()
    return redirect(url_for('login'))


@app.errorhandler(404)
def page_not_found():
    return redirect(url_for("index"))


@app.errorhandler(401)
def page_not_found():
    return redirect(url_for("login"))


@app.errorhandler(500)
def internal_error(error):
    return redirect(url_for("index"))


@app.errorhandler(405)
def internal_error(error):
    return redirect(url_for("index"))


@app.cli.command('resetdb')
def resetdb_command():
    # FLASK_APP=application.py flask resetdb

    from field_description.models import User, Sites, Augers, Logs

    # if database_exists(DB_URL):
    print('Deleting tables.')
    db.drop_all()

    print('Creating tables.')
    db.create_all()
    print('Shiny!')
