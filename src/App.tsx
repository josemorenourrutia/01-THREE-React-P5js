// import { useState } from 'react';
import { P5Canvas } from './components/P5Canvas';
import { ThreeCanvas } from './components/ThreeCanvas';
import { recta2DSketch } from './sketches/recta2D';
import { BasicScene } from './three-logic/scenes/BasicScene';

function App() {
  // const [isActive, setIsActive] = useState(true); // Estado de reproducción
  const params = {
    punto: { x: 2, y: 3 },
    vector: { vx: 2, vy: 3 },
    color: '#ffff00',
    escala: 40, // 1 unidad = 40 píxeles
    active: false//isActive
  };
  return (
    <div style={{ padding: '20px' }}>
      <h1>Geometria 3D amb TypeScript</h1>
      <ThreeCanvas SceneClass={BasicScene} />
      {/* <ThreeCanvas SceneClass={BasicScene} bgColor='#1a1a1a' /> */}

      {/* <button onClick={() => setIsActive(!isActive)}>
        {isActive ? '⏸️ Pausar' : '▶️ Reanudar'}
      </button> */}
      <P5Canvas sketch={recta2DSketch} params={params} />
    </div>
  );
}

export default App;
