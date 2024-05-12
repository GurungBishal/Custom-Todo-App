import dayjs from "dayjs";

export const formatDate = (date: Date) => {
  return dayjs(date).format("YYYY-MM-DD");
};

export const getTime = (time: string | Date | undefined) => {
  if (typeof time === "string") {
    if (typeof time === "string") {
      const startDate = new Date();

      const [startTimePart, startAmPm] = time.split(" ");
      let [startHours, startMinutes] = startTimePart.split(":");

      if (startAmPm === "PM" && startHours !== "12") {
        startHours = String(Number(startHours) + 12);
      }
      // Convert hours to 00 if AM and 12
      if (startAmPm === "AM" && startHours === "12") {
        startHours = "00";
      }

      startDate.setHours(startHours as unknown as number);
      startDate.setMinutes(startMinutes as unknown as number);

      return startDate;
    }

    return dayjs(time);
  }

  return time;
};
