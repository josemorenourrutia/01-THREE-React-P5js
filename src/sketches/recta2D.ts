import p5 from 'p5';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const recta2DSketch = (p: p5) => {
	let data: any = null;

	(p as any).updateParams = (newParams: any) => {
		data = newParams;
		// Si 'active' es false, detenemos el renderizado para ahorrar CPU
		if (newParams.active === false) {
			p.noLoop();
		} else {
			p.loop();
		}
	};

	p.setup = () => { p.createCanvas(300, 300); p.windowResized(); }

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

		// Dibujar ejes
		p.strokeWeight(2);
		p.stroke(200); p.line(-p.width / 2, 0, p.width / 2, 0); p.line(0, -p.height / 2, 0, p.height / 2);

		// Dibujar recta r: (x,y) = (px, py) + t(vx, vy)
		const mag = p.width / 4 / Math.sqrt(data.vector.vx * data.vector.vx + data.vector.vy * data.vector.vy)
		p.stroke(data.color);
		p.line(
			data.punto.x - mag * data.vector.vx, data.punto.y - mag * data.vector.vy,
			data.punto.x + mag * data.vector.vx, data.punto.y + mag * data.vector.vy);
	};
};
