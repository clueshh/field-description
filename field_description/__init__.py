from flask import Flask

# Initiate Flask
app = Flask(__name__)
app.config.from_object('config.ProductionConfig')

import field_description.views

