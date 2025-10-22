import { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { FiLogOut, FiHeart, FiFolder } from "react-icons/fi";
import ThemeToggle from "../../components/ThemeToggle";

const NavBar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        // console.log("Signed out successfully");
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const publicNavLinks = (
    <>
      <li>
        <NavLink to="/" className="font-display text-base hover:text-[#5d4634] transition-colors">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/artifacts" className="font-display text-base hover:text-[#5d4634] transition-colors">
          All Artifacts
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className="font-display text-base hover:text-[#5d4634] transition-colors">
          About
        </NavLink>
      </li>
    </>
  );

  const privateNavLinks = (
    <>
      <li>
        <NavLink to="/" className="font-display text-base hover:text-[#5d4634] transition-colors">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/artifacts" className="font-display text-base hover:text-[#5d4634] transition-colors">
          All Artifacts
        </NavLink>
      </li>
      <li>
        <NavLink to="/add-artifact" className="font-display text-base hover:text-[#5d4634] transition-colors">
          Add Artifact
        </NavLink>
      </li>
      <li>
        <NavLink to="/my-artifacts" className="font-display text-base hover:text-[#5d4634] transition-colors">
          My Artifacts
        </NavLink>
      </li>
      <li>
        <NavLink to="/liked-artifacts" className="font-display text-base hover:text-[#5d4634] transition-colors">
          Liked Artifacts
        </NavLink>
      </li>
      <li>
        <NavLink to="/collections" className="font-display text-base hover:text-[#5d4634] transition-colors">
          Collections
        </NavLink>
      </li>
      <li>
        <NavLink to="/comparison" className="font-display text-base hover:text-[#5d4634] transition-colors">
          Compare
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className="font-display text-base hover:text-[#5d4634] transition-colors">
          About
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-[#fdf6e3] text-gray-800 font-serif shadow-lg sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {user ? privateNavLinks : publicNavLinks}
            </ul>
          </div>
          <Link
            to="/"
            className="btn btn-ghost normal-case text-xl font-display text-[#5d4634] hover:bg-transparent"
          >
            🏺 Artifacts Tracker
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            {user ? privateNavLinks : publicNavLinks}
          </ul>
        </div>

        <div className="navbar-end">
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {!user ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/register"
                  className="btn btn-outline font-display border-[#5d4634] text-[#5d4634] hover:bg-[#5d4634] hover:text-[#fdf6e3]"
                >
                  Register
                </Link>
                <Link
                  to="/signIn"
                  className="btn font-display bg-[#5d4634] text-[#fdf6e3] hover:bg-[#4b3727]"
                >
                  Login
                </Link>
              </div>
            ) : (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full ring ring-[#5d4634] ring-offset-2">
                  <img
                    alt="User Profile"
                    src={user.photoURL || "/default-avatar.png"}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow bg-base-100 rounded-box w-60"
              >
                <li className="mb-2">
                  <span className="text-sm text-gray-600 font-medium">
                    {user.displayName}
                  </span>
                </li>
                <li>
                  <Link to="/my-artifacts" className="flex items-center gap-2">
                    <FiFolder /> My Artifacts
                  </Link>
                </li>
                <li>
                  <Link to="/liked-artifacts" className="flex items-center gap-2">
                    <FiHeart /> Liked Artifacts
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 text-red-600"
                  >
                    <FiLogOut /> Logout
                  </button>
                </li>
              </ul>
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
