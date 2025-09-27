const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware
app.use(cors());
app.use(express.json());

// Mock database - In production, use a real database
let users = [
  {
    _id: '1',
    nom: 'Admin',
    prenom: 'User',
    email: 'admin@example.com',
    telephone: '+1234567890',
    role: 'admin',
    isActive: true,
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    _id: '2',
    nom: 'John',
    prenom: 'Doe',
    email: 'john.doe@example.com',
    telephone: '+1234567891',
    role: 'user',
    isActive: true,
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    _id: '3',
    nom: 'Jane',
    prenom: 'Smith',
    email: 'jane.smith@example.com',
    telephone: '+1234567892',
    role: 'user',
    isActive: false,
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired', code: 'TOKEN_EXPIRED' });
      }
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Admin middleware
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

// Helper function to generate user ID
const generateId = () => {
  return (users.length + 1).toString();
};

// Helper function to remove password from user object
const sanitizeUser = (user) => {
  const { password, ...sanitizedUser } = user;
  return sanitizedUser;
};

// Routes

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.isActive) {
      return res.status(401).json({ message: 'Account is deactivated' });
    }

    const accessToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      user: sanitizeUser(user),
      accessToken,
      refreshToken
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Refresh token endpoint
app.post('/refresh-token', (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token required' });
    }

    jwt.verify(refreshToken, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid refresh token' });
      }

      const accessToken = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '15m' }
      );

      res.json({ accessToken });
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all users (admin only)
app.get('/users', authenticateToken, requireAdmin, (req, res) => {
  try {
    const sanitizedUsers = users.map(sanitizeUser);
    res.json(sanitizedUsers);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get user by ID (admin only)
app.get('/users/:id', authenticateToken, requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const user = users.find(u => u._id === id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user: sanitizeUser(user) });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create new user (admin only)
app.post('/users', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { nom, prenom, email, telephone, password, role, isActive } = req.body;

    // Validation
    if (!nom || !prenom || !email || !password || !role) {
      return res.status(400).json({ message: 'Required fields: nom, prenom, email, password, role' });
    }

    // Check if email already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      _id: generateId(),
      nom,
      prenom,
      email,
      telephone: telephone || '',
      role,
      isActive: isActive !== undefined ? isActive : true,
      password: hashedPassword,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    users.push(newUser);

    res.status(201).json({ user: sanitizeUser(newUser) });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update user (admin only)
app.put('/users/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, prenom, email, telephone, password, role, isActive } = req.body;

    const userIndex = users.findIndex(u => u._id === id);
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if email already exists (excluding current user)
    if (email) {
      const existingUser = users.find(u => u.email === email && u._id !== id);
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
    }

    // Update user data
    const updatedUser = { ...users[userIndex] };
    if (nom) updatedUser.nom = nom;
    if (prenom) updatedUser.prenom = prenom;
    if (email) updatedUser.email = email;
    if (telephone !== undefined) updatedUser.telephone = telephone;
    if (role) updatedUser.role = role;
    if (isActive !== undefined) updatedUser.isActive = isActive;
    if (password) {
      updatedUser.password = await bcrypt.hash(password, 10);
    }
    updatedUser.updated_at = new Date().toISOString();

    users[userIndex] = updatedUser;

    res.json({ user: sanitizeUser(updatedUser) });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete user (admin only)
app.delete('/users/:id', authenticateToken, requireAdmin, (req, res) => {
  try {
    const { id } = req.params;

    const userIndex = users.findIndex(u => u._id === id);
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Don't allow deleting the last admin
    const user = users[userIndex];
    if (user.role === 'admin') {
      const adminCount = users.filter(u => u.role === 'admin').length;
      if (adminCount <= 1) {
        return res.status(400).json({ message: 'Cannot delete the last admin user' });
      }
    }

    users.splice(userIndex, 1);

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Toggle user status (admin only)
app.patch('/users/:id/status', authenticateToken, requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    const userIndex = users.findIndex(u => u._id === id);
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = users[userIndex];

    // Don't allow deactivating the last admin
    if (user.role === 'admin' && !isActive) {
      const activeAdminCount = users.filter(u => u.role === 'admin' && u.isActive).length;
      if (activeAdminCount <= 1) {
        return res.status(400).json({ message: 'Cannot deactivate the last active admin user' });
      }
    }

    users[userIndex].isActive = isActive;
    users[userIndex].updated_at = new Date().toISOString();

    res.json({ user: sanitizeUser(users[userIndex]) });
  } catch (error) {
    console.error('Toggle user status error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
