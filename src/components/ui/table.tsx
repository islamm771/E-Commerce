import { cn } from "@/lib/cn";
import { ReactNode } from "react";

interface TableProps {
  children?: ReactNode;
  className?: string;
}

const Table = ({ children, className }: TableProps) => {
  return (
    <div className="overflow-x-auto rounded-md border border-neutral-200 bg-white">
      <table className={cn("w-full min-w-175", className)}>
        {children}
      </table>
    </div>
  );
};

const Head = ({ children }: TableProps) => (
  <thead className="bg-neutral-50">
    <tr>{children}</tr>
  </thead>
);

const HeadCell = ({ children, className }: TableProps) => (
  <th
    className={cn(
      "px-6 py-4 text-left text-sm font-medium text-neutral-700",
      className
    )}
  >
    {children}
  </th>
);

const Body = ({ children }: TableProps) => (
  <tbody className="divide-y divide-neutral-200">
    {children}
  </tbody>
);

const Row = ({ children, className }: TableProps) => (
  <tr
    className={cn("", className)}>
    {children}
  </tr>
);

const Cell = ({ children, className }: TableProps) => (
  <td
    className={cn(
      "px-6 py-5 align-middle text-sm text-neutral-800",
      className
    )}
  >
    {children}
  </td>
);

Table.Head = Head;
Table.HeadCell = HeadCell;
Table.Body = Body;
Table.Row = Row;
Table.Cell = Cell;

export default Table;