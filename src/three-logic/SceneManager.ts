// src/three-logic/SceneManager.ts
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Definim una interfície per a les escenes externes
export interface ISceneContent {
	update?(): void;
}

export class SceneManager {
	private scene: THREE.Scene;
	private camera: THREE.PerspectiveCamera;
	private renderer: THREE.WebGLRenderer;
	private controls: OrbitControls;
	private container: HTMLElement;
	private content: ISceneContent;
	private frameId: number | null = null;
	private isAnimating = false;
	private frameRequested = false;

	constructor( container: HTMLElement, SceneClass: new ( s: THREE.Scene ) => ISceneContent ) {
		// Dins del constructor de SceneManager.ts o al mètode render

		this.container = container;
		this.scene = new THREE.Scene();
		// this.scene.background = new THREE.Color( '#f0f0f0' );

		this.camera = new THREE.PerspectiveCamera( 75, container.clientWidth / container.clientHeight, 0.1, 1000 );
		this.camera.position.set( 5, 5, 5 );

		this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
		// 2. Opcional: Pots posar el color de neteja a 0 amb opacitat 0
		this.renderer.setClearColor( 0x000000, 0 );
		this.renderer.setSize( container.clientWidth, container.clientHeight );
		this.renderer.setPixelRatio( Math.min( window.devicePixelRatio, 2 ) );
		this.container.appendChild( this.renderer.domElement );

		this.controls = new OrbitControls( this.camera, this.renderer.domElement );
		this.controls.target.set( 0, 0, 0 ); // Forcem que el centre de rotació sigui l'origen
		this.controls.update();
		// this.controls.enableDamping = true; // 2. Opcional: afegeix inèrcia per a Geometria
		this.controls.addEventListener( 'change', () => this.requestFrame() );

		// Instanciem l'escena que rebem
		this.content = new SceneClass( this.scene );

		// this.isAnimating = false;
		this.requestFrame();

	}

	public updateBackground ( color: string ) {
		this.scene.background = new THREE.Color( color );
		this.render(); // Redibuixem amb el nou fons
	}

	// Mètode per demanar un frame de manera segura (evita duplicats)
	public requestFrame () {
		if ( !this.frameRequested ) {
			this.frameRequested = true;
			requestAnimationFrame( () => {
				this.frameRequested = false;
				this.render();
			} );
		}
	}

	startAnimation () {
		this.isAnimating = true;
		this.animate();
	}

	stopAnimation () { this.isAnimating = false; }

	private render () {
		// Actualitzem la lògica de l'escena (si cal)
		if ( this.content.update ) this.content.update();

		// Dibuixem
		this.renderer.render( this.scene, this.camera );

		// console.log( "🎨 Frame dibuixat!" ); // Activa-ho per veure que NOMÉS renderitza quan cal
	}

	public onResize () {
		const { clientWidth, clientHeight } = this.container;
		this.camera.aspect = clientWidth / clientHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize( clientWidth, clientHeight );
		this.requestFrame(); // Redibuixem en canviar tamany
	}

	private animate = () => {
		// Si hem parat l'animació, no demanem el següent frame
		if ( !this.isAnimating ) return;

		this.frameId = requestAnimationFrame( this.animate );

		// OrbitControls necessita update() a cada frame si enableDamping = true
		this.controls.update();

		this.render();
	}

	public cleanup () {
		this.isAnimating = false; // 1. Aturem la bandera primer
		if ( this.frameId !== null ) {
			cancelAnimationFrame( this.frameId ); // 2. Cancel·lem el frame pendent
		}

		this.renderer.dispose();
		this.container.removeChild( this.renderer.domElement );
	}

}
