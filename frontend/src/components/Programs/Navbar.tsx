import useColorMode from '@/hooks/color'
import { MoonIcon, ShoppingCart, SquarePlus, SunMedium } from "lucide-react"
import { Link } from 'react-router-dom'
import { Button } from '../ui/button';


const Navbar = () => {
    const {colorMode , toggleColorMode} = useColorMode();

    return (
        <nav className='flex justify-around items-center'>
            <Link to={'/'}>
                <div className='flex m-5 text-3xl font-serif justify-between items-center w-56 '>
                    product store <ShoppingCart className='h-8 w-8' />
                </div>
            </Link>
            <div className='m-5 space-x-4'>
                <Link to={'/create'}>
                    <Button className='h-14 w-14 bg-gray-600'>
                        <SquarePlus/>
                    </Button>
                </Link>
                <Button onClick={toggleColorMode} className='h-14 w-14'>{colorMode === 'light' ? <SunMedium/> : <MoonIcon /> }</Button>
            </div>
        </nav>
    )
}

export default Navbar