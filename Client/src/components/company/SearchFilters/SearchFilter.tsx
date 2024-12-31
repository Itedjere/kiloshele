import { FaFilter } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";

interface SearchFilterProps {
  handleToggleFilterContainer: () => void;
}

export default function SearchFilter({
  handleToggleFilterContainer,
}: SearchFilterProps) {
  return (
    <>
      <div className="col-10 col-md-8 col-lg-4">
        <div className="input-group mb-3 mb-sm-0">
          <span className="input-group-text" id="basic-addon1">
            <IoSearchSharp />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>
      </div>
      <div className="col-2 col-md-4 col-lg-8 text-md-end">
        <button
          type="button"
          className="btn border"
          onClick={handleToggleFilterContainer}
        >
          <FaFilter />
        </button>
      </div>
    </>
  );
}
