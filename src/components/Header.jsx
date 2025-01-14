import { Link } from "react-router-dom";

const Header = () => (
  <header className="flex justify-betweenp-40 bg-white fixed top-0 w-full z-10 shadow-lg py-4 px-8">
    <nav className="container mx-auto flex items-center justify-between">
      <Link to="/" className="flex items-center">
        <img src="/logo.svg" alt="Logo" width={50} height={50} />
      </Link>
      <Link
        to="/user/create"
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition duration-300"
      >
        Create New User
      </Link>
    </nav>
  </header>
);

export default Header;
