module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'BuffVisualHabtmPreloadGroup',
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
          fields: ['buff_visual_row', 'preload_group_row'],
          name: 'composite primary_alias',
          unique: true,
        },
      ],
      tableName: 'buff_visual_habtm_preload_groups',
      underscored: true,
    },
  );

  model.associate = models => {
    model.belongsTo(models.BuffVisual, {
      foreignKey: 'buff_visual_row',
      targetKey: 'row',
      nullable: true,
      constraints: false,
    });
    model.belongsTo(models.PreloadGroup, {
      foreignKey: 'preload_group_row',
      targetKey: 'row',
      nullable: true,
      constraints: false,
    });
  };

  model.DAT_FILE = 'ThroughModelAlias';
  return model;
};
