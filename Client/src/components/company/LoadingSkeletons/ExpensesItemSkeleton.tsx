import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ExpensesItemSkeleton() {
  return (
    <li className="list-group-item">
      <SkeletonTheme baseColor="#cacaca" height={30}>
        <div className="row">
          <div className="col-7">
            <p className="mb-0">
              <Skeleton width={100} />
            </p>
            <small className="text-secondary">
              <Skeleton height={15} width={50} />
            </small>
          </div>
          <div className="col-5 d-flex justify-content-end align-items-center">
            <div className="text-end">
              <p className="mb-0">
                <Skeleton width={100} />
              </p>
              <small className="text-secondary">
                <Skeleton width={50} height={15} />
              </small>
            </div>
          </div>
        </div>
        <div className="row my-3">
          <div className="col-12 d-flex justify-content-between">
            <Skeleton width={60} />
            <Skeleton width={60} />
            <Skeleton width={60} />
          </div>
        </div>
      </SkeletonTheme>
    </li>
  );
}
