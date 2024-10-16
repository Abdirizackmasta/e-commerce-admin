import './Navbar.css';
import navLogo from '../../assets/nav-logo.svg';
import navProfile from '../../assets/nav-profile.svg';

function Navbar() {
  return (
    <div className='navbar'>
      <img src={navLogo} alt="" className="nav-logo" />
      <img src={navProfile} alt="" className="nav-profile" />
    </div>
  )
}

export default Navbar
