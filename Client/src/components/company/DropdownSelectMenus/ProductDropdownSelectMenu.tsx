import { ReactNode, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { BiSolidCategory } from "react-icons/bi";
import ButtonLoading from "../LoadingSkeletons/ButtonLoading";
import { ProductType } from "../../../utitlities/typesUtils";

interface ProductDropdownSelectMenuProps {
  children: ReactNode;
  filterLoading: boolean;
  noProductSelectedError: boolean;
  products: ProductType[];
  handleSelectedProduct: (product: ProductType) => void;
  handleProductsFilteration: (searchTerm: string) => void;
  handleScroll: (
    event: React.UIEvent<HTMLDivElement>,
    searchTerm: string
  ) => void;
}

export default function ProductDropdownSelectMenu({
  children,
  filterLoading,
  noProductSelectedError,
  products,
  handleSelectedProduct,
  handleProductsFilteration,
  handleScroll,
}: ProductDropdownSelectMenuProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    handleProductsFilteration(searchTerm);
  };

  return (
    <div className="position-relative select-dropdown">
      <Dropdown drop="down-centered">
        <Dropdown.Toggle
          id="dropdown-button"
          variant={
            noProductSelectedError ? "outline-danger" : "outline-secondary"
          }
          className="w-100 text-start"
        >
          {children}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <div className="p-2">
            <div className="form-floating">
              <input
                type="text"
                value={searchTerm}
                className="form-control form-control-sm"
                id="floatingInput"
                placeholder="Enter name to search"
                onChange={handleSearchInputChange}
              />
              <label htmlFor="floatingInput">Enter name to search</label>
            </div>
          </div>
          <div
            className="menu-content"
            onScroll={(event) => handleScroll(event, searchTerm)}
          >
            <ul className="list-unstyled mb-0">
              {filterLoading ? (
                <Dropdown.Item as="li">
                  <div>
                    <ButtonLoading message="Fetching Products, Please Wait" />
                  </div>
                </Dropdown.Item>
              ) : (
                <>
                  {products.length === 0 ? (
                    <Dropdown.Item as="li">
                      No Products Or Services Found
                    </Dropdown.Item>
                  ) : (
                    products.map((product) => (
                      <Dropdown.Item
                        as="li"
                        key={product._id}
                        onClick={() => handleSelectedProduct(product)}
                      >
                        <div>{product.name}</div>
                        <div
                          className="d-flex justify-content-between"
                          style={{ fontSize: 12 }}
                        >
                          <small>
                            <BiSolidCategory /> {product.category}
                          </small>
                          <small>{product.type}</small>
                        </div>
                      </Dropdown.Item>
                    ))
                  )}
                </>
              )}
            </ul>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
