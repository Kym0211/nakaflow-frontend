import React from "react";

const Footer: React.FC = () => {
  return (
    <footer>
      <div>
        Built and maintained by{" "}
        <a href="https://chainflow.io">Chainflow</a>
        {" | "}
        Open source on{" "}
        <a href="https://github.com/ChainflowSOL/nakomoto-coefficient-calculator">
          GitHub
        </a>
      </div>

      <style jsx>{`
        footer {
          text-align: center;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
