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

	constructor( container: HTMLElement, SceneClass: new ( s: THREE.Scene ) => ISceneContent ) {
		this.container = container;
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color( '#f0f0f0' );

		this.camera = new THREE.PerspectiveCamera( 75, container.clientWidth / container.clientHeight, 0.1, 1000 );
		this.camera.position.set( 5, 5, 5 );

		this.renderer = new THREE.WebGLRenderer( { antialias: true } );
		this.renderer.setSize( container.clientWidth, container.clientHeight );
		this.container.appendChild( this.renderer.domElement );

		this.controls = new OrbitControls( this.camera, this.renderer.domElement );
		this.controls.enableDamping = true; // 2. Opcional: afegeix inèrcia per a Geometria

		// Instanciem l'escena que rebem
		this.content = new SceneClass( this.scene );

		this.animate();
	}

	private animate = () => {
		this.frameId = requestAnimationFrame( this.animate );
		if ( this.content.update ) this.content.update();
		this.renderer.render( this.scene, this.camera );
	}

	public cleanup () {
		if ( this.frameId ) cancelAnimationFrame( this.frameId );
		this.renderer.dispose();
		this.container.removeChild( this.renderer.domElement );
	}
}
