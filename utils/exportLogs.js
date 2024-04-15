import Excel from "exceljs";
import path from "path";

const headerFill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "FFCC00" }, // Light yellow color
};
const boldFont = { bold: true };

export const logs = async (filename, dataLogs) => {
  const workbook = new Excel.Workbook();
  // Add sheet logs
  const logsSheet = workbook.addWorksheet("Logs");
  // Add column headers to logs
  logsSheet.columns = [
    {
      header: "API",
      key: "urlApi",
    },
    { header: "Code", key: "code" },
    { header: "Status", key: "status" },
    { header: "Response Data", key: "response" },
    {
      header: "Creation Date",
      key: "date",
    },
  ];

  // Style the header row
  logsSheet.getRow(1).eachCell((cell, index) => {
    cell.font = boldFont;
    cell.fill = headerFill;
    cell.alignment = { vertical: "middle", horizontal: "center" }; // Center alignment
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    if (index <= 8) {
      // Assuming there are 4 columns
      cell.fill = headerFill;
    }
  });

  const date = new Date();

  dataLogs.forEach((row) => {
    const customRow = { ...row, date };
    logsSheet.addRow(customRow);
  });

  
  const reportDir = "D:\\CODE\\PerformanceTesting\\logs";

  // Save workbook to file in the report folder
  const filePath = path.join(reportDir, filename);
  await workbook.xlsx.writeFile(filePath);
  console.log(`File ${filename} exported successfully to ${filePath}.`);
  return filename;
};
