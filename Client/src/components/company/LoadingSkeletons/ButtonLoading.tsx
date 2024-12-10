export default function ButtonLoading() {
  return (
    <>
      <span
        className="spinner-border spinner-border-sm me-2"
        aria-hidden="true"
      ></span>
      <span role="status">Loading...</span>
    </>
  );
}
