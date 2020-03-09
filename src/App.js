import React from 'react';
import domtoimage from 'dom-to-image-more';
import QRCode from 'qrcode';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './App.css';
import 'tachyons';

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

    if ( network !== 'sampleSSID' ) {
      this.setState({ title: 'Here\'s your QR Code!' })
    };
  }

  exportToPdf() {
    let pdf = new jsPDF();
    let qrCode = document.querySelector( '#canvas' );

    let margin = 20;
    html2canvas( qrCode )
      .then( canvas => {
        let pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage( canvas.toDataURL('image/png'), 'PNG', 0, margin );
        console.log(canvas.width)
        pdf.text( margin * 3, margin + ( canvas.width / 7 ), 'Scan this QR Code for the WIFI!' );
        pdf.save( 'myWifiQRCode.pdf');
		});
  }

  exportToImage() {
    let qrCode = document.querySelector( '#canvas' );

    domtoimage.toJpeg( qrCode, { quality: 0.95 } )
      .then( function ( dataUrl ) {
        let link = document.createElement( 'a' );
        link.download = 'myWifiQRCode.jpeg';
        link.href = dataUrl;
        link.click();
      });
  }

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
            <QRCodeDisplay title={ this.state.title }
              exportToPdf={ this.exportToPdf }
              exportToImage={ this.exportToImage }
            />
        </div>
      </div>
    );
  }
}

export default App;
