import p5 from 'p5';
import { ejes } from './ejes';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const recta2DSketch = ( p: p5 ) => {
	let data: any = null;

	( p as any ).updateParams = ( newParams: any ) => {
		data = newParams;
		// Si 'active' es false, detenemos el renderizado para ahorrar CPU
		if ( newParams.active === false ) { p.noLoop(); }
		else { p.loop(); }
	};

	p.setup = () => {
		p.createCanvas( 300, 300 );
		p.windowResized();
		p.textFont( 'sans-serif' ); // Fuente limpia para las medidas
	}

	// Opcional: Si el usuario cambia el tamaño de la ventana del navegador
	p.windowResized = () => {
		const el = ( p as any ).canvas?.parentElement;

		if ( el ) {
			p.resizeCanvas( el.clientWidth, el.clientHeight );
		}
	};

	p.draw = () => {
		// 1. Borra todo y deja el fondo transparente
		p.clear();
		p.translate( p.width / 2, p.height / 2 ); // Centro como origen

		if ( !data ) return;

		ejes( p, data )

		const sc = data.escala || 20; // Factor de escala

		// 2. Cálculos Matemáticos
		// Ángulo en radianes y grados
		const angleRad = Math.atan2( -data.vector.vy, data.vector.vx );
		const angleDeg = ( ( -angleRad * 180 ) / Math.PI ).toFixed( 1 ); // Invertimos Y para p5

		const mag = p.width / 4 / Math.sqrt( data.vector.vx * data.vector.vx + data.vector.vy * data.vector.vy )
		p.stroke( data.color || '#ff0000' );
		p.strokeWeight( 2 / sc ); // Grosor constante independientemente del zoom
		p.line(
			data.punto.x - mag * data.vector.vx, -data.punto.y - mag * -data.vector.vy,
			data.punto.x + mag * data.vector.vx, -data.punto.y + mag * -data.vector.vy
		);

		// 4. Dibujar el Arco del Ángulo
		p.noFill();
		p.stroke( 250 );
		// Dibujamos un arco de 40px de radio
		p.arc( data.punto.x, -data.punto.y, 40 / sc, 40 / sc, Math.min( angleRad, 0 ), Math.max( angleRad, 0 ) );

		// 5. Etiquetas de Texto (Cotas)
		p.noStroke();
		p.fill( 250 ); // Color del texto

		// Texto del Ángulo cerca del arco
		p.text( `${angleDeg}°`, data.punto.x + 40 / sc, -data.punto.y - 10 / sc );

		// Coordenadas del punto
		p.fill( data.color );
		p.text( `P(${data.punto.x}, ${data.punto.y})`, data.punto.x + 25 / sc, -data.punto.y + 20 / sc );

		// Punto físico
		p.fill( data.color );
		p.noStroke();
		p.ellipse( data.punto.x, -data.punto.y, 8 / sc, 8 / sc );
	};
};
