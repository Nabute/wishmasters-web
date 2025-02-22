import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export const useFilters = () => {
  const formatDate = (value) => {
    if (!value) return "N/A";
    return dayjs(value).format("lll"); // LL => January 23, 2021
  };

  const formatDateOnly = (value) => {
    if (!value) return "N/A";
    return dayjs(value).format("MMM D, YYYY"); // LL => January 23, 2021
  };

  const formatDateOutgoing = (value) => {
    if (!value) return "N/A";
    return dayjs(value).format("YYYY-MM-DD"); // LL => January 23, 2021
  };

  const formatTime = (value) => {
    if (!value) return "N/A";
    return dayjs(value).format("LT"); // LT => 8:02 PM
  };

  const formatDateFromNow = (value) => {
    if (!value) return "N/A";
    return dayjs(value).fromNow();
  };

  function formatPhone(phoneNumber: string): string {
    if (!phoneNumber) return null;
    // Remove all non-digit characters from the phone number
    const cleaned = phoneNumber.replace(/\D/g, "");

    // Check if the cleaned number is of valid length
    const isValidLength = cleaned.length === 10 || cleaned.length === 12;

    if (!isValidLength) {
      // If the length is not valid, return the original input
      return phoneNumber;
    }

    // Format the cleaned number into the desired format
    const formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(
      3,
      6
    )}-${cleaned.slice(6)}`;

    return formatted;
  }

  function formatMoney(num: string): string {
    if (!num) {
      return "0.00";
    }
    const number = (num / 1).toFixed(2).replace(",", ".");
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ETB";
  }
  return {
    formatDate,
    formatDateOnly,
    formatDateOutgoing,
    formatTime,
    formatDateFromNow,
    formatPhone,
    formatMoney,
  };
};
