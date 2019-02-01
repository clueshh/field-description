class Config(object):
    # FLASK
    DEBUG = True
    DEVELOPMENT = True
    SECRET_KEY = '3c6c27fda7530863e665aad0e5329537722a8a292d3970f6'


class ProductionConfig(Config):
    DEVELOPMENT = False
    DEBUG = False
