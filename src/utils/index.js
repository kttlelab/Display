export const downtown = {
  latitude: -1.943378,
  longitude: 30.057301,
};

export const distanceToBusTime = (distance, nearByPoint) => {
  let time = (distance * 1000) / 336;
  if (nearByPoint) {
    time = Math.abs(time - nearByPoint.props.distance);
  }
  if (time > 60) {
    return `${Number(time / 60).toFixed(0)} H`;
  }
  return Number(time) >= 1 ? `${time.toFixed(0)} Min` : "Almost here";
};

export const formatDistance = (num) => {
  const distance = Number(num) * 100;
  return distance.toFixed(2) / 0.5;
};

export const ABDistance = (A, B) =>
  Math.sqrt((A.latitude - B.latitude) ** 2 + (A.longitude - B.longitude) ** 2);
