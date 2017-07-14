module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'NPCMaster',
    {
      row: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        $col_order: -1,
      },
      id: {
        type: DataTypes.TEXT,
        primaryKey: false,
        allowNull: false,
        $col_order: 0,
      },
      is_str_master: {
        type: DataTypes.BOOLEAN,
        primaryKey: false,
        allowNull: false,
        $col_order: 2,
      },
      is_dex_master: {
        type: DataTypes.BOOLEAN,
        primaryKey: false,
        allowNull: false,
        $col_order: 3,
      },
      is_int_master: {
        type: DataTypes.BOOLEAN,
        primaryKey: false,
        allowNull: false,
        $col_order: 5,
      },
      hideout: {
        type: DataTypes.TEXT,
        primaryKey: false,
        allowNull: false,
        $col_order: 6,
      },
      keys0: {
        type: DataTypes.TEXT,
        primaryKey: false,
        allowNull: false,
        $col_order: 7,
      },
      unknown7: {
        type: DataTypes.INTEGER,
        primaryKey: false,
        allowNull: false,
        $col_order: 8,
      },
      key2: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: false,
        allowNull: false,
        $col_order: 14,
      },
    },
    {
      engine: 'MyISAM',
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
      indexes: [
        {
          fields: ['np_cs_key'],
        },
        {
          fields: ['signature_mod_mods_key'],
        },
        {
          fields: ['achievement_items_key'],
        },
        {
          fields: ['talisman_achievement_items_key'],
        },
      ],
    },
  );

  model.associate = models => {
    model.belongsTo(models.NPC, {
      foreignKey: {
        name: 'np_cs_key',
        $col_order: 1,
      },
      targetKey: 'id',
      nullable: true,
      constraints: false,
    });
    models.NPC.hasMany(model, {
      foreignKey: {
        name: 'np_cs_key',
        $col_order: 1,
      },
      targetKey: undefined,
      nullable: true,
      constraints: false,
      sourceKey: 'id',
    });
    model.belongsTo(models.Mod, {
      foreignKey: {
        name: 'signature_mod_mods_key',
        $col_order: 4,
      },
      targetKey: 'row',
      nullable: true,
      constraints: false,
    });
    models.Mod.hasMany(model, {
      foreignKey: {
        name: 'signature_mod_mods_key',
        $col_order: 4,
      },
      targetKey: undefined,
      nullable: true,
      constraints: false,
      sourceKey: 'row',
    });
    model.belongsTo(models.AchievementItem, {
      foreignKey: {
        name: 'achievement_items_key',
        $col_order: 9,
      },
      targetKey: 'row',
      nullable: true,
      constraints: false,
    });
    models.AchievementItem.hasMany(model, {
      foreignKey: {
        name: 'achievement_items_key',
        $col_order: 9,
      },
      targetKey: undefined,
      nullable: true,
      constraints: false,
      sourceKey: 'row',
    });
    model.belongsTo(models.AchievementItem, {
      foreignKey: {
        name: 'talisman_achievement_items_key',
        $col_order: 15,
      },
      targetKey: 'row',
      nullable: true,
      constraints: false,
    });
    models.AchievementItem.hasMany(model, {
      foreignKey: {
        name: 'talisman_achievement_items_key',
        $col_order: 15,
      },
      targetKey: undefined,
      nullable: true,
      constraints: false,
      sourceKey: 'row',
    });
    model.belongsToMany(models.Tag, {
      as: 'signature_mod_spawn_weight_tags',
      through: 'NPCMasterSignatureModSpawnWeightTags',
      $col_order: 10,
      nullable: true,
      constraints: false,
    });
    model.belongsToMany(models.Tag, {
      as: 'unknown_weight_tags',
      through: 'NPCMasterUnknownWeightTags',
      $col_order: 12,
      nullable: true,
      constraints: false,
    });
    model.belongsToMany(models.AchievementItem, {
      as: 'master_level5_achievement_items',
      through: 'NPCMasterMasterLevel5AchievementItems',
      $col_order: 16,
      nullable: true,
      constraints: false,
    });
  };

  model.DAT_FILE = 'NPCMaster.dat';
  return model;
};
