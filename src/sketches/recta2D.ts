import p5 from 'p5';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const recta2DSketch = (p: p5) => {
	let data: any = null;

	(p as any).updateParams = (newParams: any) => {
		data = newParams;
		// Si 'active' es false, detenemos el renderizado para ahorrar CPU
		if (newParams.active === false) { p.noLoop(); }
		else { p.loop(); }
	};

	p.setup = () => {
		p.createCanvas(300, 300);
		p.windowResized();
		p.textFont('sans-serif'); // Fuente limpia para las medidas
	}

	// Opcional: Si el usuario cambia el tamaño de la ventana del navegador
	p.windowResized = () => {
		const el = (p as any).canvas?.parentElement;

		if (el) {
			p.resizeCanvas(el.clientWidth, el.clientHeight);
		}
	};

	p.draw = () => {
		// p.background(255);
		// 1. Borra todo y deja el fondo transparente
		p.clear();
		p.translate(p.width / 2, p.height / 2); // Centro como origen
		// p.scale(20, -20); // Escala para ver coordenadas

		if (!data) return;

		const sc = data.escala || 20; // Factor de escala

		// Dibujar ejes
		p.strokeWeight(2);
		p.stroke(200); p.line(-p.width / 2, 0, p.width / 2, 0); p.line(0, -p.height / 2, 0, p.height / 2);

		// 2. Cálculos Matemáticos
		// Ángulo en radianes y grados
		const angleRad = Math.atan2(data.vector.vy, data.vector.vx);
		const angleDeg = ((-angleRad * 180) / Math.PI).toFixed(1); // Invertimos Y para p5

		// 3. Dibujar la Recta
		// Dibujar recta r: (x,y) = (px, py) + t(vx, vy)
		// --- DIBUJO ESCALADO ---
		// p.push();
		p.scale(sc, sc); // Invertimos Y para que + sea arriba (como en Three.js)

		// Dibujar rejilla tenue (opcional)
		p.stroke(200, 50);
		p.strokeWeight(1 / sc);

		const range = Math.floor(p.width > p.height ? p.width / 2 / sc : p.height / 2 / sc); // Cuántas unidades dibujar a cada lado
		for (let i = -range; i <= range; i++) {
			p.line(i, -range, i, range); // Líneas verticales
			p.line(-range, i, range, i); // Líneas horizontales
		}

		// 2. MARCAS Y NÚMEROS (Espacio de Pantalla para que el texto sea legible)
		p.textAlign(p.CENTER, p.CENTER);

		p.strokeWeight(2 / sc);
		p.textSize(12 / sc);
		p.fill(250); // Color del texto
		for (let i = -range; i <= range; i++) {
			if (i === 0) continue; // Saltar el origen

			// Marcas en X
			p.stroke(200);
			p.line(i, -5 / sc, i, 5 / sc);
			// Marcas en Y
			p.line(-5 / sc, i, 5 / sc, i);

			// Números en X
			p.noStroke();
			p.text(i, i, 20 / sc); // Número debajo del eje
			// Números en Y
			p.text(-i, -20 / sc, i);
		}

		const mag = p.width / 4 / Math.sqrt(data.vector.vx * data.vector.vx + data.vector.vy * data.vector.vy)
		p.stroke(data.color || '#ff0000');
		p.strokeWeight(2 / sc); // Grosor constante independientemente del zoom
		p.line(
			data.punto.x - mag * data.vector.vx, data.punto.y - mag * data.vector.vy,
			data.punto.x + mag * data.vector.vx, data.punto.y + mag * data.vector.vy
		);

		// 4. Dibujar el Arco del Ángulo
		p.noFill();
		p.stroke(250);
		// p.strokeWeight(2 / sc);
		// Dibujamos un arco de 40px de radio
		p.arc(data.punto.x, data.punto.y, 40 / sc, 40 / sc, Math.min(angleRad, 0), Math.max(angleRad, 0));

		// 5. Etiquetas de Texto (Cotas)
		p.noStroke();
		p.fill(250); // Color del texto

		// Texto del Ángulo cerca del arco
		p.text(`${angleDeg}°`, data.punto.x + 40 / sc, data.punto.y + 10 / sc);

		// Coordenadas del punto
		p.fill(data.color);
		p.text(`P(${data.punto.x}, ${-data.punto.y})`, data.punto.x + 25 / sc, data.punto.y - 10 / sc);

		// Punto físico
		p.fill(data.color);
		p.noStroke();
		p.ellipse(data.punto.x, data.punto.y, 8 / sc, 8 / sc);
		// p.pop();
	};
};
