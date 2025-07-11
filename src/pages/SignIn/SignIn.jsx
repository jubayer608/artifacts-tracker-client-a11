import { useContext, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import SocialLogin from "../Shared/SocialLogin";
import Swal from "sweetalert2";
import { FaLock, FaEnvelope } from "react-icons/fa";
import loginPhoto from "../../assets/login/login.jpg";

const SignIn = () => {
  const { signInUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await signInUser(email, password);
      console.log("Login successful:", result.user);

      Swal.fire({
        icon: "success",
        title: "Welcome back!",
        text: `Logged in as ${result.user.displayName || result.user.email}`,
        timer: 2000,
        showConfirmButton: false,
      });

      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login error:", error);

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Incorrect email or password!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero min-h-screen bg-[#fdf6e3] font-serif">
      <div className="hero-content flex-col lg:flex-row-reverse w-full justify-center">
        <div className="hidden lg:block w-1/2 p-6">
          <img
            src={loginPhoto}
            alt="Historical Login Banner"
            className="rounded-lg max-w-[58%] shadow-2xl"
          />
        </div>

        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="text-3xl font-display text-center text-[#5d4634] mb-2">
              Sign In to Continue
            </h2>
            <form onSubmit={handleSignIn}>
              <label className="label text-sm font-medium">Email</label>
              <div className="relative mb-4">
                <span className="absolute left-3 top-3 text-gray-400">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="input input-bordered w-full pl-10"
                />
              </div>

              <label className="label text-sm font-medium">Password</label>
              <div className="relative mb-4">
                <span className="absolute left-3 top-3 text-gray-400">
                  <FaLock />
                </span>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  className="input input-bordered w-full pl-10"
                />
              </div>

              <button
                type="submit"
                className={`btn w-full bg-[#5d4634] text-[#fdf6e3] hover:bg-[#4b3727] transition-all duration-300 ${
                  loading && "btn-disabled"
                }`}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <div className="divider">OR</div>
            <SocialLogin from={from} />

            <p className="text-sm text-center mt-4">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-[#5d4634] font-medium hover:underline"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
