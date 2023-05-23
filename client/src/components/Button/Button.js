import Loader from "react-loader-spinner";

const Button = ({loading, label, type, color="bg-red-600", hoverColor="hover:bg-red-700" , loaderWidth = 28, loaderHeight = 28, loaderType="Oval", loaderColor= "#FFFFFF"}) => {
    return (
        <button
            type={type}
            className={`flex justify-center ${color} ${hoverColor} text-white font-bold py-2 px-2 rounded w-full cursor-pointer`}>
            {
                loading ? <Loader type={loaderType} color={loaderColor} width={loaderWidth} height={loaderHeight} ariaLabel="loading" /> : label
            }
        </button>
    )
}
export default Button;