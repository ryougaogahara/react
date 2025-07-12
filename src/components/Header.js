// src/components/Header.js
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={{ padding: '1rem', background: '#333', color: '#fff' }}>
      <nav>
        <Link to="/" style={{ margin: '0 1rem', color: '#fff' }}>Home</Link>
        <Link to="/about" style={{ margin: '0 1rem', color: '#fff' }}>About</Link>
        <Link to="/works" style={{ margin: '0 1rem', color: '#fff' }}>Works</Link>
      </nav>
    </header>
  );
}

export default Header;
