import React from 'react';
import './App.css';
import 'tachyons';
import QRCode from 'qrcode';

// import components
import WifiForm from './components/WifiForm/WifiForm';
import QRCodeDisplay from './components/QRCodeDisplay/QRCodeDisplay';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      network: '',
      password: '',
      encryption: 'WPA',

    };
  }

    // // if the network's SSID is hidden
    // // TODO: put a check mark for hidden
    // // if ( hidden ) {
    // //   text += 'H:true';
    // // }

    //   // TODO: want to use canvas.insertBefore( newNode, referenceNode )
  // TODO: figure out how to get the checkbox input

  onNetworkChange = ( event ) => { this.setState( { network: event.target.value }) }
  onPasswordChange = ( event ) => { this.setState( { password: event.target.value }) }
  onEncryptionChange = ( event ) => { this.setState( { encryption: event.target.value }) }

  onSubmit = () => {
    this.generateQRCode();
  }

  generateQRCode() {
    let { network, password, encryption } = this.state;

    // if entries are not filled, don't generate
    if ( !network && !password) {
      return;
    }

    let canvas = document.getElementById('canvas')

    // remove any existing canvases
    let existingCanvas = document.getElementsByTagName('canvas');
    if ( existingCanvas.length > 0 ) {
      canvas.removeChild( existingCanvas[0] );
    }

    // generate QR code
    let credentials = `WIFI:S:${network};T:${encryption};P:${password};`
    QRCode.toCanvas( credentials, { width: 500 }, function ( err, qr ) {
      if ( err ) {
        console.error( err );
      }

      canvas.appendChild( qr );
    });
  }

  render() {
    return (
      <div className="App">
        <nav>
          <h1 className='dim black underline'>QR My WIFI</h1>
        </nav>

        <div className='container'>
          <WifiForm
            onNetworkChange={ this.onNetworkChange }
            onPasswordChange={ this.onPasswordChange }
            onEncryptionChange={ this.onEncryptionChange }
            onSubmit={ this.onSubmit }
          />
          <QRCodeDisplay/>
        </div>
      </div>
    );
  }
}

export default App;
