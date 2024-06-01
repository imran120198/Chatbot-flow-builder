export const getId = (nodes = []) =>
  String(nodes?.length + 1) || String(Math.floor(Math.random() * 100));
