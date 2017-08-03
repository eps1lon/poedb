module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'MapPinHabtmCruelWorldarea',
    {
      row: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        $col_order: -1,
      },
    },
    {
      engine: 'MyISAM',
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
      indexes: [
        {
          fields: ['map_pin_row', 'world_area_row'],
          name: 'composite primary_alias',
          unique: true,
        },
      ],
      tableName: 'map_pin_habtm_cruel_worldareas',
      underscored: true,
    },
  );

  model.associate = models => {
    model.belongsTo(models.MapPin, {
      foreignKey: 'map_pin_row',
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
