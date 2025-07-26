import { DataTypes } from "sequelize";
import { sequelize } from "../../database/index.js";

export const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            len: [2, 50]
        }
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
        validate: {
            len: [0, 20]
        }
    },
    avatar: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
            len: [0, 255]
        }
    },
    role: {
        type: DataTypes.ENUM('user', 'admin', 'moderator'),
        defaultValue: 'user',
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    isEmailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    emailVerificationToken: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    emailVerificationExpires: {
        type: DataTypes.DATE,
        allowNull: true
    },
    passwordResetToken: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    passwordResetExpires: {
        type: DataTypes.DATE,
        allowNull: true
    },
    lastLogin: {
        type: DataTypes.DATE,
        allowNull: true
    },
    loginAttempts: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
            min: 0
        }
    },
    lockUntil: {
        type: DataTypes.DATE,
        allowNull: true
    },
    preferences: {
        type: DataTypes.JSON,
        allowNull: true
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    lastLoginAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    gender: {
        type: DataTypes.ENUM('male', 'female', 'other', 'prefer_not_to_say'),
        allowNull: true
    }
}, {
    indexes: [
        {
            fields: ['email']
        },
        {
            fields: ['role']
        },
        {
            fields: ['isActive']
        },
        {
            fields: ['isEmailVerified']
        },
        {
            fields: ['createdAt']
        }
    ],
    hooks: {
        beforeCreate: (user) => {
            // Ensure email is lowercase
            if (user.email) {
                user.email = user.email.toLowerCase();
            }
        },
        beforeUpdate: (user) => {
            // Ensure email is lowercase
            if (user.changed('email') && user.email) {
                user.email = user.email.toLowerCase();
            }
        }
    }
});