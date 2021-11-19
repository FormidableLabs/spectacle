export default function sortByKeyComparator(key) {
  return (lhs, rhs) => {
    if (lhs[key] < rhs[key]) {
      return -1;
    } else if (lhs[key] > rhs[key]) {
      return 1;
    }
    return 0;
  };
}
