// src/components/ThreeCanvas.tsx
import * as THREE from 'three';
import { useRef, useEffect } from 'react';
import { SceneManager, type ISceneContent } from '../three-logic/SceneManager';

interface Props {
	// SceneClass ha de ser una classe que es pugui instanciar
	SceneClass: new ( s: THREE.Scene ) => ISceneContent;
	bgColor?: string;
}

export const ThreeCanvas = ( { SceneClass, bgColor }: Props ) => {
	const containerRef = useRef<HTMLDivElement>( null );
	const managerRef = useRef<SceneManager | null>( null );

	useEffect( () => {
		if ( containerRef.current ) {
			managerRef.current = new SceneManager( containerRef.current, SceneClass );
		}

		return () => {
			managerRef.current?.cleanup();
		};
	}, [SceneClass] );

	useEffect( () => {
		// Si el color canvia, actualitzem el manager
		if ( bgColor && managerRef.current ) {
			managerRef.current.updateBackground( bgColor );
		}
	}, [bgColor] );

	return (
		<div
			ref={containerRef}
			style={{ width: '100%', height: '400px', borderRadius: '8px', overflow: 'hidden' }}
		/>
	);
};
