import React, {useState} from 'react';
import {addDays} from 'date-fns';
import {DateRangePicker} from 'react-date-range';

export default function ListFilters() {
  // ByDateAsync?startDate=${encodeURIComponent(dateRange.startDate.toISOString())}&endDate=${encodeURIComponent(dateRange.endDate.toISOString())}
  
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
    key: 'selection',
  });

  const onChange = (item) => {
    setDateRange(item.selection);
  };
  
  return (
    <div className="list heading">
      <DateRangePicker
        onChange={onChange}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={[dateRange]}
        direction="horizontal"
      />
    </div>
  )
}