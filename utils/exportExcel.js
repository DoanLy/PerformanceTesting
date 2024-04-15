import Excel from "exceljs";
import path from "path";

const headerFill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "FFCC00" }, // Light yellow color
};
const boldFont = { bold: true };
export async function exportToExcel(
  dataEnvironment,
  dataTransaction,
  dataLogs
) {
  const workbook = new Excel.Workbook();

  // Add the first sheet with name "Environment"
  const environmentSheet = workbook.addWorksheet("Environment");
  environmentSheet.columns = [
    { header: "Environment", key: "environment" },
    { header: "ServerName", key: "server" },
    { header: "OS", key: "os" },
    { header: "CPU Count", key: "CPU" },
    { header: "Total Disk Space", key: "disk" },
    { header: "QC Name", key: "qcName" },
  ];

  environmentSheet.getRow(1).eachCell((cell, index) => {
    cell.font = boldFont;
    cell.fill = headerFill;
    cell.alignment = { vertical: "middle", horizontal: "center" }; // Center alignment
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    if (index <= 6) {
      // Assuming there are 4 columns
      cell.fill = headerFill;
    }
  });

  // Add the second sheet with name "Transactions"
  const transactionsSheet = workbook.addWorksheet("Transactions");

  // Add column headers to Transactions sheet
  transactionsSheet.columns = [
    {
      header: "TransactionName",
      key: "transactionName",
    },
    { header: "Status", key: "status" },
    { header: "TotalRequest", key: "totalRequest" },
    { header: "ResponseTimeMin", key: "min" },
    { header: "ResponseTimeMax", key: "max" },
    { header: "ResponseTimeAvg", key: "avg" },
    { header: "Passed", key: "passed" },
    { header: "Failed", key: "failed" },
  ];

  // Style the header row
  transactionsSheet.getRow(1).eachCell((cell, index) => {
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

  dataEnvironment.forEach((row) => {
    environmentSheet.addRow(row);
  });

  // Add data rows to Transactions sheet
  dataTransaction.forEach((row) => {
    transactionsSheet.addRow(row);
  });
  // Add data rows to logs sheet
  dataLogs.forEach((row) => {
    logsSheet.addRow(row);
  });

  // Export data to Excel
  const now = new Date();
  const formattedDate = `${now.getDate()}_${
    now.getMonth() + 1
  }_${now.getFullYear()}_${now.getHours()}${now.getMinutes()}${now.getSeconds()}`;

  const filename = `transactions${formattedDate}.xlsx`;
  // Define the path to the report folder
  const reportDir = "D:\\CODE\\PerformanceTesting\\report";

  // Save workbook to file in the report folder
  const filePath = path.join(reportDir, filename);
  await workbook.xlsx.writeFile(filePath);
  console.log(`File ${filename} exported successfully to ${filePath}.`);
  return filename;
}
