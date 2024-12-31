export default function StaffAssignedFilter() {
  return (
    <div className="form-floating">
      <select
        className={`form-select`}
        id="floatingSelect"
        aria-label="label for payment method"
      >
        <option value="">Click Here</option>
        <option value="CARD">Card</option>
        <option value="CASH">Cash</option>
        <option value="BANK_TRANSFER">Bank Transfer</option>
      </select>
      <label htmlFor="floatingSelect">Select Staff Assigned</label>
    </div>
  );
}
