export const formatSeconds = (seconds) => {
  let minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};
