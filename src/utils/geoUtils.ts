import * as THREE from 'three';

export const calcularInterseccionRectaPlano = (
	pRecta: THREE.Vector3,
	vRecta: THREE.Vector3,
	nPlano: THREE.Vector3,
	dPlano: number
) => {
	// Fórmula: t = -(n·p + d) / (n·v)
	const numerador = -( nPlano.dot( pRecta ) + dPlano );
	const denominador = nPlano.dot( vRecta );

	if ( Math.abs( denominador ) < 0.0001 ) return null; // Paralelos

	const t = numerador / denominador;
	return pRecta.clone().add( vRecta.clone().multiplyScalar( t ) );
};
