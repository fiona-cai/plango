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

def getNearbyPlaces(lat, lon, radius, limit, kinds='interesting_places', rate=3):
    radius = int(radius) * 1000
    data = callApi('radius', f'radius={radius}&lon={lon}&lat={lat}&limit={limit}&rate={rate}&kinds={kinds}')
    return data


kinds_values = [
    'adult',
    'amusements',
    'erotic_shops',
]


def returnPlaces(location: str, radius: int, limit: int, kinds_str: str):
    """
    :param location: city (e.g. Toronto)
    :param radius: the radius in km to search for places
    :param limit: the number of places to return
    :return: a list of places
    """
    print("HI")
    data = getLocationData(location)
    lat, lon = data['lat'], data['lon']
    kinds = ','.join([kinds_values[int(i)] for i in kinds_str.split(',')])
    kinds = kinds if kinds else 'interesting_places'
    print(kinds)
    return getNearbyPlaces(lat, lon, radius, limit, kinds)
