'use client'
import React from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useState } from 'react';
import { useSourceContext } from '../../context/SourceContext';
import { useDestinationContext } from '../../context/DestinationContext';

const InputItems = ({type}) => {
    const [value, setValue] = useState(null);
    
    const {source,updateSource}=useSourceContext();
    const {destination,updatedestination}=useDestinationContext();

    const  getLatitudeLongitude = (place,type) => {
        const placeId=place?.value?.place_id
      

        const service=new google.maps.places.PlacesService(document.createElement('div'))

        service.getDetails({
            placeId:placeId
        },(place,status)=>{
            if(status===google.maps.places.PlacesServiceStatus.OK && place.geometry && place.geometry.location){
                const lat=place.geometry.location.lat()
                const lng=place.geometry.location.lng()

              
                if(type==='source'){
                    console.log(lat,lng)

                    updateSource({
                        name:place.formatted_address,
                        lat,
                        lng,
                        label:place.name
                    })
                }else{
                    updatedestination({
                        name:place.formatted_address,
                        lat,
                        lng,
                        label:place.name
                    })
                }
            }
        })
    }
  return (
    <div className='bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4'>
        {/* <input type='text' placeholder={type==='source' ? 'Pickup location' :'Destination location'} className=' bg-transparent w-full'></input> */}
        <GooglePlacesAutocomplete 
           
        selectProps={{
            value,
            onChange: (value)=>{
                getLatitudeLongitude(value,type)
                setValue(value)
            },
            placeholder:'pickup location',
            isClearable:true,
            className:'w-full bg-transparent',
            components:{
                DropdownIndicator:false
            },
            styles:{
                control:(provided)=>({
                    ...provided,
                    border:'none',
                    boxShadow:'none',
                    borderBottom:'1px solid #000'
                })
            }
          }}
        />
    </div>
  )
}

export default InputItems
