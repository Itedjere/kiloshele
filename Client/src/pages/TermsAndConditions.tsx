import { useState } from "react";

export default function TermsAndConditions() {
  const [agree, setAgree] = useState(true);
  return (
    <div>
      <h2>Terms & Conditions</h2>
      <p>Bla Bla Bla</p>

      <label htmlFor="agreement">Do you agree to bla bla bla</label>
      <input
        type="checkbox"
        name="agreement"
        id="agreement"
        onChange={(event) => setAgree(!event.target.checked)}
      />

      <button type="submit" disabled={agree}>
        Submit
      </button>
    </div>
  );
}
