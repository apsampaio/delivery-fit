import "./styles.css";
import Eye from "../../assets/Eye.svg";
import EyeClose from "../../assets/EyeClose.svg";

import { InputHTMLAttributes, useState } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  children: React.ReactNode;
  isPassword: boolean;
};

const Input: React.FC<InputProps> = ({ children, isPassword, ...rest }) => {
  const [visible, setVisible] = useState(isPassword);

  const toggleVisibility = () => setVisible((prev) => !prev);

  return (
    <div className="input-container">
      {children}
      <input type={!visible ? "text" : "password"} {...rest} />
      {isPassword && (
        <img
          src={visible ? Eye : EyeClose}
          alt="visibility-icon"
          className="visiblity"
          onClick={toggleVisibility}
        />
      )}
    </div>
  );
};

export { Input };
