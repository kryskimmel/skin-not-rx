import { useState } from "react";

const Collapsible = (props) => {
    const [open, setOpen] = useState(false);
    const toggle = () => {
      setOpen(!open);
    };
    
    return (
      <div>
      <button onClick={toggle} className={props.className}>{props.label}</button>
      {open && (
        <div className="toggle">
          {props.children}
        </div>
      )}
    </div>
    );
  };
export default Collapsible;