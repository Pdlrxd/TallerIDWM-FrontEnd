import { User } from "./User";
import { Pagination } from "./Pagination";

export interface UserResponseData {
    data: User[];
    pagination: Pagination;
}
