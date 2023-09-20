import useSWR from "swr"
function useCategories() {
    const {data, error, loading} = useSWR("/api/categories");
    return {
        data, error, loading
    }
}

export default useCategories;