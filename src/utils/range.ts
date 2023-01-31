interface IBtn {
  number: number;
  current: boolean;
}

export const range = (start: number, end: number) => {
  const arr: IBtn[] = [];

  if (end <= 6) {
    for (let i = 1; i <= end; i++) {
      if (i === start) {
        arr.push({ number: i, current: true });
        continue;
      }
      arr.push({ number: i, current: false });
    }
    return arr;
  }

  if (start === 4 && end < 9) {
    for (let i = 2; i <= 6; i++) {
      if (i === 4) {
        arr.push({ number: i, current: true });
        continue;
      }
      arr.push({ number: i, current: false });
    }
    return arr;
  }

  if (start === 4) {
    for (let i = 1; i <= 6; i++) {
      if (i === 4) {
        arr.push({ number: i, current: true });
        continue;
      }
      arr.push({ number: i, current: false });
    }
    return arr;
  }

  if (end > 5 && start < 4) {
    for (let i = 1; i <= 5; i++) {
      if (i === start) {
        arr.push({ number: i, current: true });
        continue;
      }
      arr.push({ number: i, current: false });
    }
    return arr;
  }

  if (start + 4 >= end) {
    for (let i = end - 4; i < end; i++) {
      if (i === start) {
        arr.push({ number: i, current: true });
        continue;
      }
      arr.push({ number: i, current: false });
    }
    return arr;
  }

  for (let i = start - 2; i < start + 3; i++) {
    if (start > 4 && i === start) {
      arr.push({ number: i, current: true });
      continue;
    }
    arr.push({ number: i, current: false });
  }

  return arr;
};
