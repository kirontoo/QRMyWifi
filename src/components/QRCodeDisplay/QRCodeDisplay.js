import React from 'react';
import './QRCodeDisplay.css';

const QRCodeDisplay = ( { title, exportToPdf, exportToImage } ) => {
	return (
		<div className='panel'>
			<h3>{ title }</h3>
			<div id='canvas'></div>
			<main>
				<p className='b'>Export to: </p>
				<div className='buttonContainer'>
					<button
						className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
						onClick={ exportToPdf }>
						PDF
					</button>
					<button
						className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib'
						onClick={ exportToImage }>
						Image
					</button>
				</div>
			</main>
		</div>
	);
}

export default QRCodeDisplay;