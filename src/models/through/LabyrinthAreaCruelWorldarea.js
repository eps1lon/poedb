module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'LabyrinthAreaCruelWorldarea',
    {
      row: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      engine: 'MyISAM',
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
      indexes: [],
      tableName: 'labyrinth_area_cruel_worldareas',
    },
  );

  model.associate = models => {
    model.belongsTo(models.LabyrinthArea, {
      foreignKey: 'labyrinth_area_row',
      targetKey: 'row',
      nullable: true,
      constraints: false,
    });
    model.belongsTo(models.WorldArea, {
      foreignKey: 'world_area_row',
      targetKey: 'row',
      nullable: true,
      constraints: false,
    });
  };

  model.DAT_FILE = 'ThroughModelAlias';
  return model;
};
