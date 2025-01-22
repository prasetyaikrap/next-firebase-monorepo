import { tz } from "@date-fns/tz";
import { format } from "date-fns";

type GetFormattedDate = {
  date: string;
  format?: string;
  timeZone?: string;
};

export function getFormattedDate({
  date,
  format: stringFormat = "EEEE, dd MMMM yyyy, HH:mm:ss",
  timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone,
}: GetFormattedDate) {
  if (!date) return { formattedDate: "-", timeZone };
  const formattedDate = format(new Date(date), stringFormat, {
    in: tz(timeZone),
  });

  return { formattedDate, timeZone };
}
