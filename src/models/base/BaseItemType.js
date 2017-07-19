module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'BaseItemType',
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
      width: {
        type: DataTypes.INTEGER,
        primaryKey: false,
        allowNull: false,
        $col_order: 2,
      },
      height: {
        type: DataTypes.INTEGER,
        primaryKey: false,
        allowNull: false,
        $col_order: 3,
      },
      name: {
        type: DataTypes.TEXT,
        primaryKey: false,
        allowNull: false,
        $col_order: 4,
      },
      inherits_from: {
        type: DataTypes.TEXT,
        primaryKey: false,
        allowNull: false,
        $col_order: 5,
      },
      drop_level: {
        type: DataTypes.INTEGER,
        primaryKey: false,
        allowNull: false,
        $col_order: 6,
      },
      unknown1: {
        type: DataTypes.INTEGER,
        primaryKey: false,
        allowNull: false,
        $col_order: 9,
      },
      unknown2: {
        type: DataTypes.INTEGER,
        primaryKey: false,
        allowNull: false,
        $col_order: 16,
      },
      flag0: {
        type: DataTypes.BOOLEAN,
        primaryKey: false,
        allowNull: false,
        $col_order: 17,
      },
      unknown_unique: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: false,
        allowNull: false,
        $col_order: 19,
      },
      unknown20: {
        type: DataTypes.TEXT,
        primaryKey: false,
        allowNull: false,
        $col_order: 25,
      },
      is_picked_up_by_monsters: {
        type: DataTypes.BOOLEAN,
        primaryKey: false,
        allowNull: false,
        $col_order: 27,
      },
      data11: {
        type: DataTypes.TEXT,
        primaryKey: false,
        allowNull: false,
        $col_order: 28,
      },
    },
    {
      engine: 'MyISAM',
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
      indexes: [
        {
          fields: [
            {
              attribute: 'item_classes_key',
            },
          ],
          name: 'index_item_classes_key',
        },
        {
          fields: [
            {
              attribute: 'flavour_text_key',
            },
          ],
          name: 'index_flavour_text_key',
        },
        {
          fields: [
            {
              attribute: 'sound_effects_key',
            },
          ],
          name: 'index_sound_effects_key',
        },
        {
          fields: [
            {
              attribute: 'item_visual_identity_key',
            },
          ],
          name: 'index_item_visual_identity_key',
        },
        {
          fields: [
            {
              attribute: 'equip__achievement_items_key',
            },
          ],
          name: 'index_equip__achievement_items_key',
        },
      ],
      tableName: 'base_item_types',
    },
  );

  model.associate = models => {
    model.belongsTo(models.ItemClass, {
      foreignKey: {
        name: 'item_classes_key',
        $col_order: 1,
        $type: 'ulong',
      },
      targetKey: 'row',
      nullable: true,
      constraints: false,
    });
    model.belongsTo(models.FlavourText, {
      foreignKey: {
        name: 'flavour_text_key',
        $col_order: 7,
        $type: 'ulong',
      },
      targetKey: 'row',
      nullable: true,
      constraints: false,
    });
    model.belongsTo(models.SoundEffect, {
      foreignKey: {
        name: 'sound_effects_key',
        $col_order: 10,
        $type: 'ulong',
      },
      targetKey: 'row',
      nullable: true,
      constraints: false,
    });
    model.belongsTo(models.ItemVisualIdentity, {
      foreignKey: {
        name: 'item_visual_identity_key',
        $col_order: 18,
        $type: 'ulong',
      },
      targetKey: 'row',
      nullable: true,
      constraints: false,
    });
    model.belongsTo(models.AchievementItem, {
      foreignKey: {
        name: 'equip__achievement_items_key',
        $col_order: 26,
        $type: 'ulong',
      },
      targetKey: 'row',
      nullable: true,
      constraints: false,
    });
    model.belongsToMany(models.Mod, {
      as: 'implicit__mods',
      through: {
        model: models.BaseItemTypeHabtmImplicitMod,
        unique: false,
      },
      foreignKey: 'base_item_type_row',
      otherKey: 'mod_row',
      $col_order: 8,
      nullable: true,
      constraints: false,
    });
    model.belongsToMany(models.BaseItemType, {
      as: 'normal_purchase__base_item_types',
      through: {
        model: models.BaseItemTypeHabtmNormalPurchaseBaseitemtype,
        unique: false,
      },
      foreignKey: 'source_row',
      otherKey: 'target_row',
      $col_order: 11,
      nullable: true,
      constraints: false,
    });
    model.belongsToMany(models.BaseItemType, {
      as: 'magic_purchase__base_item_types',
      through: {
        model: models.BaseItemTypeHabtmMagicPurchaseBaseitemtype,
        unique: false,
      },
      foreignKey: 'source_row',
      otherKey: 'target_row',
      $col_order: 13,
      nullable: true,
      constraints: false,
    });
    model.belongsToMany(models.Tag, {
      as: 'tags',
      through: {
        model: models.BaseItemTypeHabtmTag,
        unique: false,
      },
      foreignKey: 'base_item_type_row',
      otherKey: 'tag_row',
      $col_order: 15,
      nullable: true,
      constraints: false,
    });
    model.belongsToMany(models.AchievementItem, {
      as: 'vendor_recipe__achievement_items',
      through: {
        model: models.BaseItemTypeHabtmVendorRecipeAchievementitem,
        unique: false,
      },
      foreignKey: 'base_item_type_row',
      otherKey: 'achievement_item_row',
      $col_order: 20,
      nullable: true,
      constraints: false,
    });
    model.belongsToMany(models.BaseItemType, {
      as: 'rare_purchase__base_item_types',
      through: {
        model: models.BaseItemTypeHabtmRarePurchaseBaseitemtype,
        unique: false,
      },
      foreignKey: 'source_row',
      otherKey: 'target_row',
      $col_order: 21,
      nullable: true,
      constraints: false,
    });
    model.belongsToMany(models.BaseItemType, {
      as: 'unique_purchase__base_item_types',
      through: {
        model: models.BaseItemTypeHabtmUniquePurchaseBaseitemtype,
        unique: false,
      },
      foreignKey: 'source_row',
      otherKey: 'target_row',
      $col_order: 23,
      nullable: true,
      constraints: false,
    });
  };

  model.DAT_FILE = 'BaseItemTypes.dat';
  return model;
};