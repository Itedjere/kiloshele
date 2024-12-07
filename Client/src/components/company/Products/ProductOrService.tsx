import { GiConverseShoe } from "react-icons/gi";
import { SiOnlyoffice } from "react-icons/si";

interface ProductOrServiceProps {
  offerType: string;
  setOfferType: React.Dispatch<React.SetStateAction<string>>;
}

export default function ProductOrService({
  offerType,
  setOfferType,
}: ProductOrServiceProps) {
  return (
    <>
      <h6 className="mb-4">
        Are you adding a product or a service? Click one below
      </h6>
      <div className="row">
        <div className="col-12 mb-3">
          <div className="btn-group" role="group">
            <input
              type="radio"
              className="btn-check"
              name="offerType"
              id="btnradio1"
              value="product"
              onChange={() => setOfferType("Product")}
              checked={offerType === "Product"}
            />
            <label className="btn btn-outline-primary" htmlFor="btnradio1">
              <GiConverseShoe /> Add a Product
            </label>

            <input
              type="radio"
              className="btn-check"
              name="offerType"
              id="btnradio2"
              value="service"
              onChange={() => setOfferType("Service")}
              checked={offerType === "Service"}
            />
            <label className="btn btn-outline-primary" htmlFor="btnradio2">
              <SiOnlyoffice /> Add a Service
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
