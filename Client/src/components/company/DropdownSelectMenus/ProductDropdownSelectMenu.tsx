import { Dropdown } from "react-bootstrap";
import { BiSolidCategory } from "react-icons/bi";

export default function ProductDropdownSelectMenu() {
  return (
    <div className="position-relative select-dropdown">
      <Dropdown drop="down-centered">
        <Dropdown.Toggle
          id="dropdown-button"
          variant={"outline-secondary"}
          className="w-100 text-start"
        >
          <small>Product / Service</small>
          <p className="mb-0">Click here to select product / service</p>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <div className="p-2">
            <div className="form-floating">
              <input
                type="text"
                value=""
                className="form-control form-control-sm"
                id="floatingInput"
                placeholder="Enter name or category to search"
              />
              <label htmlFor="floatingInput">
                Enter name or category to search
              </label>
            </div>
          </div>
          <div className="menu-content">
            <ul className="list-unstyled mb-0">
              <Dropdown.Item as="li">
                <div>1 Plate of rice and beans</div>
                <div
                  className="d-flex justify-content-between"
                  style={{ fontSize: 12 }}
                >
                  <small>
                    <BiSolidCategory /> Clothes and Laundry
                  </small>
                  <small>Service</small>
                </div>
              </Dropdown.Item>
              <Dropdown.Item as="li">
                <div>12Kg Kings Groundnut oil</div>
                <div
                  className="d-flex justify-content-between"
                  style={{ fontSize: 12 }}
                >
                  <small>
                    <BiSolidCategory /> Clothes and Laundry
                  </small>
                  <small>Product</small>
                </div>
              </Dropdown.Item>
              <Dropdown.Item as="li">
                <div>1 Paint rubber of garri</div>
                <div
                  className="d-flex justify-content-between"
                  style={{ fontSize: 12 }}
                >
                  <small style={{ fontSize: 12 }}>
                    <BiSolidCategory /> Clothes and Laundry
                  </small>
                  <small>Service</small>
                </div>
              </Dropdown.Item>
              <Dropdown.Item as="li">
                <div>1 Paint rubber of garri</div>
                <div
                  className="d-flex justify-content-between"
                  style={{ fontSize: 12 }}
                >
                  <small style={{ fontSize: 12 }}>
                    <BiSolidCategory /> Clothes and Laundry
                  </small>
                  <small>Product</small>
                </div>
              </Dropdown.Item>
              <Dropdown.Item as="li">
                <div>1 Paint rubber of garri</div>
                <div
                  className="d-flex justify-content-between"
                  style={{ fontSize: 12 }}
                >
                  <small style={{ fontSize: 12 }}>
                    <BiSolidCategory /> Clothes and Laundry
                  </small>
                  <small>Service</small>
                </div>
              </Dropdown.Item>
              <Dropdown.Item as="li">
                <div>1 Paint rubber of garri</div>
                <div
                  className="d-flex justify-content-between"
                  style={{ fontSize: 12 }}
                >
                  <small style={{ fontSize: 12 }}>
                    <BiSolidCategory /> Clothes and Laundry
                  </small>
                  <small>Product</small>
                </div>
              </Dropdown.Item>
              <Dropdown.Item as="li">
                <div>1 Paint rubber of garri</div>
                <div
                  className="d-flex justify-content-between"
                  style={{ fontSize: 12 }}
                >
                  <small style={{ fontSize: 12 }}>
                    <BiSolidCategory /> Clothes and Laundry
                  </small>
                  <small>Service</small>
                </div>
              </Dropdown.Item>
            </ul>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
