module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    'NPCShop',
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
        allowNull: true,
        $col_order: 0,
      },
      unknown0: {
        type: DataTypes.INTEGER,
        primaryKey: false,
        allowNull: true,
        $col_order: 1,
      },
      unknown_keys0: {
        type: DataTypes.TEXT,
        primaryKey: false,
        allowNull: true,
        $col_order: 4,
      },
      unknown_values: {
        type: DataTypes.TEXT,
        primaryKey: false,
        allowNull: true,
        $col_order: 5,
      },
      unknown1: {
        type: DataTypes.INTEGER,
        primaryKey: false,
        allowNull: true,
        $col_order: 6,
      },
      keys1: {
        type: DataTypes.TEXT,
        primaryKey: false,
        allowNull: true,
        $col_order: 7,
      },
      unknown3: {
        type: DataTypes.TEXT,
        primaryKey: false,
        allowNull: true,
        $col_order: 8,
      },
      _sold_item_tags_cache: {
        type: DataTypes.TEXT,
        allowNull: false,
        $col_order: 2,
      },
    },
    {
      engine: 'MYISAM',
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci',
      indexes: [],
      tableName: 'n_p_c_shops',
      underscored: true,
    },
  );

  model.associate = models => {
    model.belongsToMany(models.Tag, {
      as: 'sold_item_tags',
      through: {
        model: models.NPCShopHabtmSoldItemTag,
        unique: false,
      },
      foreignKey: 'npc_shop_row',
      otherKey: 'tag_row',
      $col_order: 2,
      nullable: true,
      constraints: false,
    });
  };

  model.DAT_FILE = 'NPCShop.dat';
  return model;
};
