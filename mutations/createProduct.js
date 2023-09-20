async function createProduct(data) {
    return (await axios.post("/api/products", data)).data;
}

export default createProduct