from flask import Flask
from flask_sslify import SSLify
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager

# Initiate Flask
app = Flask(__name__)
sslify = SSLify(app)
app.config.from_object('config.HerokuConfig')

# initialize the database connection
db = SQLAlchemy(app)
login = LoginManager(app)
login.login_view = 'login'

import field_description.views

