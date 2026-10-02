export const exportToCSV = (
  data: any[],
  columns: any[],
  fileName: string = "export.csv",
) => {
  const headers = columns.map((col) => col.text).join(","); // Header row

  const csvRows = data.map((row) =>
    columns
      .map((col) => {
        const value = row[col.dataField];
        // Escape double quotes in fields by doubling them, and wrap fields with commas or quotes in double quotes
        const escapedValue =
          typeof value === "string" ? `"${value.replace(/"/g, '""')}"` : value;
        return escapedValue;
      })
      .join(","),
  );

  const csvContent = [headers, ...csvRows].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
