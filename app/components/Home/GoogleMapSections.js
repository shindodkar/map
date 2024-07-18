'use client'
import React, { useEffect, useState } from 'react'
import { DirectionsRenderer, GoogleMap, MarkerF, OverlayView, useJsApiLoader } from '@react-google-maps/api';
import { useSourceContext } from '../../context/SourceContext';
import { useDestinationContext } from '../../context/DestinationContext';

const GoogleMapsSection = () => {

  const {source}=useSourceContext();
  const {destination}=useDestinationContext();

  const containerStyle = {
    width: '100%',
    height: '800px'
  };


  const [center,setCenter]=useState({
    lat:19.456360,
    lng:72.792458
  })
 

  useEffect(()=>{
    if(source?.length!=[]&& map){
     
      setCenter({
        lat:source?.lat,
        lng:source?.lng
      })
      map.panTo(center)
    }

    if(source?.length!=[]&&destination?.length!=[]){
      directionRoute()
    }
  },[source])

  useEffect(()=>{
    if(destination?.length!=[]&& map){
      setCenter({
        lat:destination?.lat,
        lng:destination?.lng
      })

      map.panTo(center)
    }

    if(source?.length!=[]&&destination?.length!=[]){
      directionRoute()
    }
  },[destination])




  const [directionRoutePoints,setDirectionRoutePoints]=useState(null)


  const directionRoute=()=>{
    if(map){
      const directionsService=new window.google.maps.DirectionsService();
      const directionsRenderer=new window.google.maps.DirectionsRenderer();

      directionsService.route({
        origin:{
          lat:source?.lat,
          lng:source?.lng
        },
        destination:{
          lat:destination?.lat,
          lng:destination?.lng
        },
        travelMode:window.google.maps.TravelMode.DRIVING
      },(response,status)=>{
        if(status==='OK'){
          directionsRenderer.setDirections(response)
          setDirectionRoutePoints(response)
        }else{
          console.log('directions failed due to ',status)
        }
      })
    }
  }

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {

    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return  (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={11}
        onLoad={onLoad}
        onUnmount={onUnmount}
    
      >

{
  source &&
  source.length!=[]&&
  <MarkerF
  position={{
    lat: source.lat,
    lng: source.lng
  }}
  icon={{
    url:'/source.png',
    scaledSize:new window.google.maps.Size(40,40)
  }}

  
  >
    <OverlayView
    position={{
      lat:source.lat,
      lng:source.lng
    }}
    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <div className='text-black font-bold p-2'>
        {source.label}
      </div>
    </OverlayView>
  </MarkerF>


}

{
  destination &&
  destination.length!=[]&&
  <MarkerF
  position={{
    lat: destination.lat,
    lng: destination.lng
  }}


  icon={{
    url:'/destination.png',
    scaledSize:new window.google.maps.Size(40,40)
  }}

  
  >

    <OverlayView
    position={{
      lat:destination.lat,
      lng:destination.lng
    }}
    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <div className='text-black font-bold p-2'>
        {destination.label}
      </div>
    </OverlayView>
    

  </MarkerF>
}
        
        <></>

        <DirectionsRenderer  directions={directionRoutePoints} 
          

          

          options={{
            suppressMarkers:true,
            
            polylineOptions:{
              strokeColor:'#000'
            }
          }}


        />
      </GoogleMap>
  )
}

export default GoogleMapsSection
