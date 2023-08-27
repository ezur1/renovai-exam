import DriversTable from "@/components/DriversTable";
import AssignmentsTable from "@/components/AssignmentsTable";

export default function Home() {
  return (
    <main className="flex flex-wrap">
      <div className="flex flex-col xl:mr-8">
        <AssignmentsTable />
      </div>
      <div className="flex flex-col xl:border-l xl:pl-8">
        <DriversTable />
      </div>
    </main>
  );
}
