/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect } from 'react';
import p5 from 'p5';

interface P5Props {
	sketch: ( p: p5 ) => void;
	params?: any;
}

export const P5Canvas = ( { sketch, params }: P5Props ) => {
	const containerRef = useRef<HTMLDivElement>( null );
	const instanceRef = useRef<p5 | null>( null );

	useEffect( () => {
		if ( containerRef.current ) {
			// Creem la instància de p5 en "instance mode"
			instanceRef.current = new p5( sketch, containerRef.current );
		}
		return () => instanceRef.current?.remove(); // Neteja de memòria
	}, [sketch] );

	// Passem els paràmetres de Leva al sketch si cal
	useEffect( () => {
		if ( instanceRef.current && ( instanceRef.current as any ).updateParams ) {
			( instanceRef.current as any ).updateParams( params );
		}
	}, [params] );

	return <div ref={containerRef} className="not-content" />;
};
