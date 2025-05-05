import OverviewItemCard from "../../components/teacher/overview/OverviewItemCard";
import ReadOnlySeatLayout from "../../components/teacher/overview/ReadOnlySeatLayout";

export default function Overview() {
  return (
    <>
      <OverviewItemCard title={"Seating"}><ReadOnlySeatLayout /></OverviewItemCard>
    </>
  );
}
