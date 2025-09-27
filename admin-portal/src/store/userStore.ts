import api from '../utils/api';

interface User {
    _id: string;
    nom: string;
    prenom: string;
    email: string;
    telephone?: string;
    role: 'admin' | 'user';
    isActive: boolean;
    created_at?: string;
    updated_at?: string;
}

interface CreateUserData {
    nom: string;
    prenom: string;
    email: string;
    telephone?: string;
    password: string;
    role: 'admin' | 'user';
    isActive: boolean;
}

interface UpdateUserData extends Partial<CreateUserData> {
    id: string;
}

interface UserResponse {
    user: User;
    message?: string;
}

interface UsersResponse {
    users: User[];
    message?: string;
}

class UserStore {

    /**
     * Get all users (admin only)
     */
    async getUsers(): Promise<User[]> {
        try {
            const response = await api.get('/getusers');
            const data = response.data;

            // The backend returns the users directly as an array, not wrapped in an object
            return Array.isArray(data) ? data : (data.users || []);
        } catch (error: any) {
            throw new Error(error.response?.data?.message || error.message || 'Failed to fetch users');
        }
    }

    /**
     * Get user by ID (admin only)
     */
    async getUserById(id: string): Promise<User> {
        try {
            const response = await api.get(`/users/${id}`);
            const data: UserResponse = response.data;
            return data.user;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || error.message || 'User not found');
        }
    }

    /**
     * Create new user (admin only)
     */
    async createUser(userData: CreateUserData): Promise<User> {
        try {
            const response = await api.post('/users', userData);
            const data: UserResponse = response.data;
            return data.user;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || error.message || 'Failed to create user');
        }
    }

    /**
     * Update user (admin only)
     */
    async updateUser(userData: UpdateUserData): Promise<User> {
        try {
            const { id, ...updateData } = userData;
            const response = await api.put(`/users/${id}`, updateData);
            const data: UserResponse = response.data;
            return data.user;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || error.message || 'Failed to update user');
        }
    }

    /**
     * Delete user (admin only)
     */
    async deleteUser(id: string): Promise<void> {
        try {
            await api.delete(`/users/${id}`);
        } catch (error: any) {
            throw new Error(error.response?.data?.message || error.message || 'Failed to delete user');
        }
    }

    /**
     * Toggle user active status (admin only)
     */
    async toggleUserStatus(id: string, isActive: boolean): Promise<User> {
        try {
            const response = await api.patch(`/users/${id}/status`, { isActive });
            const data: UserResponse = response.data;
            return data.user;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || error.message || 'Failed to update user status');
        }
    }

    /**
     * Helper method to validate user data
     */
    validateUserData(data: CreateUserData): string[] {
        const errors: string[] = [];

        if (!data.nom?.trim()) {
            errors.push('First name is required');
        }

        if (!data.prenom?.trim()) {
            errors.push('Last name is required');
        }

        if (!data.email?.trim()) {
            errors.push('Email is required');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            errors.push('Please enter a valid email address');
        }

        if (!data.password?.trim()) {
            errors.push('Password is required');
        } else if (data.password.length < 6) {
            errors.push('Password must be at least 6 characters long');
        }

        if (!data.role) {
            errors.push('Role is required');
        }

        if (data.telephone && !/^\+?[\d\s-()]+$/.test(data.telephone)) {
            errors.push('Please enter a valid phone number');
        }

        return errors;
    }

    /**
     * Helper method to format user data for display
     */
    formatUserForDisplay(user: User): User & { fullName?: string; statusText?: string } {
        return {
            ...user,
            fullName: `${user.prenom} ${user.nom}`,
            statusText: user.isActive ? 'Active' : 'Inactive'
        };
    }

    /**
     * Helper method to check if user can manage users
     */
    canManageUsers(): boolean {
        // Import loginStore here to avoid circular dependency
        const loginStore = require('./loginStore').default;
        const user = loginStore.getUser();
        return user?.role === 'admin' && loginStore.isAuthenticated();
    }
}

// Create and export a singleton instance
const userStore = new UserStore();
export default userStore;

// Export types for use in components
export type {
    User,
    CreateUserData,
    UpdateUserData,
    UserResponse,
    UsersResponse
};
