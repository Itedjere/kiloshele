import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function DashboardSkeleton() {
  return (
    <SkeletonTheme baseColor="#cacaca" height={200}>
      <div className="row g-4">
        <div className="col-sm-12 col-md-4">
          <Skeleton />
        </div>
        <div className="col-sm-12 col-md-4">
          <Skeleton />
        </div>
        <div className="col-sm-12 col-md-4">
          <Skeleton />
        </div>
        <div className="col-sm-12 d-none d-sm-block col-md-4">
          <Skeleton />
        </div>
        <div className="col-sm-12 d-none d-sm-block col-md-4">
          <Skeleton />
        </div>
        <div className="col-sm-12 d-none d-sm-block col-md-4">
          <Skeleton />
        </div>
      </div>
    </SkeletonTheme>
  );
}
