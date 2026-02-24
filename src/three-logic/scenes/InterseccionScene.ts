/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from 'three';
import { type ISceneContent } from '../SceneManager';
import { calcularInterseccionRectaPlano } from '../../utils/geoUtils';

export class InterseccionScene implements ISceneContent {
	private scene: THREE.Scene;
	private plano: THREE.Mesh;
	private recta: THREE.Line;
	private puntoCorte: THREE.Mesh;
	private manager: any;

	constructor( scene: THREE.Scene, manager: any, params: any ) {
		this.scene = scene;
		this.manager = manager;

		// 1. Crear Plano (Geometría visual)
		const planeGeo = new THREE.PlaneGeometry( 10, 10 );
		const planeMat = new THREE.MeshPhongMaterial( {
			color: 0x3498db, transparent: true, opacity: 0.5, side: THREE.DoubleSide
		} );
		this.plano = new THREE.Mesh( planeGeo, planeMat );
		this.scene.add( this.plano );

		// 2. Crear Recta (Línea larga)
		const lineMat = new THREE.LineBasicMaterial( { color: 0xff0000 } );
		const lineGeo = new THREE.BufferGeometry().setFromPoints( [
			new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, 0 )
		] );
		this.recta = new THREE.Line( lineGeo, lineMat );
		this.scene.add( this.recta );

		// 3. Punto de Intersección
		this.puntoCorte = new THREE.Mesh(
			new THREE.SphereGeometry( 0.15 ),
			new THREE.MeshBasicMaterial( { color: 0xffff00 } )
		);
		this.scene.add( this.puntoCorte );

		this.updateParams( params );
	}

	updateParams ( params: any ) {
		// A, B, C definen la Normal del plano
		const normal = new THREE.Vector3( params.A, params.B, params.C ).normalize();
		this.plano.quaternion.setFromUnitVectors( new THREE.Vector3( 0, 0, 1 ), normal );

		// Definir Recta: Punto P y Vector V
		const P = new THREE.Vector3( params.px, params.py, params.pz );
		const V = new THREE.Vector3( params.vx, params.vy, params.vz ).normalize();

		// Dibujar línea infinita (aprox)
		const p1 = P.clone().add( V.clone().multiplyScalar( 10 ) );
		const p2 = P.clone().add( V.clone().multiplyScalar( -10 ) );
		this.recta.geometry.setFromPoints( [p1, p2] );

		// Calcular Intersección Real
		const corte = calcularInterseccionRectaPlano( P, V, normal, params.D );
		if ( corte ) {
			this.puntoCorte.position.copy( corte );
			this.puntoCorte.visible = true;
		} else {
			this.puntoCorte.visible = false;
		}

		this.manager.requestFrame();
	}
	update () {

	}
}
