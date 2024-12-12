import { ReactNode } from "react";
import Dropdown from "react-bootstrap/Dropdown";

interface SelectDropdownProps {
  anyCategoryError: boolean;
  filteredItems: string[];
  children: ReactNode;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setSelectedItem: (item: string) => void;
}

export default function SelectDropdown({
  children,
  anyCategoryError,
  filteredItems,
  searchTerm,
  setSearchTerm,
  setSelectedItem,
}: SelectDropdownProps) {
  return (
    <div className="position-relative select-dropdown">
      <Dropdown drop="down-centered">
        <Dropdown.Toggle
          id="dropdown-button"
          variant={anyCategoryError ? "outline-danger" : "outline-secondary"}
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
                placeholder="Enter Category Name"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <label htmlFor="floatingInput">Enter Category Name</label>
            </div>
          </div>
          <div className="menu-content">
            <ul className="list-unstyled mb-0">
              {filteredItems.map((item, index) => (
                <Dropdown.Item
                  as="li"
                  key={index}
                  onClick={() => setSelectedItem(item)}
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
