import dayjs from "dayjs";

export const checkIfPastDate = (date: Date) => {
  return dayjs(date).isBefore(new Date(), "day");
};

export const getTime = (time: string | undefined) => {
  if (time) {
    if (typeof time === "string") {
      const startDate = new Date();

      const [startTimePart, startAmPm] = time.split(" ");
      let [startHours, startMinutes] = startTimePart
        .split(":")
        .map((item) => Number(item));

      if (startAmPm === "PM" && startHours !== 12) {
        startHours = Number(startHours) + 12;
      }
      // Convert hours to 0 if AM and 12
      if (startAmPm === "AM" && startHours === 12) {
        startHours = 0;
      }

      startDate.setHours(startHours);
      startDate.setMinutes(startMinutes);

      return startDate;
    }

    return dayjs(time);
  }
};
