import "./styles.css";
import Eye from "../../assets/Eye.svg";
import EyeClose from "../../assets/EyeClose.svg";

import { InputHTMLAttributes, useState } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  children: React.ReactNode;
  isPassword: boolean;
};

const Input: React.FC<InputProps> = ({ children, isPassword, ...rest }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible((prev) => !prev);

  return (
    <div className="input-container">
      {children}
      <div className="input-divider"></div>
      <input type="text" {...rest} />
      {isPassword && (
        <img
          src={visible ? Eye : EyeClose}
          alt="visibility-icon"
          className="visiblity"
        />
      )}
    </div>
  );
};

export { Input };
