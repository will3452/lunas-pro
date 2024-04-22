
export const useDateUtils = () => {

    /**
     * @description date formatter
     * @param {Date} date
     * @param {String} type [datetime, time, time24, date]
    */
    const formatDate = (date: string | Date | undefined, type?: string): string => {
        if(!date) return '';

        const dt = new Date(date);
        if(!type)
            type = "long";

        switch(type) {
          case "datetime":
            return dt.toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            });
          case "time":
            return dt.toLocaleString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            });
          case "timeWithoutSec":
            return dt.toLocaleString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            });
          case "time24":
            return dt.toLocaleString('en-US', {
              hour12: false,
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            });
          case "YYYY-MM-DD":
            return dt.toLocaleString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            });
          case "MM-DD":
            return dt.toLocaleString('en-US', {
              month: '2-digit',
              day: '2-digit',
            });
          case "long-DD":
            return dt.toLocaleString('en-US', {
              month: 'long',
              day: '2-digit',
            });
          case "day-month-year":
            return `${getOrdinal(dt.getDate())} day of ${getStringDate(dt.getMonth())} ${dt.getFullYear()}`;
          default:
            return dt.toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: '2-digit',
            });
        }
    }
    
    const getOrdinal = (n: number): string => {
      const s = ["th", "st", "nd", "rd"];
      const v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    }
    
    const getStringDate = (month: number): string => {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return months[month];
    }

    const getMonthName = (indx: number, short: string)=>{
        const months = [
            {name: 'January', code: 'Jan'},
            {name: 'February', code: 'Jan'},
            {name: 'March', code: 'Mar'},
            {name: 'April', code: 'Apr'},
            {name: 'May', code: 'May'},
            {name: 'June', code: 'Jun'},
            {name: 'July', code: 'Jul'},
            {name: 'August', code: 'Aug'},
            {name: 'September', code: 'Sep'},
            {name: 'October', code: 'Oct'},
            {name: 'November', code: 'Nov'},
            {name: 'December', code: 'Dec'},
        ]

        return short? months[indx].code : months[indx].name

    }
    
    const getMoment = (date: Date): string => {
      const currentDate = new Date();
      const _date = new Date(date)
      
      // Make sure date is a valid Date object
      if (!(_date instanceof Date) || isNaN(_date.getTime())) {
        return 'Invalid date';
      }
    
      const timeDifference = currentDate.getTime() - _date.getTime();
      const seconds = Math.floor(timeDifference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const weeks = Math.floor(days / 7);
    
      if (weeks > 0) {
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
      } else if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
      } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
      } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
      } else {
        return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
      }
    };
    
    return { getMonthName, formatDate, getMoment }
    
  }