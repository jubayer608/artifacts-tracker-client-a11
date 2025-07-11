import { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { FiLogOut, FiHeart, FiFolder } from "react-icons/fi";

const NavBar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className="font-display text-base">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/artifacts" className="font-display text-base">
          All Artifacts
        </NavLink>
      </li>
      <li>
        <NavLink to="/add-artifact" className="font-display text-base">
          Add Artifact
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-[#fdf6e3] text-gray-800 font-serif shadow-md sticky top-0 z-50">
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
            {navLinks}
          </ul>
        </div>
        <Link
          to="/"
          className="btn btn-ghost normal-case text-xl font-display text-[#5d4634]"
        >
          🏺 Artifacts Tracker
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">{navLinks}</ul>
      </div>

      <div className="navbar-end">
        {!user ? (
          <Link
            to="/signIn"
            className="btn font-display bg-[#5d4634] text-[#fdf6e3] hover:bg-[#4b3727]"
          >
            Login
          </Link>
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
  );
};

export default NavBar;
