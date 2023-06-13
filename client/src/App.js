import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form action="/action_page.php" method="get">
        <label for="fname">First name:</label>
        <input type="text" id="fname" name="fname"/>
        <label for="lname">Last name:</label>
        <input type="text" id="lname" name="lname"/>
        <input type="submit" value="Submit"/>
        </form>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
