export default () => {
  fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=-2.0163553&lon=30.0025569&appid=cc29622412e809ae00999fc0c7cb326f&units=metric&exclude=minutely,hourly,daily"
  ).then(async ({ json, body, ...rest }) => ({ data: await json(body), ...rest }));
};
