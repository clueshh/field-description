import os
from field_description.db_uri import db_uri


class Config(object):
    # FLASK
    DEBUG = True
    DEVELOPMENT = True
    SECRET_KEY = '3c6c27fda7530863e665aad0e5329537722a8a292d3970f6'
    SQLALCHEMY_DATABASE_URI = db_uri(section='postgresql')
    SQLALCHEMY_TRACK_MODIFICATIONS = False  # silence the deprecation warning


class ProductionConfig(Config):
    DEVELOPMENT = False
    DEBUG = False


class HerokuConfig(ProductionConfig):
    try:
        SQLALCHEMY_DATABASE_URI = os.environ['DATABASE_URL']
    except KeyError:
        pass
