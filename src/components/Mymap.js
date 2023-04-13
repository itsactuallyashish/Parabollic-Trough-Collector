import React, { useState,useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import Input from './Input';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;
export default function Mymap() {
    const date = new Date();
    const [el,setel]=useState();
    const [val,setval]=useState({});
    const getdata=async(url)=>{
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data.hourly.windspeed_10m[date.getHours()]);
        // console.log(data.hourly.apparent_temperature[date.getHours()]);
        // console.log(data.hourly);
        setval({ws:data.hourly.windspeed_10m[date.getHours()],amb:data.hourly.apparent_temperature[date.getHours()]});
    }

    const getel= async(url)=>{
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data.elevation);
        setel(data.elevation);
    }
    const [x, setx] = useState(0);
    const [y, sety] = useState(0);
    const [pos,setpos]=useState({ lat: 26.46, lng: 80.34 });

    useEffect(()=>{
        const url=`https://api.open-meteo.com/v1/forecast?latitude=${pos.lat}&longitude=${pos.lng}&hourly=windspeed_10m&hourly=apparent_temperature`;
        // console.log(url);
        const url2=`https://api.open-meteo.com/v1/elevation?latitude=${pos.lat}&longitude=${pos.lng}`;
        getdata(url);
        getel(url2);
    },[pos]);



    function MyComponent() {
        const map = useMapEvents({
            click: (e) => {
                setx(e.latlng.lat);
                sety(e.latlng.lng);
                setpos(e.latlng);
                map.locate();
                map.flyTo(e.latlng,map.getZoom());
            },
            
        })
        return null
    }
    return (
        <div>
            <h2 className='text-secondary'>Choose Location Of Your Collector...</h2>
            <MapContainer center={[26.46, 80.34]} style={{ height: '70vh' }} zoom={13} scrollWheelZoom={false} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MyComponent />
                <Marker position={pos} >
                    <Popup>
                    <span className='m-2 p-4'>Latitude: {x}</span><br />
                    <span className='m-2 p-4'>Longitude:  {y}</span>
                    </Popup>
                </Marker>
            </MapContainer>
           <form className="row gy-2 gx-3 align-items-center m-1 p-2">
           <div className="col-auto">
                    <label className="visually-hidden" for="autoSizingInputGroup">Latitude</label>
                    <div className="input-group">
                        <div className="input-group-text">Lat</div>
                        <input type="float" className="form-control" id="x" placeholder={x} disabled  />
                    </div>
                </div>
           <div className="col-auto">
                    <label className="visually-hidden" for="autoSizingInputGroup">Longitude </label>
                    <div className="input-group">
                        <div className="input-group-text">Lng</div>
                        <input type="float" className="form-control" id="y" placeholder={y} disabled />
                    </div>
                </div>

           <div className="col-auto">
                    <label className="visually-hidden" for="autoSizingInputGroup">WindSpeed</label>
                    <div className="input-group">
                        <div className="input-group-text">v</div>
                        <input type="float" className="form-control" id="ws" placeholder={val.ws} disabled />
                    </div>
                </div>
           <div className="col-auto">
                    <label className="visually-hidden" for="autoSizingInputGroup">Ambient Temperature</label>
                    <div className="input-group">
                        <div className="input-group-text">Tam</div>
                        <input type="float" className="form-control" id="ws" placeholder={val.amb} disabled />
                    </div>
                </div>
           <div className="col-auto">
                    <label className="visually-hidden" for="autoSizingInputGroup">Elevation</label>
                    <div className="input-group">
                        <div className="input-group-text">El</div>
                        <input type="float" className="form-control" id="el" placeholder={el} disabled />
                    </div>
                </div>
            </form>
            <Input pos={pos} val={val} el={el}/> 
        </div>
        );
    }