module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'InvasionMonstersPerAreaMonsterVarieties2',
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
      tableName: 'invasion_monsters_per_area_monster_varieties2s',
    },
  );

  model.associate = models => {
    model.belongsTo(models.InvasionMonstersPerArea, {
      foreignKey: 'invasion_monsters_per_area_row',
      targetKey: 'row',
      nullable: true,
      constraints: false,
    });
    model.belongsTo(models.MonsterVariety, {
      foreignKey: 'monster_variety_row',
      targetKey: 'row',
      nullable: true,
      constraints: false,
    });
  };

  model.DAT_FILE = 'ThroughModelAlias';
  return model;
};
