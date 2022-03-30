export function quadSplit(address) {
  return `0x ${address
    .slice(2)
    .match(/.{1,4}/gu)
    .join(" ")}`;
}

export function addressSummary(
  address,
  firstSegLength = 10,
  lastSegLength = 4,
  includeHex = true
) {
  if (!address) {
    return "";
  }
  let checked = address;
  return checked
    ? `${checked.slice(0, firstSegLength)}...${checked.slice(
        checked.length - lastSegLength
      )}`
    : "...";
}
