import p5 from 'p5';

const params = {
	punto: { x: 2, y: 3 },
	vector: { vx: 2, vy: 3 },
	color: '#ff0000'
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export const recta2DSketch = ( p: p5 ) => {
	let data: any;

	p.setup = () => p.createCanvas( 300, 300 );

	( p as any ).updateParams = ( newParams: any ) => { data = newParams; };

	( p as any ).updateParams( params )
	p.draw = () => {
		p.background( 255 );
		p.translate( p.width / 2, p.height / 2 ); // Centro como origen
		// p.scale( 20, -20 ); // Escala para ver coordenadas

		if ( !data ) return;

		// Dibujar ejes
		p.strokeWeight( 2 );
		p.stroke( 200 ); p.line( -p.width / 2, 0, p.width / 2, 0 ); p.line( 0, -p.height / 2, 0, p.height / 2 );

		// Dibujar recta r: (x,y) = (px, py) + t(vx, vy)
		const mag = p.width / 1 / Math.sqrt( data.vector.vx * data.vector.vx + data.vector.vy * data.vector.vy )
		p.stroke( data.color );
		p.line(
			data.punto.x - mag * data.vector.vx, data.punto.y - mag * data.vector.vy,
			data.punto.x + mag * data.vector.vx, data.punto.y + mag * data.vector.vy );
	};
};
