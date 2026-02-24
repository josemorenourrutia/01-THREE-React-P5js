/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from 'three';
export class Recta3DScene {
	private line: THREE.Line;
	private manager: any;
	constructor( scene: THREE.Scene, manager: any, params: any ) {
		this.manager = manager;
		this.line = new THREE.Line( new THREE.BufferGeometry(), new THREE.LineBasicMaterial() );
		scene.add( this.line );
		this.updateParams( params );
	}

	updateParams ( params: any ) {
		const p = new THREE.Vector3( params.punto.x, params.punto.y, params.punto.z );
		const v = new THREE.Vector3( params.vector.vx, params.vector.vy, params.vector.vz );

		const points = [
			p.clone().add( v.clone().multiplyScalar( -10 ) ),
			p.clone().add( v.clone().multiplyScalar( 10 ) )
		];
		this.line.geometry.setFromPoints( points );
		// this.line.material.color.set( params.color );

		this.manager.requestFrame();
	}
}
