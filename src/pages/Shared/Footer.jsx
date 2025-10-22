
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content font-serif mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-3 tracking-wide">
            Artifacts Tracker
          </h2>
          <p className="text-sm leading-relaxed">
            Explore, document, and preserve the wonders of human history. Join
            our community in tracking rare and ancient artifacts from around the
            world.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3 tracking-wide">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/artifacts" className="hover:underline">
                All Artifacts
              </a>
            </li>
            <li>
              <a href="/about" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="/newsletter" className="hover:underline">
                Newsletter
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3 tracking-wide">
            Contact & Social
          </h2>
          <p className="text-sm mb-3">Email: support@artifactstracker.com</p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-base-content hover:opacity-80 text-xl"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="text-base-content hover:opacity-80 text-xl"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="text-base-content hover:opacity-80 text-xl"
            >
              <FaInstagram />
            </a>
            <a
              href="mailto:support@artifactstracker.com"
              className="text-base-content hover:opacity-80 text-xl"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center border-t border-base-300 text-sm py-4 mt-6">
        © {new Date().getFullYear()} Artifacts Tracker. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
