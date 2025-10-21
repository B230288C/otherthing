import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const CalendarPage = () => {
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);

  // 当用户选择时间段（拖拉）时触发
  const handleSelect = (info) => {
    const title = prompt("请输入预约标题（如：Meeting）：");
    if (title) {
      setEvents((prev) => [
        ...prev,
        {
          title,
          start: info.start,
          end: info.end,
        },
      ]);
    }
  };

  // 点击已存在的事件
  const handleEventClick = (info) => {
    if (confirm(`是否删除 "${info.event.title}"？`)) {
      info.event.remove();
    }
  };

  return (
    <div className="p-6">
      <FullCalendar
        ref={calendarRef}
        plugins={[timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        selectable={true}
        editable={true}
        nowIndicator={true}
        allDaySlot={false}
        slotMinTime="08:00:00"
        slotMaxTime="18:00:00"
        slotDuration="00:30:00"
        selectMirror={true}
        select={handleSelect}
        eventClick={handleEventClick}
        events={events}
        height="85vh"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "timeGridDay,timeGridWeek",
        }}
      />
    </div>
  );
};

export default CalendarPage;
