import React, { useEffect, useState } from 'react'
import Solver from './Solver';


export default function Input(props) {
    // console.log(props.val);
    const [ans, setans] = useState([]);
    const handler = (e) => {
        // console.log(e);
        setans(prev => ({ ...prev, [e.target.id]: e.target.value }));
        // console.log(ans);
    }
    return (<>
        <hr className="border border-danger border-2 opacity-50"></hr>
             <h3 className='text-secondary'>Input Geometrical Parameters..</h3>
        <div className='m-2 p-4'>
            
            <label for="customRange2" className="form-label m-1 p-2">Day Of Number : {ans.n}</label>
            <input type="range" className="form-range" min="1" max="365" id="n" onChange={handler} />
            <form className="row gy-2 gx-3 align-items-center m-1 p-2">
                <div className="col-auto">
                    <label className="visually-hidden" for="autoSizingInputGroup">Length</label>
                    <div className="input-group">
                        <div className="input-group-text">L</div>
                        <input type="float" className="form-control" id="L" placeholder="Length" onChange={handler} />
                    </div>
                </div>
                <div className="col-auto">
                    <label className="visually-hidden" for="autoSizingInputGroup">Focal Length</label>
                    <div className="input-group">
                        <div className="input-group-text">F</div>
                        <input type="float" className="form-control" id="f" placeholder="Focal Length" onChange={handler} />
                    </div>
                </div>
                <div className="col-auto">
                    <label className="visually-hidden" for="autoSizingSelect">Preference</label>
                    <select className="form-select" id="pr" onChange={handler}>
                        <option selected>Prandlt No..</option>
                        <option value="0.696">0.696</option>
                        <option value="0.712">0.712</option>
                    </select>
                </div>
                
            </form>
            <form className="row gy-2 gx-3 align-items-center m-1 p-2">
                <div className="col-auto">
                    <label className="visually-hidden" for="autoSizingInputGroup">Focal Length</label>
                    <div className="input-group">
                        <div className="input-group-text">{'\u03B5r'}</div>
                        <input type="float" className="form-control" id="er" placeholder="Emissivity of Receiver" onChange={handler} />
                    </div>
                </div>
                <div className="col-auto">
                    <label className="visually-hidden" for="autoSizingInputGroup">Focal Length</label>
                    <div className="input-group">
                        <div className="input-group-text">{'\u03B5c'}</div>
                        <input type="float" className="form-control" id="ec" placeholder="Emissivity of Cover" onChange={handler} />
                    </div>
                </div>
                <div className="col-auto">
                    <label className="visually-hidden" for="autoSizingInputGroup">Focal Length</label>
                    <div className="input-group">
                        <div className="input-group-text">Tin</div>
                        <input type="float" className="form-control" id="Tin" placeholder="Inlet Temperature" onChange={handler} />
                    </div>
                </div>
            </form>
            <form className="row gy-2 gx-3 align-items-center m-1 p-2">
            <div className="col-auto">
                    <label className="visually-hidden" for="autoSizingInputGroup">Aperture Area</label>
                    <div className="input-group">
                        <div className="input-group-text">Ar</div>
                        <input type="float" className="form-control" id="Ar" placeholder="Aperture Area" onChange={handler} />
                    </div>
                </div>
                <div className="col-auto">
                    <label className="visually-hidden" for="autoSizingInputGroup">OuterArea of Cover </label>
                    <div className="input-group">
                        <div className="input-group-text">Aco</div>
                        <input type="float" className="form-control" id="Aco" placeholder="OuterArea of Cover" onChange={handler} />
                    </div>
                </div>
                <div className="col-auto">
                    <label className="visually-hidden" for="autoSizingInputGroup">OuterArea of Receiver</label>
                    <div className="input-group">
                        <div className="input-group-text">Aro</div>
                        <input type="float" className="form-control" id="Aro" placeholder="OuterArea of Receiver" onChange={handler} />
                    </div>
                </div>
                <div className="col-auto">
                    <label className="visually-hidden" for="autoSizingInputGroup">InnerArea of Receiver</label>
                    <div className="input-group">
                        <div className="input-group-text">Ari</div>
                        <input type="float" className="form-control" id="Ari" placeholder="InnerArea of Receiver" onChange={handler} />
                    </div>
                </div>
            </form>
            <form className="row gy-2 gx-3 align-items-center m-1 p-2">
                <div className="col-auto">
                    <label className="visually-hidden" for="autoSizingInputGroup">Density Of Fluid</label>
                    <div className="input-group">
                        <div className="input-group-text">{'\u03A1'}</div>
                        <input type="float" className="form-control" id="ro" placeholder="Density Of Fluid" onChange={handler} />
                    </div>
                </div>
                <div className="col-auto">
                    <label className="visually-hidden" for="autoSizingInputGroup">Specific Heat Capacity </label>
                    <div className="input-group">
                        <div className="input-group-text">Cp</div>
                        <input type="float" className="form-control" id="cp" placeholder="Specific Heat Capacity" onChange={handler} />
                    </div>
                </div>
                <div className="col-auto">
                    <label className="visually-hidden" for="autoSizingInputGroup">Volume Flow Rate</label>
                    <div className="input-group">
                        <div className="input-group-text">V</div>
                        <input type="float" className="form-control" id="V" placeholder="Volume Flow Rate" onChange={handler} />
                    </div>
                </div>
            </form>
            <Solver val={props.val} ans={ans} pos={props.pos} el={props.el}/>
        </div>
        </>
    )
}
