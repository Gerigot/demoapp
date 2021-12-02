import dayjs from "dayjs";

export const formatDate = (stringDate: string | null | undefined) => {
  return dayjs(stringDate).locale("it-ch").format("DD.MM.YYYY HH:mm");
};
