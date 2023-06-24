from flask import Flask, jsonify
from getLocations import returnPlaces

app = Flask(__name__)
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
app.config['DEBUG'] = True


@app.route('/')
def index():
    return 'Hello, World!'


@app.route('/dest/<city>/<limit>/<radius>')
@app.route('/dest/<city>/<limit>/', defaults={'radius': 30})
def destinations(city: str, limit: int, radius: int):
    print(f'city: {city}, limit: {limit}, radius: {radius}')
    data = returnPlaces(city, radius, limit)
    return jsonify(data)


if __name__ == '__main__':
    app.run()
