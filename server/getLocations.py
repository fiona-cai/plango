import requests
import os
url = 'https://api.opentripmap.com/0.1/en/places/'


def callApi(method, query=''):
    apikey = os.getenv('OPEN_TRIP_MAP_API_KEY')
    REQ_URL = f'{url}{method}?apikey={apikey}&{query}'
    print(REQ_URL)
    response = requests.get(REQ_URL)
    return response.json()

def getLocationData(location):
    data = callApi('geoname', f'name={location}')
    return data

def getNearbyPlaces(lat, lon, radius, limit, rate=3, kinds='interesting_places'):
    radius = int(radius) * 1000
    data = callApi('radius', f'radius={radius}&lon={lon}&lat={lat}&limit={limit}&rate={rate}&kinds={kinds}')
    return data


def returnPlaces(location: str, radius: int, limit: int):
    """
    :param location: city (e.g. Toronto)
    :param radius: the radius in km to search for places
    :param limit: the number of places to return
    :return: a list of places
    """
    data = getLocationData(location)
    lat, lon = data['lat'], data['lon']
    return getNearbyPlaces(lat, lon, radius, limit)
