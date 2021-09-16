import { format, parse } from "date-fns";

const stringToDate = (text) => {
  let date = parse(text, 'dd/MM/yyyy', new Date())
  return format(date, "yyyy-MM-dd");
}

export default stringToDate;