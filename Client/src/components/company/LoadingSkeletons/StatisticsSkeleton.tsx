import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function StatisticsSkeleton() {
  return (
    <SkeletonTheme baseColor="#cacaca" height={150}>
      <div className="row">
        <div className="col-12 col-sm-6 col-md-4">
          <Skeleton />
        </div>
        <div className="col-12 col-sm-6 d-none d-sm-block col-md-4">
          <Skeleton />
        </div>
        <div className="col-12 col-sm-6 d-none d-md-block col-md-4">
          <Skeleton />
        </div>
      </div>
    </SkeletonTheme>
  );
}
