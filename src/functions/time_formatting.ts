export interface timeCreation {
  date: string;
  time: string;
}

export default function time_formatting(dateStr: string): timeCreation {
  const dateObj: Date = new Date(dateStr);
  console.log('time_formatting');

  const dateAccessories = {
    day: dateObj.getDate(),
    month: dateObj.getMonth() + 1,
    year: dateObj.getFullYear(),
    hours: dateObj.getHours(),
    minutes: dateObj.getMinutes(),
  }

  for (let accessory in dateAccessories) {
    let value = dateAccessories[accessory];

    if (value < 10) {
      dateAccessories[accessory] = `0${value}`;
    }
  }

  return {
    date: `${dateAccessories.day}.${dateAccessories.month}.${dateAccessories.year}`,
    time: `${dateAccessories.hours}:${dateAccessories.minutes}`
  }
}