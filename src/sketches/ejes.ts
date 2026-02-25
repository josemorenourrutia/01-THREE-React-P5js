import p5 from 'p5';

// const scale = ( x: number, sc: number ) => {
// 	return x * sc
// }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ejes = ( p: p5, data: any ) => {
	const sc = data.escala || 20; // Factor de escala

	// Dibujar ejes
	p.strokeWeight( 2 );
	p.stroke( 200 ); p.line( -p.width / 2, 0, p.width / 2, 0 ); p.line( 0, -p.height / 2, 0, p.height / 2 );

	// 2. Cálculos Matemáticos
	// Ángulo en radianes y grados
	// const angleRad = Math.atan2( data.vector.vy, data.vector.vx );
	// const angleDeg = ( ( -angleRad * 180 ) / Math.PI ).toFixed( 1 ); // Invertimos Y para p5

	// 3. Dibujar la Recta
	// Dibujar recta r: (x,y) = (px, py) + t(vx, vy)
	// --- DIBUJO ESCALADO ---
	// p.push();
	// p.scale( sc, sc ); // Invertimos Y para que + sea arriba (como en Three.js)

	// Dibujar rejilla tenue (opcional)
	p.stroke( 200, 50 );
	p.strokeWeight( 1 );

	const range = Math.floor( p.width > p.height ? p.width / 2 * sc : p.height / 2 * sc ); // Cuántas unidades dibujar a cada lado
	for ( let i = -range; i <= range; i++ ) {
		p.line( i, -range, i, range ); // Líneas verticales
		p.line( -range, i, range, i ); // Líneas horizontales
	}

	// 2. MARCAS Y NÚMEROS (Espacio de Pantalla para que el texto sea legible)
	p.textAlign( p.CENTER, p.CENTER );

	p.strokeWeight( 2 );
	p.textSize( 12 );
	p.fill( 250 ); // Color del texto
	for ( let i = -range; i <= range; i++ ) {
		if ( i === 0 ) continue; // Saltar el origen

		// Marcas en X
		p.stroke( 200 );
		p.line( i, -5 * 1, i, 5 * sc );
		// Marcas en Y
		p.line( -5 * 1, i, 5 * sc, i );

		// Números en X
		p.noStroke();
		p.text( i, i, 20 * sc ); // Número debajo del eje
		// Números en Y
		p.text( -i, -20 * sc, i );
	}
}
