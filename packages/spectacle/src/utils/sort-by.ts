export default function sortByKeyComparator<T>(key: keyof T) {
  return (lhs: T, rhs: T) => {
    if (lhs[key] < rhs[key]) {
      return -1;
    } else if (lhs[key] > rhs[key]) {
      return 1;
    }
    return 0;
  };
}
