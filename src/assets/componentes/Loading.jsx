import React from "react";

const Loading = () => {
    return (
        <div className="loading-overlay" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "9999" }}>
            <div className="spinner"></div>
        </div>
    )
}

export default Loading;