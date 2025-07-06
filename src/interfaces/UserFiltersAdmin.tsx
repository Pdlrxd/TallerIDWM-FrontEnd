export interface UserFiltersAdmin {
    name?: string;
    status?: boolean;
    startDate?: string; // formato ISO
    endDate?: string;
    PageNumber?: number;
    PageSize?: number;
}
