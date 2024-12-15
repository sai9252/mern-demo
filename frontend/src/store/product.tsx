import { create } from "zustand";

interface Product {
    _id: string;
    name: string;
    price: number;
    image: string;
}

interface ProductStore {
    products: Product[];
    setProducts: (products: Product[]) => void;
    createProduct: (newProduct: Omit<Product, "_id">) => Promise<{ success: boolean; message: string }>;
    fetchProducts: () => Promise<void>;
    deleteProduct: (pid: string) => Promise<{ success: boolean; message: string }>;
    updateProduct: (pid: string, updatedProduct: Partial<Product>) => Promise<{ success: boolean; message: string }>;
}

export const useProductStore = create<ProductStore>((set) => ({
    products: [],
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        // Validate that all fields are provided
        if (!newProduct.name || newProduct.price === undefined || !newProduct.image) {
            return { success: false, message: "Please provide all fields." };
        }

        // Validate that price is a number
        if (typeof newProduct.price !== 'number') {
            return { success: false, message: "Price must be a number." };
        }

        try {
            const res = await fetch("/api/items/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newProduct)
            });

            if (!res.ok) {
                const errorData = await res.json();
                return { success: false, message: errorData.message || "Failed to create product." };
            }

            const data = await res.json();
            set((state) => ({ products: [...state.products, data.data] }));
            return { success: true, message: "Product created successfully." };
        } catch (error) {
            console.error("Error creating product:", error);
            return { success: false, message: "An error occurred while creating the product." };
        }
    },
    fetchProducts: async () => {
        try {
            const res = await fetch("/api/items/allItems");
            if (!res.ok) {
                const errorData = await res.json();
                console.error("Error fetching products:", errorData.message);
                return;
            }
            const data = await res.json();
            set({ products: data.data });
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    },
    deleteProduct: async (pid) => {
        try {
            const res = await fetch(`/api/items/deleteItems/${pid}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                const errorData = await res.json();
                return { success: false, message: errorData.message || "Failed to delete product." };
            }

            const data = await res.json();
            set(state => ({ products: state.products.filter(product => product._id !== pid) }));
            return { success: true, message: data.message || "Product deleted successfully." };
        } catch (error) {
            console.error("Error deleting product:", error);
            return { success: false, message: "An error occurred while deleting the product." };
        }
    },
    updateProduct: async (pid, updatedProduct) => {
        try {
            const res = await fetch(`/api/items/UpdatedItems/${pid}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedProduct)
            });

            if (!res.ok) {
                const errorData = await res.json();
                return { success: false, message: errorData.message || "Failed to update product." };
            }

            const data = await res.json();
            set((state) => ({ products: state.products.map(product => product._id === pid ? data.data : product) }));
            return { success: true, message: data.message || "Product updated successfully." };
        } catch (error) {
            console.error("Error updating product:", error);
            return { success: false, message: "An error occurred while updating the product." };
        }
    },
}));