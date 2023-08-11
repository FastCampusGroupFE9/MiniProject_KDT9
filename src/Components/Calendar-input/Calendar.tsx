import { useState } from "react";
import { DateRange, Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function MyDateRangePicker() {
  const [state, setState] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: undefined,
      key: "selection",
    },
  ]);

  const handleSelect = (ranges: { [key: string]: Range }) => {
    setState([ranges["selection"]]);
  };

  return (
    <DateRange
      editableDateInputs={true}
      onChange={handleSelect}
      moveRangeOnFirstSelection={false}
      months={2}
      ranges={state}
    />
  );
}
