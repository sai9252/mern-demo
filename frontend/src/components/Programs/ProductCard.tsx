import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Trash2, UserRoundPen } from 'lucide-react';
import { useProductStore } from '@/store/product';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from "../ui/toast";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '../ui/input';

// Define the Product type
type Product = {
    _id: string;
    name: string;
    price: number;
    image: string;
};

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { toast } = useToast();
    const { deleteProduct, updateProduct } = useProductStore();
    const [updatedProduct, setUpdatedProduct] = useState<Product>(product);

    const handleDeleteProduct = async (pid: string) => {
        const { success, message } = await deleteProduct(pid);
        if (!success) {
            toast({
                title: "Error",
                description: message,
                action: <ToastAction altText="Try again">Try again</ToastAction>,
                variant: "destructive",
                duration: 2000,
            });
        } else {
            toast({
                title: "Success",
                description: message,
                duration: 2000,
            });
        }
    };

    const handleUpdateProduct = async (pid: string, updatedProduct: Product) => {
        // Validate that all fields are provided
        if (!updatedProduct.name || updatedProduct.price === undefined || !updatedProduct.image) {
            toast({
                title: "Error",
                description: "Please provide all fields.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
                variant: "destructive",
                duration: 2000,
            });
            return;
        }

        // Validate that price is a number
        const price = parseFloat(updatedProduct.price.toString());
        if (isNaN(price) || price < 0) {
            toast({
                title: "Error",
                description: "Price must be a number and greater than zero.",
                action: <ToastAction altText="Try again">Try again</ToastAction>,
                variant: "destructive",
                duration: 2000,
            });
            return;
        }

        const { success, message } = await updateProduct(pid, {
            ...updatedProduct,
            price: price,
        });

        if (!success) {
            toast({
                title: "Error",
                description: message,
                action: <ToastAction altText="Try again">Try again</ToastAction>,
                variant: "destructive",
                duration: 2000,
            });
        } else {
            toast({
                title: "Success",
                description: message,
                duration: 2000,
            });
        }
    };

    return (
        <div className="flex flex-col items-center">
            <img src={product.image} alt={product.name} className="h-48 w-full object-cover" />
            <h1 className="mt-2 font-semibold font-serif">{product.name}</h1>
            <h3 className="mt-1 font-semibold">{product.price} RS</h3>
            <div className="mt-2 flex space-x-2">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="bg-blue-500 hover:bg-blue-600">
                            <UserRoundPen />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="space-y-4">
                        <h1 className="font-semibold font-serif">Update Product Details</h1>
                        <Input
                            placeholder="Update Name"
                            name="name"
                            value={updatedProduct.name}
                            onChange={(e) =>
                                setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                            }
                        />
                        <Input
                            placeholder="Update Price"
                            name="price"
                            type="number"
                            value={updatedProduct.price.toString()}
                            onChange={(e) =>
                                setUpdatedProduct({ ...updatedProduct, price: parseFloat(e.target.value) })
                            }
                        />
                        <Input
                            placeholder="Update Image"
                            name="image"
                            value={updatedProduct.image}
                            onChange={(e) =>
                                setUpdatedProduct({ ...updatedProduct, image: e.target.value })
                            }
                        />
                        <DialogClose asChild>
                            <div className="flex gap-4">
                                <Button
                                    className="hover:bg-blue-600 bg-blue-500"
                                    onClick={() => handleUpdateProduct(product._id, updatedProduct)}
                                >
                                    Update
                                </Button>
                            </div>
                        </DialogClose>
                    </DialogContent>
                </Dialog>

                <Button
                    className="bg-red-500 hover:bg-red-600"
                    onClick={() => handleDeleteProduct(product._id)}
                >
                    <Trash2 />
                </Button>
            </div>
        </div>
    );
};

export default ProductCard;