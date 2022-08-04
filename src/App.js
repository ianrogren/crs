/** @format */

import './App.css';
import Programs from './components/Programs';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className="App">
      <header>
        <h1>CRS Technical Assessment</h1>
      </header>
      <main>
        <Programs />
      </main>
      <footer>Footer goes here.</footer>
    </div>
  );
}

export default App;
