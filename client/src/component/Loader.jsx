import { RiLoader2Fill } from "react-icons/ri";

const Loader = () => {
    return (
        <span className="flex flex-col justify-center items-center">
            <RiLoader2Fill size={30} className='animate-spin transform' />
            <p className="text-[9px]">Loading.</p>
        </span>
    )
}

export default Loader