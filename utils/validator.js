export default function validator(arrays) {
  for (let i = 0; i < arrays.length; i++) {
    if (arrays[i] == "" || arrays[i] === null || arrays[i] === undefined) {
      return true;
    }

    if (Number.isInteger(arrays[i]) && arrays[i] < 0) {
      return true;
    }
  }
  return false;
}
