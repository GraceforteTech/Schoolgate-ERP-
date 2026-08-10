/**
 * Utility to export data to CSV
 */
export function exportToCSV<T extends Record<string, any>>(
  data: T[],
  filename: string,
  headers?: Record<keyof T, string>
) {
  if (!data.length) return;

  const headerKeys = Object.keys(data[0]) as (keyof T)[];
  const headerLabels = headers 
    ? headerKeys.map(key => headers[key] || String(key))
    : headerKeys.map(key => String(key));

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
