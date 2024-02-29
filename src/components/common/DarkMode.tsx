import React, { useState } from "react";
import { useTheme } from "next-themes";

const DarkMode = () => {
  const { theme, setTheme } = useTheme();
  const [isCheck, setCheck] = useState<boolean>(false);
  const handleThemeChange = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  return (
    <div className="relative mr-4">
      <div className="toggle">
        {" "}
        <input type="checkbox" id="btn" onChange={handleThemeChange} />
        <label htmlFor="btn">
          <span className="thumb">
            <span className="light-dot"></span>
          </span>
        </label>
      </div>
    </div>
  );
};

export default DarkMode;
