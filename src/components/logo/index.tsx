import React from "react";
import logoImg from "/edulogo.svg?url";

interface LogoProps {
  containerClass?: string;
  imgClass?: string;
  textClass?: string;
}

const Logo: React.FC<LogoProps> = ({
  containerClass = "",
  imgClass = "",
  textClass = "",
}) => {
  return (
    <div className={`flex items-center gap-4 ${containerClass}`}>
      <img src={logoImg} alt="Logo EduQuiz" className={imgClass} />
      <h3 className={`font-bold text-2xl text-[#202020] ${textClass}`}>
        EduQuiz
      </h3>
    </div>
  );
};

export default Logo;
