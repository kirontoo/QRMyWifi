import React from 'react';

const QRCodeDisplay = ( { title } ) => {
	return (
		<div className='panel'>
			<h1>{ title }</h1>
			<div id='canvas'></div>
		</div>
	);
}

export default QRCodeDisplay;