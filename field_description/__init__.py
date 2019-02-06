from flask import Flask
from flask_sslify import SSLify

# Initiate Flask
app = Flask(__name__)
sslify = SSLify(app)
app.config.from_object('config.ProductionConfig')

import field_description.views

