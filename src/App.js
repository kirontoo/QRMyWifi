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
      network: 'sampleSSID',
      password: 'samplePassword',
      encryption: 'WPA',
      hidden: false,
      title: 'This is a sample QR Code.'
    };
  }

  componentDidMount() {
    this.generateQRCode();
  }

      //   // TODO: want to use canvas.insertBefore( newNode, referenceNode )
  // TODO: figure out how to get the checkbox input

  onHandleInputChange = ( event ) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [ name ]: value
    });
  }

  onSubmit = () => {
    this.generateQRCode();
  }

  generateQRCode = () => {
    let { network, password, encryption, hidden } = this.state;

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
    let credentials = `WIFI:S:${network};T:${encryption};P:${password};`;
    credentials += ( hidden ) ? 'H:true' : 'H:false';

    QRCode.toCanvas( credentials, { scale: 10 }, function ( err, qr ) {
      if ( err ) {
        console.error( err );
        return;
      }

      canvas.appendChild( qr );

    });

    if ( network === 'sampleSSID' ) {
      this.setState({ title: 'Here\'s your QR Code!' })
    };
  }

  // TODO: on window size change, re generate QRCode

  render() {
    return (
      <div className="App">
        <nav>
          <h1 className='black underline'>QR My WIFI</h1>
        </nav>

        <div className='container'>
            <WifiForm
              onHandleInputChange={ this.onHandleInputChange }
              onSubmit={ this.onSubmit }
            />
            <QRCodeDisplay title={ this.state.title } />
        </div>
      </div>
    );
  }
}

export default App;
