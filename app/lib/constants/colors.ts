export const TAG_COLORS = [
  "#D04848",
  "#F3B95F",
  "#6895D2",
  "#FE7A36",
  "#3652AD",
  "#280274",
  "#E9F6FF",
];

export const GetTagColor = (index: number) => {
  return TAG_COLORS[index % TAG_COLORS.length];
};
