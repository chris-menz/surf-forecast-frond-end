export function conditionsParser(response) {
  let conditions = [];

  const conditions_data = response.data.hours;

  for (let i = 0; i < 241; ++i) {
    conditions[i] = {
      swell_height: (conditions_data[i].swellHeight.noaa * 3.281).toFixed(1),
      swell_period: conditions_data[i].swellPeriod.noaa.toFixed(0),
      swell_direction: conditions_data[i].swellDirection.noaa,
      wind_speed: conditions_data[i].windSpeed.sg,
      wind_direction: conditions_data[i].windDirection.sg,
      water_temperature: conditions_data[i].waterTemperature.noaa,
      wave_height: (conditions_data[i].waveHeight.noaa * 3.281).toFixed(1),
      wave_period: conditions_data[i].wavePeriod.noaa.toFixed(0),
      wave_direction: conditions_data[i].waveDirection.noaa.toFixed(0),
      wind_wave_height: (
        conditions_data[i].windWaveHeight.noaa * 3.281
      ).toFixed(1),
      wind_wave_period: conditions_data[i].windWavePeriod.noaa,
      wind_wave_direction: conditions_data[i].windWaveDirection.noaa,
      secondary_swell_height: (
        conditions_data[i].secondarySwellHeight.noaa * 3.281
      ).toFixed(1),
      secondary_swell_period: conditions_data[i].secondarySwellPeriod.noaa,
      secondary_swell_direction:
        conditions_data[i].secondarySwellDirection.noaa,
      time: conditions_data[i].time,
    };
  }
  return conditions;
}
