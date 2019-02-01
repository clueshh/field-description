# buildings-team

Internal company website for the purpose of managing & keeping track of projects.

## Installation

```bash
pip install -r requirements.txt
```

## Usage

Edit *database.ini* file with the credentials of your database

```bash
[postgresql]
host=localhost
database=buildings-team
user=postgres
password=admin
```

Update *config.py* if required

Initialise the database by running...

```bash
FLASK_APP=FlaskWeb.py flask resetdb
```

To serve the website run

```bash
python waitress_server.py
```
