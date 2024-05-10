const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Bankverbindungen = sequelize.define('Bankverbindungen', {
  BankverbindungId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true, // Assuming BankverbindungId is the primary key
    autoIncrement: true,
    unique: true
  },
  BankName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true // Bic cannot be empty
    }
  },
  Iban: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  Bic: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  Zahlungstyp: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  DienstleisterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  KundeTenantItemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  Zahlungsziel: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      notEmpty: true,
    }
  },
  SteuerNr: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  }
}, {
  tableName: 'Bankverbindungen', // Specify the correct table name here
  timestamps: false, // Assuming your table doesn't have createdAt and updatedAt columns
  id: false
});

module.exports = Bankverbindungen;