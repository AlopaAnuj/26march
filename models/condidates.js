/* jshint indent: 1 */
module.exports = function (sequelize, DataTypes) {
    let condidates = sequelize.define(
        "condidates",
        {
            id: {
                type: DataTypes.INTEGER(10),
                allowNull: false,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.INTEGER(10),
                allowNull: false,
            },
            fullName: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            guardianName: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            dateOfBirth: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            address: {
                type: DataTypes.JSON,
                allowNull: false,
            },
            contactNumber: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            gender: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            state: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            district: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            primaryRole: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            secondaryRole: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            otherRole: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            photo: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            birthCertificate: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            aadhar: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            createddatetime: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            modifieddatetime: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            tableName: "condidates",
            timestamps: false,
        }
    );
    return condidates;
};
