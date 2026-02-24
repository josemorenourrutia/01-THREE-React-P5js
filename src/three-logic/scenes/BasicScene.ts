import * as THREE from 'three';
import { type ISceneContent } from '../SceneManager';

export class BasicScene implements ISceneContent {
	private scene: THREE.Scene;
	private cube: THREE.Mesh;

	constructor( scene: THREE.Scene ) {
		this.scene = scene;

		// 1. Afegim una reixeta (Grid) per veure el terra
		const grid = new THREE.GridHelper( 10, 10 );
		this.scene.add( grid );

		// 2. Afegim eixos de coordenades (X: vermell, Y: verd, Z: blau)
		const axes = new THREE.AxesHelper( 3 );
		this.scene.add( axes );

		// 3. Creem un cub
		const geometry = new THREE.BoxGeometry( 1, 1, 1 );
		const material = new THREE.MeshNormalMaterial();
		this.cube = new THREE.Mesh( geometry, material );
		this.cube.position.y = 0.5; // El posem sobre la reixeta
		this.scene.add( this.cube );
	}

	// Aquest mètode l'executa el SceneManager a cada frame
	public update (): void {
		// this.cube.rotation.y += 0.01;
	}
}
