export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

const BASE_URL = "https://dummyjson.com/products";

/**
 * Busca a lista de produtos na API.
 * @returns {Promise<Product[]>} Lista de produtos.
 */
export const fetchProducts = async (): Promise<Product[]> => {
    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        return data.products || []; // Garantimos que sempre retorna um array
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        return [];
    }
};

/**
 * Busca os detalhes de um produto específico pelo ID.
 * @param {number} id - ID do produto a ser buscado.
 * @returns {Promise<Product | null>} Produto encontrado ou null em caso de erro.
 */
export const fetchProductById = async (id: number): Promise<Product | null> => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        if (!response.ok) throw new Error("Produto não encontrado");
        const data: Product = await response.json();
        return data;
    } catch (error) {
        console.error(`Erro ao buscar produto com ID ${id}:`, error);
        return null;
    }
};
