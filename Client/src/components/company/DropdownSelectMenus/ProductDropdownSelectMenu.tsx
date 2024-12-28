import { ReactNode } from "react";
import { Dropdown } from "react-bootstrap";
import { BiSolidCategory } from "react-icons/bi";
import ButtonLoading from "../LoadingSkeletons/ButtonLoading";
import { ProductType } from "../../../utitlities/typesUtils";
import InfiniteScroll from "react-infinite-scroll-component";

interface ProductDropdownSelectMenuProps {
  children: ReactNode;
  hasMoreProducts: boolean;
  filterLoading: boolean;
  noProductSelectedError: boolean;
  searchTerm: string;
  products: ProductType[];
  handleSelectedProduct: (product: ProductType) => void;
  fetchProducts: () => void;
  handleSearchInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProductDropdownSelectMenu({
  children,
  filterLoading,
  hasMoreProducts,
  noProductSelectedError,
  products,
  searchTerm,
  handleSelectedProduct,
  fetchProducts,
  handleSearchInputChange,
}: ProductDropdownSelectMenuProps) {
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
          <div className="menu-content" id="scrollableDiv">
            {filterLoading ? (
              <ul className="list-unstyled mb-0">
                <Dropdown.Item as="li">
                  <div>
                    <ButtonLoading message="Fetching Products, Please Wait" />
                  </div>
                </Dropdown.Item>
              </ul>
            ) : (
              <>
                {products.length === 0 ? (
                  <ul className="list-unstyled mb-0">
                    <Dropdown.Item as="li">
                      No Products Or Services Found
                    </Dropdown.Item>
                  </ul>
                ) : (
                  <>
                    {products.length < 10 ? (
                      <ul className="list-unstyled mb-0">
                        {products.map((product) => (
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
                        ))}
                      </ul>
                    ) : (
                      <InfiniteScroll
                        dataLength={products.length}
                        next={fetchProducts}
                        hasMore={hasMoreProducts}
                        loader={
                          <Dropdown.Item as="li">
                            <ButtonLoading message="Fetching Products" />
                          </Dropdown.Item>
                        }
                        endMessage={
                          <p style={{ textAlign: "center" }}>
                            <b>Yay! You have seen it all</b>
                          </p>
                        }
                        scrollableTarget="scrollableDiv"
                      >
                        <ul className="list-unstyled mb-0">
                          {products.map((product) => (
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
                          ))}
                        </ul>
                      </InfiniteScroll>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
