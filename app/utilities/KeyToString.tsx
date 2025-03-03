const KeyToString = (targetKey: string | null | undefined): string => {
  if (targetKey !== undefined && targetKey !== null) {
    return targetKey.toString();
  } else {
    return "null";
  }
};

export default KeyToString;
