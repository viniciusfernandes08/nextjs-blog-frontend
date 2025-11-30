import { formatDateTime, formatRelativeDate } from "@/utils/format-datetime"

interface PostDateProps {
    datetime: string
}

export function PostDate({datetime}: PostDateProps) {
    return (
      <time 
        className="text-slate-600 block text-sm/tight"
        dateTime={datetime}
        title={formatRelativeDate(datetime)}
      >
        {formatDateTime(datetime)}
      </time>
    )
}