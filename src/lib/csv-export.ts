/**
 * Utility to export data to CSV
 */
export function exportToCSV<T extends Record<string, any>>(
  data: T[],
  filename: string,
  headers?: Record<string, string>
) {
  if (!data || data.length === 0) return;

  const firstRow = data[0];
  if (!firstRow) return;

  const headerKeys = Object.keys(firstRow);
  const headerLabels = headers 
    ? headerKeys.map(key => headers[key] || key)
    : headerKeys;

  const csvRows = [
    headerLabels.join(','),
    ...data.map(row => 
      headerKeys.map(key => {
        const val = row[key];
        const escaped = String(val === null || val === undefined ? '' : val).replace(/"/g, '""');
        return `"${escaped}"`;
      }).join(',')
    )
  ];

  const csvContent = csvRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
