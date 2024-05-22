import fs from "fs";
export const getLoginData = () => {
  return fs
    .readFileSync("D:/CODE/PerformanceTesting/data/user.txt", "utf8")
    .split("\n")
    .filter(Boolean);
};
