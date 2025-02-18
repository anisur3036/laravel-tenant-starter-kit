import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { LinkData, MetaData } from "@/types";
import { Link } from "@inertiajs/react";

export function PaginationComponent({ links }: MetaData) {
  return (
    <Pagination>
      <PaginationContent>
        {links.map((link: LinkData) => (
          <PaginationItem key={link.label}>
            <Link
              preserveScroll
              prefetch={true}
              href={link.url || ""}
              key={link.label}
              className={
                "border border-gray-400 rounded dark:border-gray-700 inline-block py-2 px-3 text-gray-600 dark:text-gray-50 text-xs " +
                (link.active
                  ? "bg-gray-950 dark:bg-gray-50 text-white dark:text-gray-900 font-semibold "
                  : " ") +
                (!link.url
                  ? "!text-gray-500 cursor-not-allowed "
                  : "hover:bg-gray-950")
              }
              dangerouslySetInnerHTML={{ __html: link.label }}
            ></Link>
          </PaginationItem>
        ))}
      </PaginationContent>
    </Pagination>
  );
}
