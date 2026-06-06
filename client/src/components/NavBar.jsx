import { Link } from 'react-router';

export default function NavBar() {
  return (
  <>
    <div className='navbar'>
      <Link className='navbar-item' to={'/'}>Home</Link>
      <Link className='navbar-item' to={'/characters'}>Characters</Link>
      <Link className='navbar-item' to={'/weapons'}>Weapons</Link>
      <Link className='navbar-item' to='/materials'>Materials</Link>
      <Link className='navbar-item' to='/artifacts'>Artifacts</Link>
    </div>
  </>
  );
}