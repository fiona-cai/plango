import requests
import os
url = 'https://api.opentripmap.com/0.1/en/places/'


def callApi(method, query=''):
    apikey = os.getenv('OPEN_TRIP_MAP_API_KEY')
    response = requests.get(f'{url}{method}?apikey={apikey}&{query}')
    return response.json()

def getLocationData(location):
    data = callApi('geoname', f'name={location}')
    return data

def getNearbyPlaces(lat, lon, radius, limit, rate=3, kinds='interesting_places'):
    data = callApi('radius', f'radius={radius}&lon={lon}&lat={lat}&limit={limit}&rate={rate}&kinds={kinds}')
    return data


def returnPlaces(location):
    data = getLocationData(location)
    lat = data['lat']
    lon = data['lon']
    radius = 30000
    limit = 10
    return getNearbyPlaces(lat, lon, radius, limit)
