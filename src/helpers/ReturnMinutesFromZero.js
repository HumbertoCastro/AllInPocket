const ReturnMinutesFromZero = [];

for (let i = 0; i < 8; i += 1) {
  const hour = i;
  if (i < 10) {
    for (let z = 0; z < 12; z += 1) {
      if (z === 0 || z === 1) {
        ReturnMinutesFromZero.push(`0${hour}:0${z * 5}`)
      } else {
        ReturnMinutesFromZero.push(`0${hour}:${z * 5}`)
      }
    }
  } else {
    for (let y = 0; y < 12; y += 1) {
      if (y === 0 || y === 1) {
        ReturnMinutesFromZero.push(`${hour}:0${y * 5}`)
      } else {
        ReturnMinutesFromZero.push(`${hour}:${y * 5}`)
      }
    }
  }
}

export default ReturnMinutesFromZero;