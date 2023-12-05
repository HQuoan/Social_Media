// const moment = '45 dd: 0 hh: 53 mm: 57 ss';

module.exports = (moment) => {
  const tmp = moment.split(':');

  const [number, type] = tmp
    .find((el) => {
      el = el.trim();
      return el.split(' ')[0] !== '0';
    })
    .trim()
    .split(' ');

  let str = '';

  switch (type) {
    case 'dd':
      str = 'day ago';
      break;
    case 'hh':
      str = 'hour ago';
      break;
    case 'mm':
      str = 'minute ago';
      break;
    default:
      str = 'second ago';
  }

  return `${number} ${str}`;
};
