// import fetcher from "@/axios/fetcher"
import useSWR from "swr"

function useProductById(id) {
    const {data, error, loading} = useSWR(id ? `/api/products?id=${id}` : null);
    return {
        data, error, loading
    }
}

export default useProductById;