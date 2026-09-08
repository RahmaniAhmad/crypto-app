import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";

interface Props {
  title: string;
  column: string;
  activeColumn: string | null;
  direction: "default" | "asc" | "desc";
  onSort: (column: any) => void;
}

export default function SortableHeader({
  title,
  column,
  activeColumn,
  direction,
  onSort,
}: Props) {
  const isActive = activeColumn === column;

  const SortIcon =
    !isActive || direction === "default"
      ? FaSort
      : direction === "asc"
        ? FaSortUp
        : FaSortDown;

  return (
    <th
      onClick={() => onSort(column)}
      className="
        cursor-pointer
        select-none
        p-3
        hover:bg-default-200
      "
    >
      <div className="flex items-center gap-1">
        {title}
        <SortIcon
          className={isActive ? "text-primary" : "text-default-400"}
          size={12}
        />
      </div>
    </th>
  );
}
