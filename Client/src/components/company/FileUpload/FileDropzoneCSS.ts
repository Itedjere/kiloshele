export const baseStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "30px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "rgb(150, 146, 146)",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

export const focusedStyle: React.CSSProperties = {
  borderColor: "#2196f3",
};

export const acceptStyle: React.CSSProperties = {
  borderColor: "#00e676",
};

export const rejectStyle: React.CSSProperties = {
  borderColor: "#ff1744",
};

// Based on the default React Dropzone image thumbnail example
// The `thumbButton` style positions the edit button in the bottom right corner of the thumbnail
export const thumbsContainer: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
  padding: 20,
};

export const thumb: React.CSSProperties = {
  position: "relative",
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 200,
  height: 200,
  padding: 4,
  boxSizing: "border-box",
};

export const thumbInner: React.CSSProperties = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

export const img: React.CSSProperties = {
  display: "block",
  width: "auto",
  height: "100%",
};

export const thumbButtonEdit: React.CSSProperties = {
  position: "absolute",
  left: 10,
  bottom: 10,
};

export const thumbButtonDelete: React.CSSProperties = {
  position: "absolute",
  right: 10,
  top: 10,
};
