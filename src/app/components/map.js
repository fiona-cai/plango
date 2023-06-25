import React from 'react';
import './css/map.css';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
const startLocation = [5.1107969, 52.0700474];

const Map = ({ responses }) => {
    useEffect(() => {
        const url = `/dest/${responses[1]}/${5}/${responses[3]}`;
        axios({
            method: 'get',
            url: url,
        })
            .then((response) => {
                console.log(response);
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [responses]);

    useEffect(() => {
        console.log(data);
    }, [data]);
    assembleQueryURL = () => {
        // Store the location of the truck in a constant called coordinates
        const coordinates = [startLocation, [5.109492, 52.0761757], [5.1164711, 52.0739468], [5.1226603, 52.0825339], [5.1193458, 52.0661634], [5.1051998, 52.0663328]];

        // Set the profile to `driving`
        // Coordinates will include the current location of the truck,
        return `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${coordinates.join(
            ';'
        )}?overview=full&steps=true&geometries=geojson&source=first&access_token=${mapboxgl.accessToken
            }`;
    }


    componentDidMount() {

        fetch(this.assembleQueryURL())
            .then(response => response.json())
            .then(data => {
                // Creates new map instance
                const map = new mapboxgl.Map({
                    container: this.mapWrapper,
                    style: 'mapbox://styles/mapbox/dark-v11',
                    center: [5.104480, 52.092876],
                    zoom: 15
                });

                // Creates new directions control instance
                const directions = new MapboxDirections({
                    accessToken: mapboxgl.accessToken,
                    unit: 'metric',
                    profile: 'mapbox/driving',

                });

                // Integrates directions control with map
                map.addControl(new mapboxgl.NavigationControl(), 'top-right');
                map.addControl(directions, 'top-left');
                map.on('load', async () => {
                    const marker = document.createElement('div');
                    marker.classList = 'truck';

                    // Create a new marker
                    new mapboxgl.Marker(marker).setLngLat(startLocation).addTo(map);
                    directions.setOrigin(startLocation);
                    for (let i = 0; i < data.waypoints.length; i++) {
                        let waypoint = data.waypoints[i];
                        const storeMarker = document.createElement('div');
                        storeMarker.classList = 'store';
                        new mapboxgl.Marker(storeMarker).setLngLat(waypoint.location).addTo(map);
                        directions.addWaypoint(waypoint.waypoint_index, waypoint.location);
                    }
                    directions.setDestination(startLocation);
                    map.addSource('earthquakes', {
                        type: 'geojson',
                        // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
                        // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
                        data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
                        cluster: true,
                        clusterMaxZoom: 14, // Max zoom to cluster points on
                        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
                    });
                    map.addLayer({
                        id: 'clusters',
                        type: 'circle',
                        source: 'earthquakes',
                        filter: ['has', 'point_count'],
                        paint: {
                            // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
                            'circle-color': [
                                'step',
                                ['get', 'point_count'],
                                '#51bbd6',
                                100,
                                '#f1f075',
                                750,
                                '#f28cb1'
                            ],
                            'circle-radius': [
                                'step',
                                ['get', 'point_count'],
                                20,
                                100,
                                30,
                                750,
                                40
                            ]
                        }
                    });
                });



            });
    } );

    render() {
        return (
            <div>
                <div className='sidebarStyle'>
                    <div>
                        long lat zoom woo
                    </div>
                </div>
                <div ref={el => (this.mapWrapper = el)} className=" container mapWrapper" />
            </div>
        );
    }
}

export default Map;