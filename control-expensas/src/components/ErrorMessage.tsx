export default function ErrorMessage({message}: {message: String}) {
    return (
        <p className="bg-red-800 text-white text-center p-3 uppercase font-bold mb-3 rounded-md">
            {message}
        </p>
    )
}