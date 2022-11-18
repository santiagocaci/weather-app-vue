export const getCurrentTime = (deltaT, timeZone) => {
  const localOffset = new Date().getTimezoneOffset() * 60000;
  const utc = deltaT * 1000 + localOffset;
  const currentTime = utc + 1000 * timeZone;
  return currentTime;
};

export const currentDate = currentTime =>
  new Date(currentTime).toLocaleDateString('es-ar', {
    weekday: 'short',
    day: '2-digit',
    month: 'long',
  });

export const currentTime = currentTime =>
  new Date(currentTime).toLocaleTimeString('es-AR', {
    timeStyle: 'short',
  });

export const currentHour = hour =>
  new Date(hour).toLocaleTimeString('en-us', { hour: '2-digit' });
