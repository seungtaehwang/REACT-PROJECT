
const Header = ({ onGalleryType }) => {
  return (
    <header
      style={{
        padding: "15px 20px",
        background: "#2c3e50",
        color: "white",
        display: "flex",
        gap: "20px",
        alignItems: "center",
      }}
    >
      <button
        onClick={() => onGalleryType("Map")}
        style={{ cursor: "pointer" }}
      >
        Gallery Map
      </button>
      <button
        onClick={() => onGalleryType("Map-Api")}
        style={{ cursor: "pointer" }}
      >
        Gallery Map - Api
      </button>
      <button
        onClick={() => onGalleryType("Chart")}
        style={{ cursor: "pointer" }}
      >
        Gallery Chart
      </button>
    </header>
  );
};

export default Header;
