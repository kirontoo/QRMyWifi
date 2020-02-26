import React from 'react';
import './WifiForm.css';

// TODO: add input for WPA option
const WifiForm = ( { onHandleInputChange, onSubmit } ) => {
	return (
          <div className='input panel'>
            <h3>Welcome to QR My WIFI!</h3>

            <div id="qr-info">
              <span>Getting tired of friends constantly asking for your WIFI password?</span>
              <span>With one scan, your friends can quickly add your WIFI to their phones.</span>
              <span>Just enter your network name (SSID) and password to generate a QR code.</span>
            </div>

            <div className="measure center">
              <fieldset className="ba b--transparent ph0 mh0">
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="network">Network/SSID</label>
									<input
										className="pa2 input-reset ba bg-transparent hover-bg-black-70 hover-white w-100"
										onChange={ onHandleInputChange }
										type="text"
										name="network"
										id="network"/>
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
									<input
										className="b pa2 input-reset ba bg-transparent hover-bg-black-70 hover-white w-100"
										onChange={ onHandleInputChange }
										type="password"
                    name="password"
										id="password"/>
                </div>
                <div className="mt3">
                  <label className="db fw6 jh-copy f6" htmlFor="encryption">Encryption</label>
                  <select
                    className="b pa2 input-reset ba bg-transparent hover-bg-black-70 hover-white w-100 b--black"
                    onChange={ onHandleInputChange }
                    name="encryption">
                    <option>WPA/WPA2</option>
                    <option>WEP</option>
                  </select>
                </div>
                <div className="mt3">
                  <label className="pa0 ma0 lh-copy f6 pointer">
                  <input className="checkbox" type="checkbox"/>
                  Hidden
                  </label>
                </div>
              </fieldset>
              <div className="">
								<button
									className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
									onClick={ onSubmit }
								>Generate QR Code</button>
              </div>
            </div>

            <p className="f6 black db">Worried about your data? Don't worry, no data is saved.</p>
          </div>
	);
}

export default WifiForm;