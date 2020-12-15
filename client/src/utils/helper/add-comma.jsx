const addComma = (num) => {
  if (!num) return 0
  if (num <= 999) return num

  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export default addComma
