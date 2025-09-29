import React from 'react';

interface TableProps {
  headers: string[];
  data: any[];
  className?: string;
}

const Table: React.FC<TableProps> = ({ headers, data, className = '' }) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full bg-white rounded-lg shadow-sm border border-neutral-grey/10">
        <thead className="bg-neutral-grey/10">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-6 py-4 text-left text-sm font-semibold text-neutral-black border-b border-neutral-grey/20"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-grey/10">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="hover:bg-neutral-grey/5 transition-colors duration-200"
            >
              {Object.values(row).map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="px-6 py-4 text-sm text-neutral-black whitespace-nowrap"
                >
                  {cell as React.ReactNode}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;