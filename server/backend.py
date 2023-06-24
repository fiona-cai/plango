from flask import Flask
from getLocations import returnPlaces
app = Flask(__name__)


@app.route('/')
def hello_world():
    data = returnPlaces('Toronto')
    print(data)
    return 'Hello, World!'

if __name__ == '__main__':
    app.run()