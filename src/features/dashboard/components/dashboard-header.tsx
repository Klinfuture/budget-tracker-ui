"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TimeHorizon } from "../dashboard";

interface DashboardHeaderProps {
  timeHorizon: string;
  setTimeHorizon: (val: string | TimeHorizon) => void;
}

const DashboardHeader = ({
  timeHorizon,
  setTimeHorizon,
}: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 mb-6">
      <div>
        <h1 className="text-4xl font-bold">Budget Planner</h1>
        <p className="">Plan and forecast your financial future</p>
      </div>
      <div className="flex gap-3">
        <Select
          value={timeHorizon}
          onValueChange={(value) => setTimeHorizon(value)}
          defaultValue="month"
        >
          <SelectTrigger
            className="w-[180px]"
            defaultValue={"monthly"}
            defaultChecked
          >
            <SelectValue placeholder="Horizon" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly View</SelectItem>
            <SelectItem value="quarterly">Quarterly View</SelectItem>
            <SelectItem value="yearly">Annual View</SelectItem>
            <SelectItem value="5-Years">5-Year Projection</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default DashboardHeader;
