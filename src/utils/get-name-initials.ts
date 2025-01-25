export function getNameInitials(name: string) {
  return name.split(' ').reduce((accumulator, currentValue, index, array) => {
    if (index === 0 || index === array.length - 1) {
      return accumulator + currentValue[0].toUpperCase()
    }
    return accumulator
  }, '')
}
