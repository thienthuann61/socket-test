import { useEffect, useState, useMemo, FC } from "react";
import DashboardInfo from "../../components/dashboard-item";
import { DashboardReport, SocketSetup } from "../../utils/types";
import { request } from "../../utils/request";
import { AxiosResponse } from "axios";

type DataReport = {
  approved: number;
  pending: number;
  rejected: number;
  total: number;
};

type Props = {
  socket: SocketSetup;
};

const Dashboard: FC<Props> = ({ socket }) => {
  const [dataReport, setDataReport] = useState<DataReport>({
    approved: 0,
    pending: 0,
    rejected: 0,
    total: 0,
  });
  const { approved, pending, rejected, total } = dataReport;

  useEffect(() => {
    request
      .get("/dashboard/report")
      .then(({ data }: AxiosResponse<DataReport>) => setDataReport(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket?.on("newBorrower", (data) => {
      setDataReport((prev) => ({
        ...prev,
        total: total + 1,
        [data.status]: dataReport[data.status as keyof typeof dataReport] + 1,
      }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [approved, pending, rejected, total]);

  const DATA_REPORT: DashboardReport[] = useMemo(
    () => [
      {
        id: 1,
        title: "Total",
        quantity: total || 0,
      },
      {
        id: 2,
        title: "Borrowers Approved",
        quantity: approved || 0,
      },
      {
        id: 3,
        title: "Borrowers Rejected",
        quantity: rejected || 0,
      },
      {
        id: 4,
        title: "Borrowers Pending",
        quantity: pending || 0,
      },
    ],
    [approved, pending, rejected, total]
  );
  return (
    <div className="dashboard-report">
      {DATA_REPORT.map((item) => (
        <DashboardInfo {...item} key={item.id} />
      ))}
    </div>
  );
};

export default Dashboard;
