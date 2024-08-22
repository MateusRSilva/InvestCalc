import './App.css';
import SimulatorContext from './contexts/simulatorcontext/simulatorContext';
import SimulatorProvide from './contexts/simulatorcontext/simulatorPovider';
import NavRoutes from './routes/navRoutes';


function App() {
  return (
    <>
      <SimulatorContext>
        <SimulatorProvide>
          <NavRoutes />
        </SimulatorProvide>
      </SimulatorContext>
    </>
  );
}

export default App;
