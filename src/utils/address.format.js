export const shortAddress = (address) => {
  const pre = address.substr(0, 8);
  const last = address.substr(-4);

  return `${pre}...${last}`;
};
