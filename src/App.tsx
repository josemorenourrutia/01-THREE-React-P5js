import { P5Canvas } from './components/P5Canvas';
import { ThreeCanvas } from './components/ThreeCanvas';
import { recta2DSketch } from './sketches/recta2D';
import { BasicScene } from './three-logic/scenes/BasicScene';

function App () {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Geometria 3D amb TypeScript</h1>
      <ThreeCanvas SceneClass={BasicScene} />
      {/* <ThreeCanvas SceneClass={BasicScene} bgColor='#1a1a1a' /> */}
      <P5Canvas sketch={recta2DSketch} />
    </div>
  );
}

export default App;
