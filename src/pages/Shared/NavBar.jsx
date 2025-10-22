import { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import {
  FiLogOut,
  FiHeart,
  FiFolder,
  FiSearch,
  FiUser,
  FiSun,
  FiMoon,
} from "react-icons/fi";

const NavBar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const { theme, toggleTheme, isDark } = useTheme();

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        // console.log("Signed out successfully");
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const navLinkClass = ({ isActive }) =>
    `font-display text-base transition-colors duration-200 ${
      isActive
        ? "text-primary font-semibold border-b-2 border-primary pb-1"
        : "text-base-content/80 hover:text-primary"
    }`;

  const publicNavLinks = (
    <>
      <NavLink to="/" className={navLinkClass}>
        Home
      </NavLink>
      <NavLink to="/artifacts" className={navLinkClass}>
        All Artifacts
      </NavLink>
      <NavLink to="/about" className={navLinkClass}>
        About
      </NavLink>
    </>
  );

  const protectedNavLinks = (
    <>
      <NavLink to="/" className={navLinkClass}>
        Home
      </NavLink>
      <NavLink to="/artifacts" className={navLinkClass}>
        All Artifacts
      </NavLink>
      <NavLink to="/add-artifact" className={navLinkClass}>
        Add Artifact
      </NavLink>
      <NavLink to="/my-artifacts" className={navLinkClass}>
        My Artifacts
      </NavLink>
      <NavLink to="/liked-artifacts" className={navLinkClass}>
        Favorites
      </NavLink>
      <NavLink to="/compare" className={navLinkClass}>
        Compare
      </NavLink>
    </>
  );

  return (
    <nav className="w-full bg-base-100 text-base-content font-serif shadow-lg sticky top-0 z-50 border-b border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="flex items-center space-x-2 text-xl font-display text-primary hover:text-primary/80 transition-colors duration-200"
            >
              <span className="text-2xl">🏺</span>
              <span className="font-bold">Artifacts Tracker</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {user ? protectedNavLinks : publicNavLinks}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-sm text-primary hover:bg-base-200 transition-all duration-200"
              title={`Switch to ${isDark ? "light" : "dark"} mode`}
            >
              {isDark ? (
                <FiSun className="w-4 h-4" />
              ) : (
                <FiMoon className="w-4 h-4" />
              )}
            </button>

            {!user ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/signIn"
                  className="btn btn-outline btn-sm font-display border-primary text-primary hover:bg-primary hover:text-primary-content transition-all duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="btn btn-sm font-display bg-primary text-primary-content hover:bg-primary/90 transition-all duration-200"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/search"
                  className="btn btn-ghost btn-sm text-primary hover:bg-base-200 transition-all duration-200"
                >
                  <FiSearch className="w-4 h-4" />
                </Link>
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-8 h-8 rounded-full ring-2 ring-[#5d4634] ring-offset-2">
                      <img
                        alt="User Profile"
                        src={user.photoURL || "/default-avatar.png"}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-lg bg-base-100 rounded-box w-64 border border-base-300"
                  >
                    <li className="mb-3 pb-2 border-b border-base-300">
                      <div className="flex items-center space-x-2">
                        <FiUser className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-base-content">
                          {user.displayName || user.email}
                        </span>
                      </div>
                    </li>
                    <li>
                      <Link
                        to="/my-artifacts"
                        className="flex items-center gap-2 hover:bg-base-200 rounded-md p-2"
                      >
                        <FiFolder className="w-4 h-4" /> My Artifacts
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/liked-artifacts"
                        className="flex items-center gap-2 hover:bg-base-200 rounded-md p-2"
                      >
                        <FiHeart className="w-4 h-4" /> Favorites
                      </Link>
                    </li>
                    <li className="pt-2 border-t border-base-300">
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 text-error hover:bg-error/10 rounded-md p-2 w-full text-left"
                      >
                        <FiLogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-sm"
                >
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
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-lg bg-base-100 rounded-box w-52 border border-base-300 list-none"
                >
                  {user ? protectedNavLinks : publicNavLinks}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
