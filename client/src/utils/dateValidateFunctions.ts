export const getTodayDate = () => {
  let today = new Date();
  let day: string | number = today.getDate();
  let month: string | number = today.getMonth() + 1;
  let year: string | number = today.getFullYear();
  if (day < 10) day = "0" + day;
  if (month < 10) month = "0" + month;
  return `${year}-${month}-${day}`;
};


export function textColours(status: string) {
  switch (status) {
    case "CONFIRMED":
      return "text-green-500";
    case "CANCELLED":
      return "text-red-600";
    case "COMPLETED":
      return "text-blue-500";
    case "PENDING" :
      return "text-yellow-500";
  }
}