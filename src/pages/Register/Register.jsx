import React, { useContext } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import SocialLogin from "../Shared/SocialLogin";
import { auth } from "../../firebase/firebase.init";
import registerPhoto from "../../assets/register/register.jpg";
const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const photoURL = form.photoURL.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;

  
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;

    if (!hasUpper || !hasLower || !isLongEnough) {
      return Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must contain at least 1 uppercase, 1 lowercase, and be 6 characters long.",
      });
    }

    try {
      const result = await createUser(email, password);
      await updateUserProfile({ displayName: name, photoURL });
      await auth.currentUser.reload();

      Swal.fire({
        icon: "success",
        title: "Welcome!",
        text: `${name}, your account has been created.`,
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (err) {
      // console.error(err);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.message,
      });
    }
  };

  return (
    <div className="hero min-h-screen bg-[#fdf6e3] font-serif">
      <div className="hero-content flex-col lg:flex-row w-full justify-center">
        <div className="hidden lg:flex w-1/2 justify-center">
          <img
            src={registerPhoto}
            alt="Ancient Scroll"
            className="rounded-lg shadow-xl max-w-[72%]"
          />
        </div>

        <div className="card w-full max-w-md bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="text-4xl font-bold text-[#5d4634] font-display text-center mb-6">
              Join the Journey
            </h2>

            <form onSubmit={handleRegister}>
              <label className="label text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Your name"
                className="input input-bordered w-full mb-2"
              />

              <label className="label text-sm font-medium">Photo URL</label>
              <input
                type="text"
                name="photoURL"
                required
                placeholder="Photo URL"
                className="input input-bordered w-full mb-2"
              />

              <label className="label text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                required
                placeholder="Your email"
                className="input input-bordered w-full mb-2"
              />

              <label className="label text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                required
                placeholder="Strong password"
                className="input input-bordered w-full mb-4"
              />

              <button
                type="submit"
                className="btn w-full bg-[#5d4634] text-[#fdf6e3] hover:bg-[#4b3727]"
              >
                Register
              </button>
            </form>

            <div className="divider">OR</div>

            <SocialLogin />

            <p className="text-sm text-center mt-5">
              Already a member?{" "}
              <Link
                to="/signIn"
                className="text-[#5d4634] font-medium hover:underline"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
