// App.js

import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
// import { googleMapKey } from '@/general/keys';
import { useSelector } from 'react-redux';

const containerStyle = {
    width: '100%',
    height: '400px',
};

// const center = {
//     lat: 40.748817,
//     lng: -73.985428, // Example: Coordinates for New York City (Empire State Building)
// };

const MapLocator = () => {
    const { cart } = useSelector((state) => state.cart);
    const { pickupLocation } = cart
    const [center, setCenter] = useState({ lat: null, lng: null })
    const [selected, setSelected] = useState(null);
    const googleMapKey = import.meta.env.VITE_googleMapKey
    useEffect(() => {
        setCenter({ lat: Number(pickupLocation.latitude), lng: Number(pickupLocation.longitude) })
    }, [pickupLocation?.locationCode]);

    return (
        <div className="w-full h-full object-cover bg-right-top">
            <LoadScript googleMapsApiKey={googleMapKey}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={12}
                >
                    {/* Marker for the Empire State Building */}
                    <Marker
                        position={center}
                        onClick={() => setSelected(center)} // When clicked, show info window
                    />

                    {selected ? (
                        <InfoWindow
                            position={selected}
                            onCloseClick={() => setSelected(null)}
                        >
                            <div>
                                <h2>{pickupLocation?.locationName || ''}</h2>
                                {/* <p>New York City, USA</p> */}
                            </div>
                        </InfoWindow>
                    ) : null}
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default MapLocator;










// import React from 'react'
// import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'

// const containerStyle = {
//     width: '400px',
//     height: '400px',
// }

// const center = {
//     lat: -3.745,
//     lng: -38.523,
// }

// function MyComponent() {
//     const { isLoaded } = useJsApiLoader({
//         id: 'google-map-script',
//         googleMapsApiKey: 'AIzaSyDFaPREVyRmq9U-smU4YZIriU6nSzIwh4E',
//     })

//     const [map, setMap] = React.useState(null)

//     const onLoad = React.useCallback(function callback(map) {
//         // This is just an example of getting and using the map instance!!! don't just blindly copy!
//         const bounds = new window.google.maps.LatLngBounds(center)
//         map.fitBounds(bounds)

//         setMap(map)
//     }, [])

//     const onUnmount = React.useCallback(function callback(map) {
//         setMap(null)
//     }, [])

//     return isLoaded ? (
//         <GoogleMap
//             mapContainerStyle={containerStyle}
//             center={center}
//             zoom={10}
//             // onLoad={onLoad}
//             // onUnmount={onUnmount}
//         >
//             {/* Child components, such as markers, info windows, etc. */}
//             <></>
//         </GoogleMap>
//     ) : (
//         <></>
//     )
// }

// export default MyComponent


{/* <GoogleMap
  onLoad={(map) => {
    const bounds = new window.google.maps.LatLngBounds()
    map.fitBounds(bounds)
  }}
  onUnmount={(map) => {
    // do your stuff before map is unmounted
  }}
/> */}