'use client'
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import SearchSection from "./components/Home/SearchSection";
import GoogleMapsSection from "./components/Home/GoogleMapSections";
import { useSourceContext } from "./context/SourceContext";
import { useDestinationContext } from "./context/DestinationContext";
import { LoadScript } from "@react-google-maps/api";



export default function Home() {  




    const {source,updateSource}=useSourceContext();
    const {destination,updatedestination}=useDestinationContext();



  
  
  return (
    <LoadScript
        
    libraries={['places']}
    googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY} >
    <div className="p-6 grid  grid-cols-6 md:grid-cols-3 gap-5">
    
 
          <div>
          <SearchSection />
          </div>
          
          <div className=" col-span-2">
        <GoogleMapsSection />
          </div>
    
      
    </div>  
        </LoadScript>
   
  );
}
