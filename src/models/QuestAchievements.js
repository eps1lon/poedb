module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'QuestAchievements',
    {
      row: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        $col_order: -1,
      },
      quest_state: {
        type: DataTypes.INTEGER,
        primaryKey: false,
        allowNull: false,
        $col_order: 1,
      },
      is_hardcore_achievement: {
        type: DataTypes.BOOLEAN,
        primaryKey: false,
        allowNull: false,
        $col_order: 2,
      },
      is_standard_achievement: {
        type: DataTypes.BOOLEAN,
        primaryKey: false,
        allowNull: false,
        $col_order: 3,
      },
      unknown1: {
        type: DataTypes.INTEGER,
        primaryKey: false,
        allowNull: false,
        $col_order: 5,
      },
    },
    {
      engine: 'MyISAM',
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
      indexes: [
        {
          fields: ['achievement_items_key'],
        },
        {
          fields: ['difficulties_key'],
        },
      ],
    },
  );

  model.associate = models => {
    model.belongsTo(models.AchievementItems, {
      foreignKey: {
        name: 'achievement_items_key',
        $col_order: 0,
      },
      targetKey: 'row',
      nullable: true,
      constraints: false,
    });
    models.AchievementItems.hasMany(model, {
      foreignKey: {
        name: 'achievement_items_key',
        $col_order: 0,
      },
      targetKey: undefined,
      nullable: true,
      constraints: false,
      sourceKey: 'row',
    });
    model.belongsTo(models.Difficulties, {
      foreignKey: {
        name: 'difficulties_key',
        $col_order: 4,
      },
      targetKey: 'row',
      nullable: true,
      constraints: false,
    });
    models.Difficulties.hasMany(model, {
      foreignKey: {
        name: 'difficulties_key',
        $col_order: 4,
      },
      targetKey: undefined,
      nullable: true,
      constraints: false,
      sourceKey: 'row',
    });
  };

  model.DAT_FILE = 'QuestAchievements.dat';
  return model;
};
