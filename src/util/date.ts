import { TZDate } from "@date-fns/tz";
import { format } from "date-fns";
import { ja } from "date-fns/locale/ja";

export const formatArticleDate = (date: Date): string => {
  const date_ = new TZDate(date, "Asia/Tokyo");

  return format(date_, "yyyy/M/d", {
    locale: ja,
  });
};

export const formatDate = (
  date_: number | TZDate | Date,
  displaySec = false,
): string => {
  const timestamp = typeof date_ === "number" ? date_ : date_.getTime();
  const date = new TZDate(timestamp, "Asia/Tokyo");

  return format(date, `yyyy/M/d HH:mm${displaySec ? ":ss" : ""}`, {
    locale: ja,
  });
};
