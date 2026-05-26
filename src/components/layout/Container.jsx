export function Container({ children, style = {} }) {
  return (
    <div
      style={{
        maxWidth: 1400,
        margin: "0 auto",
        padding: "0 40px",
        width: "100%",
        boxSizing: "border-box",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
