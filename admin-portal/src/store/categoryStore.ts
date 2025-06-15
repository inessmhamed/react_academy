import api from '../utils/api';

interface Category {
    _id: string;
    titre: string;
    description?: string;
    created_at?: string;
}

interface CreateCategoryData {
    titre: string;
    description?: string;
}

interface UpdateCategoryData extends Partial<CreateCategoryData> {
    id: string;
}

interface CategoryResponse {
    category: Category;
    message?: string;
}

interface CategoriesResponse {
    categories: Category[];
    message?: string;
}

class CategoryStore {
    /**
     * Get all categories (public)
     */
    async getCategories(): Promise<Category[]> {
        try {
            const response = await api.get('/getcategories');
            const data = response.data;
            
            // The backend returns the categories directly as an array, not wrapped in an object
            return Array.isArray(data) ? data : (data.categories || []);
        } catch (error: any) {
            throw new Error(error.response?.data?.message || error.message || 'Failed to fetch categories');
        }
    }

    /**
     * Get category by ID (public)
     */
    async getCategoryById(id: string): Promise<Category> {
        try {
            const response = await api.get(`/getcategorie/${id}`);
            const data: CategoryResponse = response.data;
            return data.category;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || error.message || 'Category not found');
        }
    }

    /**
     * Create new category (admin only)
     */
    async createCategory(categoryData: CreateCategoryData): Promise<Category> {
        try {
            const response = await api.post('/createcategorie', categoryData);
            const data: CategoryResponse = response.data;
            return data.category;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || error.message || 'Failed to create category');
        }
    }

    /**
     * Update category (admin only)
     */
    async updateCategory(categoryData: UpdateCategoryData): Promise<Category> {
        try {
            const response = await api.put(`/putcategorie/${categoryData.id}`, {
                titre: categoryData.titre,
                description: categoryData.description
            });
            const data: CategoryResponse = response.data;
            return data.category;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || error.message || 'Failed to update category');
        }
    }

    /**
     * Delete category (admin only)
     */
    async deleteCategory(id: string): Promise<void> {
        try {
            await api.delete(`/deletecategorie/${id}`);
        } catch (error: any) {
            throw new Error(error.response?.data?.message || error.message || 'Failed to delete category');
        }
    }

    /**
     * Helper method to validate category data
     */
    validateCategoryData(data: CreateCategoryData): string[] {
        const errors: string[] = [];

        if (!data.titre?.trim()) {
            errors.push('Title is required');
        }

        return errors;
    }
}

// Create and export a singleton instance
const categoryStore = new CategoryStore();
export default categoryStore;

// Export types for use in components
export type {
    Category,
    CreateCategoryData,
    UpdateCategoryData,
    CategoryResponse,
    CategoriesResponse
};
