from flask import Flask
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

con = mysql.connector.connect(
    host='localhost',
    user='root',
    password='',
    database='db_cinematic'
)

from app_flask import route
