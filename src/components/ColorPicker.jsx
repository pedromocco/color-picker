import React from "react";
import { useState } from "react";
import "./ColorPicker.css";

const ColorPicker = () => {
  const [hex, setHex] = useState("#FFFFFF");
  const [rgb, setRgb] = useState({ r: 255, g: 255, b: 255 });
  const [hsl, setHsl] = useState({ h: 0.0, s: 0.0, l: 100.0 });

  const hexToRgb = (hex) => {
    hex = hex.replace(/^#/, "");

    let bigint = parseInt(hex, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    return { r, g, b };
  };

  const rgbToHsl = (r, g, b) => {
    (r /= 255), (g /= 255), (b /= 255);

    let max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
  };

  const hexToHsl = (hex) => {
    let rgb = hexToRgb(hex);
    return rgbToHsl(rgb.r, rgb.g, rgb.b);
  };

  const handleColorChange = (e) => {
    setHex(e.target.value);
    const rgbValues = hexToRgb(e.target.value);
    const hlsValues = hexToHsl(e.target.value);
    setRgb(rgbValues);
    setHsl(hlsValues);
  };

  return (
    <>
      <div className="container">
        <div className="container-color">
          <h2>
            Select a{" "}
            <span
              style={{ color: hex, fontWeight: "bolder", fontSize: "40px" }}>
              color
            </span>{" "}
            please 😊
          </h2>
          <div className="color-display" style={{ background: hex }}>
            <p>Color: {hex} </p>
          </div>

          <label>¡Pick here!</label>

          <input type="color" value={hex} onChange={handleColorChange} />

          <div>
            <p>
              Hex: <span style={{ color: hex }}>{hex}</span>
            </p>

            <p>
              RGB:{" "}
              <span style={{ color: hex }}>
                {rgb.r}, {rgb.g}, {rgb.b}
              </span>
            </p>

            <p>
              HSL:{" "}
              <span style={{ color: hex }}>
                {hsl.h?.toFixed(1)}°, {hsl.s?.toFixed(1)}%, {hsl.l?.toFixed(1)}%
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ColorPicker;
