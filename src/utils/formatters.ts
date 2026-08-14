import moment from "moment";

function getInitials(name: string): string {
  if (!name) return '';
  return name
    .split(' ')
    .map((n) => n.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
}

function formatDuration(durationSeconds: number = 0) {
  const totalSeconds = Math.floor(durationSeconds)

  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return `${hours > 0 ? String(hours).padStart(2, '0') + 'h ' : ''}${minutes > 0 ? String(minutes).padStart(2, '0',) + 'm ' : ''}${String(seconds).padStart((minutes < 1 && hours < 1) ? 1 : 2, '0')}s`
}

const formatDate = (date?: string) => {
  if (!date) return '-';

  return moment(date)?.format('lll')
};



export {
  getInitials,
  formatDuration,
  formatDate
}