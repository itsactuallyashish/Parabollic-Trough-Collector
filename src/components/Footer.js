import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-light text-center text-lg-start">

  <div className="container p-4">
   
    <div className="row">
      
      <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
        <h5 className="text-uppercase">Disclaimer..</h5>

        <p>
          Our prediction model used the one dimensional heat flow model to capture the 
          variables because one dimensional model of heat transfer is more accurate due to lesser 
          Assumptions.<br/>All the location dependent parameters are fetched from the api on the go.<br/>
          For our convenience zenith angle is assumed to be equal to the incidence angle<br/>
          All our calculation are based on the consideration is that the collector is faced north-south direction.<br/>
          All units are in SI units system.
        </p>
      </div>
      
      <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
        <h5 className="text-uppercase">Specification Of Model</h5>

        <p>
          El :- Elevation Above Sea Level<br/>
          V  :- Wind Speed<br/>
          Tin :- Inlet Temperature Of Fluid<br/>
          Tam:- Ambient Temperature Of Fluid<br/>
          Tout:- Outlet Temperature Of Fluid <br/>
          L :- Length Of Collector<br/>
          F:- Focal Length Of Aperture<br/>
          Ar:-Aperture Area<br/>
          Ari:- Inlet Area Of Receiver<br/>
          v:- Volume Flow Rate Of the HTF Fluid<br/>
          Er:- Emmisivity Of The Receiver<br/>
          Ec:- Emmisivity Of The Cover <br/>
          cp :-Specific Heat Capacity Of The Fluid<br/>
          lat :-Local Apparent Time
        </p>
      </div>
    </div>
   
  </div>

  <div className="text-center p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
    © 2023 Copyright:
    <span className='text-dark'> ItsactuallyAshish</span>
  </div>
</footer>
  )
}
