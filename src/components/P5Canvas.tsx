/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect } from 'react';
import p5 from 'p5';

interface P5Props {
	sketch: (p: p5) => void;
	params?: any;
}

export const P5Canvas = ({ sketch, params }: P5Props) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const instanceRef = useRef<p5 | null>(null);

	useEffect(() => {
		let p5Instance: p5 | null = null;

		if (containerRef.current) {
			// Limpieza preventiva radical
			containerRef.current.innerHTML = '';
			p5Instance = new p5(sketch, containerRef.current);
			instanceRef.current = p5Instance;

			// Sincronización inicial manual para evitar el aviso de dependencia
			if ((p5Instance as any).updateParams) {
				(p5Instance as any).updateParams(params);
			}
		}

		return () => {
			p5Instance?.remove();
			instanceRef.current = null;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sketch]);

	// 2. EFECTO DE ACTUALIZACIÓN: Solo depende de 'params'
	useEffect(() => {
		if (instanceRef.current && (instanceRef.current as any).updateParams) {
			(instanceRef.current as any).updateParams(params);
		}
	}, [params]);

	return <div ref={containerRef} className="not-content" style={{ lineHeight: 0 }} />;
};
