import api from '../utils/api';

interface Formation {
    _id: string;
    titre: string;
    subtitre?: string;
    description?: string;
    date: string;
    duree: string;
    type?: string;
    file?: string;
    files?: string[];
    prix?: string;
    publier: boolean;
    created_at?: string;
    adresse?: string;
    categorieId: string | { _id: string; titre: string };
}

interface CreateFormationData {
    title: string;
    description: string;
    content?: string;
    image?: File;
    images?: File[];
    price?: number;
    duration?: string;
    level?: string;
    categorieId: string;
    isPublished: boolean;
}

interface UpdateFormationData extends Partial<CreateFormationData> {
    id: string;
}

interface FormationResponse {
    formation: Formation;
    message?: string;
}

interface FormationsResponse {
    formations: Formation[];
    message?: string;
}

class FormationStore {

    /**
     * Get all formations (admin only)
     */
    async getFormations(): Promise<Formation[]> {
        try {
            const response = await api.get('/formations');
            const data = response.data;

            // The backend returns the formations directly as an array, not wrapped in an object
            return Array.isArray(data) ? data : (data.formations || []);
        } catch (error: any) {
            throw new Error(error.response?.data?.message || error.message || 'Failed to fetch formations');
        }
    }

    /**
     * Get published formations (public)
     */
    async getPublishedFormations(): Promise<Formation[]> {
        try {
            const response = await api.get('/formations/public');
            const data: FormationsResponse = response.data;
            return data.formations || [];
        } catch (error: any) {
            throw new Error(error.response?.data?.message || error.message || 'Failed to fetch published formations');
        }
    }

    /**
     * Get formation by ID (public)
     */
    async getFormationById(id: string): Promise<Formation> {
        try {
            const response = await api.get(`/getformation/${id}`);
            const data: FormationResponse = response.data;
            return data.formation;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || error.message || 'Formation not found');
        }
    }

    /**
     * Get formations by category (public)
     */
    async getFormationsByCategory(categorieId: string): Promise<Formation[]> {
        try {
            const response = await api.get(`/getformationbyCategorie/${categorieId}`);
            const data: FormationsResponse = response.data;
            return data.formations || [];
        } catch (error: any) {
            throw new Error(error.response?.data?.message || error.message || 'Failed to fetch formations by category');
        }
    }

    /**
     * Create new formation (admin only)
     */
    async createFormation(formationData: CreateFormationData): Promise<Formation> {
        try {
            const formData = new FormData();

            // Send fields with correct database field names
            formData.append('titre', formationData.title);
            formData.append('description', formationData.description);
            formData.append('categorieId', formationData.categorieId);
            formData.append('publier', formationData.isPublished.toString());
            
            // Required fields for backend
            formData.append('date', new Date().toISOString().split('T')[0]);
            formData.append('duree', formationData.duration || '');

            // Optional fields
            if (formationData.content) formData.append('subtitre', formationData.content);
            if (formationData.price !== undefined) formData.append('prix', formationData.price.toString());
            if (formationData.level) formData.append('type', formationData.level);
            
            // Handle multiple images
            if (formationData.images && formationData.images.length > 0) {
                formationData.images.forEach((image, index) => {
                    formData.append('files', image);
                });
            }
            
            // Handle single image for backward compatibility
            if (formationData.image) formData.append('file', formationData.image);

            const response = await api.post('/createformation', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const data: FormationResponse = response.data;
            return data.formation;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || error.message || 'Failed to create formation');
        }
    }

    /**
     * Update formation (admin only)
     */
    async updateFormation(formationData: UpdateFormationData): Promise<Formation> {
        try {
            const formData = new FormData();

            // Send fields with correct database field names
            if (formationData.title) formData.append('titre', formationData.title);
            if (formationData.description) formData.append('description', formationData.description);
            if (formationData.categorieId) formData.append('categorieId', formationData.categorieId);
            if (formationData.isPublished !== undefined) formData.append('publier', formationData.isPublished.toString());
            if (formationData.content) formData.append('subtitre', formationData.content);
            if (formationData.price !== undefined) formData.append('prix', formationData.price.toString());
            if (formationData.duration) formData.append('duree', formationData.duration);
            if (formationData.level) formData.append('type', formationData.level);
            
            // Handle multiple images
            if (formationData.images && formationData.images.length > 0) {
                formationData.images.forEach((image, index) => {
                    formData.append('files', image);
                });
            }
            
            // Handle single image for backward compatibility
            if (formationData.image) formData.append('file', formationData.image);

            const response = await api.put(`/putformation/${formationData.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const data: FormationResponse = response.data;
            return data.formation;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || error.message || 'Failed to update formation');
        }
    }

    /**
     * Delete formation (admin only)
     */
    async deleteFormation(id: string): Promise<void> {
        try {
            await api.delete(`/deleteformation/${id}`);
        } catch (error: any) {
            throw new Error(error.response?.data?.message || error.message || 'Failed to delete formation');
        }
    }

    /**
     * Helper method to create formation with validation
     */
    validateFormationData(data: CreateFormationData): string[] {
        const errors: string[] = [];

        if (!data.title?.trim()) {
            errors.push('Title is required');
        }

        if (!data.description?.trim()) {
            errors.push('Description is required');
        }

        if (!data.categorieId?.trim()) {
            errors.push('Category is required');
        }

        if (!data.duration?.trim()) {
            errors.push('Duration is required');
        }

        if (data.price !== undefined && data.price < 0) {
            errors.push('Price cannot be negative');
        }

        return errors;
    }

    /**
     * Helper method to format formation data for display
     */
    formatFormationForDisplay(formation: Formation): Formation & { formattedPrice?: string } {
        return {
            ...formation,
            formattedPrice: formation.prix ? `${formation.prix} TND` : 'Free'
        };
    }

    /**
     * Helper method to check if user can edit formations
     */
    canEditFormations(): boolean {
        // Import loginStore here to avoid circular dependency
        const loginStore = require('./loginStore').default;
        const user = loginStore.getUser();
        return user?.role === 'admin' && loginStore.isAuthenticated();
    }
}

// Create and export a singleton instance
const formationStore = new FormationStore();
export default formationStore;

// Export types for use in components
export type {
    Formation,
    CreateFormationData,
    UpdateFormationData,
    FormationResponse,
    FormationsResponse
};
