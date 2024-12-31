export default function ButtonLoading({
  message = "Loading",
}: {
  message?: string;
}) {
  return (
    <>
      <span
        className="spinner-border spinner-border-sm me-2"
        aria-hidden="true"
      ></span>
      <span role="status">{message}...</span>
    </>
  );
}
