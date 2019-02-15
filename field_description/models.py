from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from field_description import db


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64))
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))

    def __repr__(self):
        return '<User {}>'.format(self.name)

    def __init__(self, name, email, password):
        self.name = name,
        self.email = email,
        self.set_password(password)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def uname(self):
        return self.name


class Sites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(140))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    def __repr__(self):
        return '<Site {}>'.format(self.body)


class Augers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(140))
    site_id = db.Column(db.Integer, db.ForeignKey('sites.id'))

    def __repr__(self):
        return '<Auger {}>'.format(self.body)


class Logs(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    depth_from = db.Column(db.Numeric(precision=2, asdecimal=False, decimal_return_scale=None))
    depth_to = db.Column(db.Numeric(precision=2, asdecimal=False, decimal_return_scale=None))
    description = db.Column(db.String(140))
    auger_id = db.Column(db.Integer, db.ForeignKey('augers.id'))

    def __repr__(self):
        return '<Log {}>'.format(self.body)

