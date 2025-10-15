"use client"; // <--- REQUIRED: Marks this as a Client Component

import React from 'react';
import { useCart } from "@/app/lib/CartContext"; // Use the correct import path
import Toast from "./Toast"; // Use the correct import path

export default function CartToastRenderer() {
    // This component must be rendered inside the CartProvider
    const { notification, clearNotification } = useCart(); 

    if (!notification) return null;

    return <Toast message={notification} onClose={clearNotification} />;
};