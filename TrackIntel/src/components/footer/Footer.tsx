import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        minHeight: "20vh",
        maxHeight: "30vh",
        marginTop: "60px",
        backgroundColor: "#2c3e50",
        color: "white",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p style={{ fontSize: "24px", textAlign: "center", marginBottom: "10px" }}>
        Built With ❤️ by{" "}
        <Link
          style={{ color: "#1abc9c", textDecoration: "none" }}
          to={"https://www.youtube.com/watch?v=kXwdf8osuFw"}
          target="_blank"
          rel="noopener noreferrer"
        >
          Team DisputedMinds
        </Link>
      </p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "10px",
        }}
      >
        {/* X (Twitter) Link */}
        <a
          href="https://x.com/TrackIntel2025"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "white", textDecoration: "none" }}
        >
          𝕏
        </a>

        {/* LinkedIn Link */}
        <a
          href="https://www.linkedin.com/in/disputedminds-5a578b352/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "white", textDecoration: "none" }}
        >
          LinkedIn
        </a>

        {/* Instagram Link */}
        <a
          href="https://www.instagram.com/disputedminds"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "white", textDecoration: "none" }}
        >
          Instagram
        </a>

        {/* Feedback Google Form Link */}
        <a
          href="https://forms.gle/your-google-form-link"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "white", textDecoration: "none" }}
        >
          Feedback
        </a>

        {/* WhatsApp Community Link */}
        <a
          href="https://chat.whatsapp.com/your-whatsapp-link"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "white", textDecoration: "none" }}
        >
          WhatsApp
        </a>
      </div>
    </footer>
  );
};

export default Footer;