import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from "../ui/card";
import { useProductStore } from '@/store/product';
import ProductCard from './ProductCard';
import { Rocket } from 'lucide-react';

const Homepage = () => {
    const { fetchProducts, products } = useProductStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    console.log("products", products);

    return (
        <div className='flex flex-col justify-evenly items-center gap-5'>
            <div>
                <h1 className='flex flex-row font-bold items-center text-3xl font-serif justify-center '>
                    Current Products
                    <span className='pl-3'><Rocket /></span>
                </h1>
            </div>

            <div className='grid grid-flow-row gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-10'>
                {products.length > 0 ? (
                    products.map((product) => (
                        <Card key={product._id} className="p-4 bg-gray-300 transition ease-in-out duration-500 hover:-translate-y-1 hover:scale-100">
                            <div className='text-gray-700'>
                                <ProductCard product={product} />
                            </div>
                        </Card>
                    ))
                ) : (
                    <div className='flex justify-center items-center gap-1'>
                        <h1 className='text-xl'>No products found.......</h1>
                        <Link to={"/create"}>
                            <h1 className='text-blue-500 underline text-lg'>Create a product</h1>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Homepage;