export function bytesToGb(bytes, round = false) {
  if (round) {
    return Math.round(bytes / 1024 / 1024 / 1024);
  } else {
    return bytes / 1024 / 1024 / 1024;
  }
}
