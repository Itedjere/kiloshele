import { StatsCardProps } from "../../../utitlities/typesUtils";

export default function StatsCard({
  icon,
  statsMessage,
  statsValue,
}: StatsCardProps) {
  return (
    <div className="card">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between p-4">
          {icon}
          <div className="ms-3">
            <p className="mb-2">{statsMessage}</p>
            <h6 className="mb-0">{statsValue}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}
