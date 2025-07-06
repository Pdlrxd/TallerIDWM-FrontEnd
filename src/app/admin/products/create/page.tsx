"use client";

import { Navbar } from "@/components/Navbar";
import {CreateProductView} from "@/views/adminPage/createProductView/CreateProductView";

export default function CreateProductPage() {
    return (
        <>
            <Navbar />
            <CreateProductView />
        </>
    );
}
