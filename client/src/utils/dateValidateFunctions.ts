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
      return "text-green-600";
    case "CANCELLED":
      return "text-red-600";
    case "COMPLETED":
      return "text-blue-500";
    case "PENDING":
      return "text-yellow-500";
    case "CHECKED":
      return "text-blue-500";
  }
}

export function textPaymentStatusColours(status: string) {
  switch (status) {
    case "PAID":
      return "text-green-600";
    case "PENDING":
      return "text-yellow-500";
    case "FAILED":
      return "text-red-500";
    case "REFUNDED":
      return "text-blue-500";
  }
}


export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
};
