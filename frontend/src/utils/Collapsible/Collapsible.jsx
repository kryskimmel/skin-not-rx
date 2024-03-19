function Collapsible({ isOpen, onToggle, label, className, children }) {
  return (
    <div>
      <button onClick={onToggle} className={className}>
        {label}
      </button>
      {isOpen && <div className="toggle">{children}</div>}
    </div>
  );
}

export default Collapsible;