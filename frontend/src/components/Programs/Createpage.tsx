import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useProductStore } from '@/store/product';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from "../ui/toast";
import { useNavigate } from 'react-router-dom';

const Createpage = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: "",
    });

    const [error, setError] = useState("");

    const { toast } = useToast();
    const { createProduct } = useProductStore();
    const navigate = useNavigate();

    const handleAddProduct = async () => {
        // Validate that all fields are provided
        if (!newProduct.name || !newProduct.price || !newProduct.image) {
            setError("Please provide all fields.");
            return;
        }

        // Validate that price is a number
        const price = parseFloat(newProduct.price);
        if (isNaN(price) || price < 0) {
            setError("Price must be a number and greater than zero.");
            return;
        }

        // Clear any previous error
        setError("");

        const { success, message } = await createProduct({
            ...newProduct,
            price: price,
        });

        if (!success) {
            toast({
                title: "Error",
                description: message,
                action: <ToastAction altText="Try again">Try again</ToastAction>,
                variant: "destructive",
                duration: 3000,
            });
        } else {
            toast({
                title: "Success",
                description: message,
                duration: 3000,
            });
            // Navigate to the "/" route after successful product creation
            navigate("/");
        }
        setNewProduct({
            name: "",
            price: "",
            image: "",
        });
    };

    return (
        <div className='flex flex-col justify-center items-center h-[88.5vh]'>
            <div className='w-[50rem] h-[30rem] border border-zinc-600 flex flex-col justify-center items-center rounded-lg'>
                <div>
                    <h1 className='font-bold text-3xl mb-10'>Create New Product</h1>
                </div>
                <div className='w-[30rem] flex flex-col justify-center items-center space-y-5'>
                    <Input
                        placeholder='Product Name'
                        name='name'
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className='h-12 border border-zinc-600' />
                    <Input
                        placeholder='Product Price'
                        name='price'
                        type='number'
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        className='h-12 border border-zinc-600' />
                    <Input
                        placeholder='Image URL'
                        name='image'
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        className='h-12 border border-zinc-600' />
                    {error && <p className='text-red-500 mb-2'>{error}</p>}
                    <Button
                        className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded'
                        onClick={handleAddProduct}
                    >
                        Add Product
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Createpage;