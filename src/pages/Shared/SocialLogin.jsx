import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import Swal from "sweetalert2";

const SocialLogin = ({ from }) => {
  const { signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        // console.log("Google Sign In Success:", result.user);
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome ${result.user.displayName}`,
          timer: 2000,
          showConfirmButton: false,
        });
        navigate(from || "/");
      })
      .catch((error) => {
        // console.error(error);
        Swal.fire({
          icon: "error",
          title: "Google Sign In Failed",
          text: error.message,
        });
      });
  };

  return (
    <div className="w-full">
      <button
        onClick={handleGoogleSignIn}
        className="btn w-full bg-white border border-[#dcdcdc] text-gray-700 hover:shadow-md transition-all duration-300"
      >
        <svg
          className="w-5 h-5 mr-2"
          aria-label="Google logo"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 533.5 544.3"
        >
          <path
            fill="#4285f4"
            d="M533.5 278.4c0-17.4-1.6-34.1-4.6-50.2H272v95h146.5c-6.3 34.3-25.3 63.4-54 82.8v68h87.2c51-47 81.8-116.2 81.8-195.6z"
          />
          <path
            fill="#34a853"
            d="M272 544.3c73.7 0 135.4-24.5 180.5-66.4l-87.2-68c-24.2 16.3-55 25.8-93.3 25.8-71.8 0-132.5-48.3-154.2-113.2H27.4v71.4C72.6 482.2 165.3 544.3 272 544.3z"
          />
          <path
            fill="#fbbc04"
            d="M117.8 322.5c-10.3-30.4-10.3-63.1 0-93.5v-71.4H27.4c-33.5 66.9-33.5 142.3 0 209.2l90.4-44.3z"
          />
          <path
            fill="#ea4335"
            d="M272 107.7c39.7 0 75.3 13.7 103.4 40.6l77.6-77.6C407.3 24.5 345.6 0 272 0 165.3 0 72.6 62 27.4 157.6l90.4 71.4C139.5 156 200.2 107.7 272 107.7z"
          />
        </svg>
        <span className="font-medium">Continue with Google</span>
      </button>
    </div>
  );
};

export default SocialLogin;
