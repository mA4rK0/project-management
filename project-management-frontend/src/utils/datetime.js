import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

const TZ_ASIA_JAKARTA = 'Asia/Jakarta';

const datetime = {
  format(dateValue, format = 'DD/MM/YYYY') {
    return dayjs(dateValue).tz(TZ_ASIA_JAKARTA).format(format);
  },
  getIsoString(dateValue) {
    return dayjs(dateValue).tz(TZ_ASIA_JAKARTA).toISOString();
  },
  getDurationDays(startDate, endDate) {
    const start = dayjs(startDate).tz(TZ_ASIA_JAKARTA);
    const end = dayjs(endDate).tz(TZ_ASIA_JAKARTA);
    return end.diff(start, 'day') + 1;
  },
};

export default datetime;
