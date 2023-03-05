import type PaginationResultItem from "@/models/api/PaginationResultItem";

interface PaginationResult {
    count: number,
    next: string | null,
    previous: string | null,
    results: PaginationResultItem[],
}

export default PaginationResult;