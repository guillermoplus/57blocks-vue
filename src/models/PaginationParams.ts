interface PaginationParams {
    limit: number,
    offset: number,
    total: number,
    next: string | null,
    previous: string | null,
    currentPage: number,
    lastPage: number,
}

export default PaginationParams;