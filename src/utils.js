import {escape as escapeHtml} from 'he';
import dayjs from 'dayjs';
import durationPlugin from 'dayjs/plugin/duration';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';
dayjs.extend(durationPlugin);

/**
 * @param {string | dayjs.Dayjs} dateTime
 * @param {boolean} [isNarrow]
 * @return {string}
 */

function formatDate(dateTime, isNarrow) {
  const formattedDate = dayjs(dateTime).format(isNarrow ? 'D' : 'MMM D');
  return formattedDate;
}

/**
 * @param {string} startDateTime
 * @param {string} endDateTime
 * @return {string}
 */
function formatDateRange(startDateTime, endDateTime) {
  const start = dayjs(startDateTime);
  const end = dayjs(endDateTime);

  if (start.isSame(end, 'day')) {
    return formatDate(start);
  }

  return [
    formatDate(start),
    formatDate(end, start.isSame(end, 'month')),
  ].join(' - ');
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

/**
 * @param {HTMLInputElement} startDateField
 * @param {HTMLInputElement} endDateField
 * @return {()=> void}
 */

function createDatePickers(startDateField, endDateField) {
  /**
   * @type {FlatPickrOptions}
   */
  const options = {
    monthSelectorType: 'static',
    dateFormat: 'Z',
    altInput: true,
    altFormat: 'd/m/y H:i',
    locale: {firstDayOfWeek: 1},
    enableTime: true,
    'time_24hr': true

  };
  const startDatePicker = flatpickr(startDateField, options);
  const endDatePicker = flatpickr(endDateField, options);
  startDatePicker.set('onChange', (dates) => endDatePicker.set(('minDate'), dates.at(0)));
  endDatePicker.set('minDate', startDatePicker.selectedDates.at(0));

  return () => {
    startDatePicker.destroy();
    endDatePicker.destroy();
  };
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

    if (value === undefined) {
      return before + after;
    }

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


export {
  SafeHtml,
  formatDate,
  formatDateRange,
  formatTime,
  formatDuration,
  createDatePickers,
  html};


