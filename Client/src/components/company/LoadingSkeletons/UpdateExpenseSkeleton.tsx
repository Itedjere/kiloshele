import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function UpdateExpenseSkeleton() {
  return (
    <SkeletonTheme baseColor="#cacaca" height={30}>
      <div className="row">
        <div className="col-sm-12">
          <Skeleton height={100} />
        </div>
        <div className="col-sm-12">
          <Skeleton />
        </div>
        <div className="col-sm-12">
          <Skeleton />
        </div>
        <div className="col-sm-12">
          <Skeleton />
        </div>
        <div className="col-sm-12">
          <Skeleton />
        </div>
        <div className="col-sm-12">
          <Skeleton />
        </div>
      </div>
    </SkeletonTheme>
  );
}
