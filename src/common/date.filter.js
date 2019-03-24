import { default as format } from "date-fns/format";

export const yearFormat = date => {
  return format(new Date(date), "YYYY-MM-DD");
};

export const hourFormat = date => {
  return format(new Date(date), "YYYY-MM-DD, HH:mm")
}