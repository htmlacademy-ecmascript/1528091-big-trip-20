import {escape as escapeHtml} from 'he';
import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration';
dayjs.extend(durationPlugin);

/**
 * @param {string} dateTime
 * @return {string}
 */
function formatDate(dateTime) {
  const formattedDate = dayjs(dateTime).format('MMM D');
  return formattedDate;
}

/**
 * @param {string} dateTime
 * @return {string}
 */
function formatTime(dateTime) {
  const formattedTime = dayjs(dateTime).format('HH:mm');
  return formattedTime;
}

/**
 * @param {string} startDateTime
 * @param {string} endDateTime
 * @return {string}
 */
function formatDuration(startDateTime, endDateTime) {
  const ms = dayjs(endDateTime).diff(startDateTime);
  const duration = dayjs.duration(ms);
  if (duration.days()) {
    return duration.format('DD[d] HH[h] mm[m]');
  }

  if (duration.hours()) {
    return duration.format('HH[h] mm[m]');
  }
  const formattedDuration = duration.format('mm[m]');
  return formattedDuration;
}

class SafeHtml extends String {}

/**
 * @param {TemplateStringsArray} strings
 * @param {...any} values
 * @return {SafeHtml}
 */
function html(strings, ...values) {
  const result = strings.reduce((before, after, index) => {
    const value = values[index - 1];

    if (Array.isArray(value) && value.every((it) => it instanceof SafeHtml)) {
      return before + value.join('') + after;
    }

    if (!(value instanceof SafeHtml)) {
      return before + escapeHtml(String(value)) + after;
    }

    return before + value + after;
  });

  return new SafeHtml(result);
}

export {SafeHtml, html, formatDate, formatTime, formatDuration};
