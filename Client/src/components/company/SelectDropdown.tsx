import { ReactNode, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

interface SelectDropdownProps {
  filteredItems: string[];
  children: ReactNode;
  handleFilteredItems: (searchTerm: string) => void;
  handleSelectedItem: (item: string) => void;
}

export default function SelectDropdown({
  children,
  filteredItems,
  handleFilteredItems,
  handleSelectedItem,
}: SelectDropdownProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchTerm = (term: string) => {
    setSearchTerm(term);

    // Call Parent Methods here
    handleFilteredItems(term);
  };
  return (
    <div className="position-relative select-dropdown">
      <Dropdown drop="down-centered">
        <Dropdown.Toggle
          id="dropdown-button"
          variant="outline-secondary"
          className="w-100 text-start"
        >
          {children}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <div className="p-2">
            <form action="#">
              <div className="form-floating">
                <input
                  type="text"
                  value={searchTerm}
                  className="form-control form-control-sm"
                  id="floatingInput"
                  placeholder="Enter Category Name"
                  onChange={(e) => handleSearchTerm(e.target.value)}
                />
                <label htmlFor="floatingInput">Enter Category Name</label>
              </div>
            </form>
          </div>
          <div className="menu-content">
            <ul className="list-unstyled mb-0">
              {filteredItems.map((item, index) => (
                <Dropdown.Item
                  as="li"
                  key={index}
                  onClick={() => handleSelectedItem(item)}
                >
                  {item}
                </Dropdown.Item>
              ))}
            </ul>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
