export const getCurrentTime = (deltaT, timeZone) => {
  const localOffset = new Date().getTimezoneOffset() * 60000;
  const utc = deltaT * 1000 + localOffset;
  const currentTime = utc + 1000 * timeZone;
  return currentTime;
};
