import { DataTypes } from "sequelize";
import { sequelize } from "../../database/index.js";

export const Product = sequelize.define("Product", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            len: [2, 100]
        }
    },
    slug: {
        type: DataTypes.STRING(150),
        unique: true,
        allowNull: true, // Temporarily allow null to fix the error
        validate: {
            len: [2, 150]
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [10, 2000]
        }
    },
    shortDescription: {
        type: DataTypes.STRING(200),
        allowNull: true,
        validate: {
            len: [0, 200]
        }
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0.01
        }
    },
    originalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        validate: {
            min: 0
        }
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    category: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            len: [2, 50]
        }
    },
    subcategory: {
        type: DataTypes.STRING(50),
        allowNull: true,
        validate: {
            len: [0, 50]
        }
    },
    brand: {
        type: DataTypes.STRING(50),
        allowNull: true,
        validate: {
            len: [0, 50]
        }
    },
    sku: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: true,
        validate: {
            len: [0, 50]
        }
    },
    weight: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: true,
        validate: {
            min: 0
        }
    },
    dimensions: {
        type: DataTypes.JSON,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
            len: [0, 255]
        }
    },
    images: {
        type: DataTypes.JSON,
        allowNull: true
    },
    tags: {
        type: DataTypes.JSON,
        allowNull: true
    },
    inStock: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    isFeatured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    rating: {
        type: DataTypes.DECIMAL(3, 2),
        defaultValue: 0,
        validate: {
            min: 0,
            max: 5
        }
    },
    reviewCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    viewCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    soldCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
            min: 0
        }
    }
}, {
    indexes: [
        {
            fields: ['category']
        },
        {
            fields: ['brand']
        },
        {
            fields: ['isActive']
        },
        {
            fields: ['isFeatured']
        },
        {
            fields: ['inStock']
        },
        {
            fields: ['price']
        },
        {
            fields: ['rating']
        },
        {
            fields: ['createdAt']
        }
    ],
    hooks: {
        beforeCreate: (product) => {
            // Generate slug from name
            if (!product.slug) {
                product.slug = product.name
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '');
            }
            
            // Update inStock based on stock
            product.inStock = product.stock > 0;
        },
        beforeUpdate: (product) => {
            // Update inStock based on stock
            if (product.changed('stock')) {
                product.inStock = product.stock > 0;
            }
        }
    }
}); 