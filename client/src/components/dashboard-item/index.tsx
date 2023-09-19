import { FC } from "react";
import { DashboardReport } from "../../utils/types";

const DashboardInfo: FC<DashboardReport> = ({ quantity, title }) => {
  return (
    <div className="dashboard-info p-3 rounded d-flex flex-column gap-2 align-items-center shadow-lg">
      <h3 className="fs-5 m-0 text-uppercase">{title}</h3>
      <span className="fs-4">{quantity}</span>
    </div>
  );
};

export default DashboardInfo;
