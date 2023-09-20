// import fetcher from "@/axios/fetcher"
import useSWR from "swr"

function useCategoryById(id) {
    const {data, error, loading} = useSWR(id ? `/api/products?id=${id}` : null);
    return {
        data, error, loading
    }
}

export default useCategoryById;