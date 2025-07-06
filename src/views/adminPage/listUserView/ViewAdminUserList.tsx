"use client";

import { useEffect, useState } from "react";
import { User } from "@/interfaces/User";
import { UserFiltersAdmin } from "@/interfaces/UserFiltersAdmin";
import { UserService } from "@/services/UserService";
import { Pagination } from "@/components/ui/pagination";
import { AuthGuardAdmin } from "@/components/AuthGuardAdmin";
import { Navbar } from "@/components/Navbar";
import UserFiltersComponent from "@/components/users/UserFilters";
import UserCard from "@/components/users/UserCard";
import UserDialog from "@/components/users/UserDialog";

const ViewAdminUserList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [filters, setFilters] = useState<UserFiltersAdmin>({});
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    const fetchUsers = async () => {
        try {
            const filtersWithPage = {
                PageNumber: currentPage,
                PageSize: 20,
                Status: filters.status,
                SearchTerm: filters.name,
                RegistrationDateFrom: filters.startDate,
                RegistrationDateTo: filters.endDate,
            };

            const res = await UserService.fetchAdminUsers(filtersWithPage);
            setUsers(res.data);
            setTotalPages(res.pagination.totalPages);
        } catch (error) {
            console.error(error);
        }
    };



    useEffect(() => {
        fetchUsers();
    }, [filters, currentPage]);

    const handleFilterChange = (updatedFilters: UserFiltersAdmin) => {
        setFilters(updatedFilters);
        setCurrentPage(1);
    };

    return (
        <AuthGuardAdmin>
            <div className="flex flex-col min-h-screen">
                <Navbar />

                <div className="p-4 flex flex-col md:flex-row gap-4">
                    <aside className="w-full md:w-1/4">
                        <UserFiltersComponent filters={filters} onFilterChange={handleFilterChange} />
                    </aside>

                    <main className="w-full md:w-3/4">
                        <h1 className="text-3xl font-bold mb-4">Usuarios Registrados</h1>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {users.map((user, index) => (
                                <UserCard
                                    key={index}
                                    user={user}
                                    onViewProfile={() => setSelectedUser(user)}
                                />

                            ))}
                        </div>

                        <div className="mt-6 flex justify-center">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={(page) => setCurrentPage(page)}
                            />
                        </div>
                    </main>
                </div>

                <UserDialog
                    user={selectedUser}
                    open={selectedUser !== null}
                    onClose={() => setSelectedUser(null)}
                />
            </div>
        </AuthGuardAdmin>
    );
};

export default ViewAdminUserList;
