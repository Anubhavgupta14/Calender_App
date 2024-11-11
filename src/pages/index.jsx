import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Logout from "@/components/ui/Logout"
import { createEvent, allEvent, editEvent, deleteEvent } from "./api/getDataApi";

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  // Function to fetch events
  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedEvents = await allEvent();
      // Assuming the API returns an array of event objects
      setEvents(fetchedEvents);
    } catch (err) {
      setError("Failed to fetch events. Please try again later.");
      console.error("Error fetching events:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateMonth = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };
  const getCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const daysFromPrevMonth = firstDay.getDay();
    const daysFromNextMonth = 6 - lastDay.getDay();

    const days = [];
    const prevMonth = new Date(year, month, 0);
    const prevMonthDays = prevMonth.getDate();
    for (
      let i = prevMonthDays - daysFromPrevMonth + 1;
      i <= prevMonthDays;
      i++
    ) {
      days.push({
        date: new Date(year, month - 1, i),
        isCurrentMonth: false,
      });
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    for (let i = 1; i <= daysFromNextMonth; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    return weeks;
  };

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setSelectedEvent(null);
    setNewEvent({
      title: "",
      date: formatDate(date),
      time: "12:00",
      description: "",
    });
    setIsDialogOpen(true);
  };

  const handleEventClick = (event, e) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setNewEvent({
      ...event,
      date: new Date(event.date).toISOString().split("T")[0],
    });
    setIsDialogOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedEvent) {
        
        await editEvent(selectedEvent._id, newEvent);
        setEvents(
          events.map((event) =>
            event._id === selectedEvent._id
              ? { ...newEvent, _id: event._id }
              : event
          )
        );

        
      } else {
        await createEvent(newEvent);
        await fetchEvents();
      }

      setIsDialogOpen(false);
      setSelectedEvent(null);
      setSelectedDate(null);
    } catch (error) {
      console.error("Failed to handle event:", error);
      setError("Failed to save event. Please try again.");
    }
  };


  const handleDelete = async () => {
    if (selectedEvent) {
      try {
        await deleteEvent(selectedEvent._id);
        setEvents(events.filter(event => event._id !== selectedEvent._id));
        setIsDialogOpen(false);
        setSelectedEvent(null);
  
        await fetchEvents();
      } catch (error) {
        console.error('Failed to delete event:', error);
        setError('Failed to delete event. Please try again.');
      }
    }
  };

  const getEventsForDate = (date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.date).toISOString().split("T")[0];
      const calendarDate = formatDate(date);
      return eventDate === calendarDate;
    });
  };

  const weeks = getCalendarDays();

  return (
    <>
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-white">
            {currentDate.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateMonth(-1)}
              className="text-white border-gray-600"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateMonth(1)}
              className="text-white border-gray-600"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <Logout/>
      </div>

      <div className="rounded-lg border border-gray-600 shadow-sm">
        <div className="grid grid-cols-7 gap-px bg-gray-800">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="bg-gray-700 p-2 text-center text-sm font-medium text-white border border-white"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-px bg-gray-800">
          {weeks.map((week, weekIndex) =>
            week.map((day, dayIndex) => (
              <div
                key={`${weekIndex}-${dayIndex}`}
                className={`min-h-[120px] bg-gray-800 p-2 border border-white ${
                  day.isCurrentMonth ? "text-white" : "text-gray-500"
                } relative group hover:bg-gray-700`}
                onClick={() => handleDateClick(day.date)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm">{day.date.getDate()}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 opacity-0 hover:opacity-100 group-hover:opacity-100 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDateClick(day.date);
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-1 space-y-1">
                  {getEventsForDate(day.date).map((event) => (
                    <div
                      key={event._id} // Changed from event.id to event._id to match API data
                      onClick={(e) => handleEventClick(event, e)}
                      className="cursor-pointer rounded bg-blue-600 p-1 text-xs text-white hover:bg-blue-700"
                    >
                      {event.time} - {event.title}
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>
              {selectedEvent ? "Edit Event" : "Add New Event"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              name="title"
              placeholder="Event Title"
              value={newEvent.title}
              onChange={handleInputChange}
              required
              className="bg-gray-700 text-white border-gray-600"
            />

            <div className=" gap-4">
              {/* <Input
                type="date"
                name="date"
                value={newEvent.date}
                onChange={handleInputChange}
                required
                className="bg-gray-700 text-white border-gray-600"
              /> */}
              <Input
                type="time"
                name="time"
                value={newEvent.time}
                onChange={handleInputChange}
                required
                className="bg-gray-700 text-white border-gray-600"
              />
            </div>

            <Textarea
              name="description"
              placeholder="Event Description"
              value={newEvent.description}
              onChange={handleInputChange}
              rows={3}
              className="bg-gray-700 text-white border-gray-600"
            />

            <DialogFooter className="gap-2">
              {selectedEvent && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Delete
                </Button>
              )}
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                {selectedEvent ? "Update" : "Create"} Event
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
    </>
  );
};

export default CalendarView;
