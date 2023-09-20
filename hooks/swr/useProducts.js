import useSWR from "swr"
// import axios from "axios";
// const fetcher = async (...args) => (await axios.get(...args)).data

function useProducts() {
    const {data, error, loading} = useSWR("/api/products");
    return {
        data, error, loading
    }
}

export default useProducts;