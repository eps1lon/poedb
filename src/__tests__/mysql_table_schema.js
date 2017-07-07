const MysqlTableSchema = require('../MysqlTableSchema');

const spec = require('./spec.json')[0];

describe('MysqlTableSchema', () => {
  const mods = new MysqlTableSchema('Mods.dat', spec['Mods.dat']);

  it('should recognized extended props', () => {
    expect(mods.isExtendedProp('SpawnWeight_TagsKeys')).toBe(true);
    expect(mods.isExtendedProp('SpawnWeight_Values')).toBe(true);
    expect(mods.isExtendedProp('SomeExtendedProp_TagsKey')).toBe(false);
    expect(mods.isExtendedProp('SomeSimpleProp')).toBe(false);
  });

  it('should recognize hasMany relations', () => {
    expect(mods.isHasMany('SpawnWeight_TagsKeys')).toBe(true);
    expect(mods.isHasMany('Keys0')).toBe(true);
    expect(mods.isHasMany('Key0')).toBe(false);
  });

  it('should recognize foreign keys', () => {
    expect(mods.isForeignKey('SpawnWeight_TagsKeys')).toBe(true);
    expect(mods.isForeignKey('BuffDefinitionsKey')).toBe(true);
    expect(mods.isForeignKey('Keys0')).toBe(true);
    expect(mods.isForeignKey('Key0')).toBe(true);
  });

  it('should recognize key candidates', () => {
    expect(mods.isKeyCandidate('Row')).toBe(true);
    expect(mods.isKeyCandidate('SpawnWeight_TagsKeys')).toBe(true);
    expect(mods.isKeyCandidate('BuffDefinitionsKey')).toBe(true);
    expect(mods.isKeyCandidate('Keys0')).toBe(true);
    expect(mods.isKeyCandidate('Key0')).toBe(true);
  });

  it('should output correct col definitions', () => {
    expect(mods.columnDefinition('Row')).toBe(
      'BIGINT UNSIGNED NULL PRIMARY KEY',
    );
    expect(mods.columnDefinition('SpawnWeight_TagsKeys')).toBe(
      'BIGINT UNSIGNED NULL PRIMARY KEY',
    );
    expect(mods.columnDefinition('BuffDefinitionsKey')).toBe(
      'BIGINT UNSIGNED NULL KEY',
    );
    expect(mods.columnDefinition('Id')).toBe('TEXT NULL');
    expect(mods.columnDefinition('Stat1Min')).toBe('INT NULL');
  });

  it('should generate correct col names', () => {
    expect(mods.colName('Row')).toBe('row');
    expect(mods.colName('SpawnWeight_TagsKeys')).toBe('tags_row');
    expect(mods.colName('BuffDefinitionsKey')).toBe('buff_definitions_row');
    expect(mods.colName('Id')).toBe('id');
    expect(mods.colName('Stat1Min')).toBe('stat1_min');
  });

  it('should generate correct create queries', () => {
    expect(mods.createQuery()).toMatchSnapshot();

    expect(
      new MysqlTableSchema(
        'MonsterVarieties.dat',
        spec['MonsterVarieties.dat'],
      ).createQuery(),
    ).toMatchSnapshot();
  });

  it('should generate correct create queries for all relations', () => {
    expect(mods.createQueryRelations()).toMatchSnapshot();

    expect(
      new MysqlTableSchema(
        'MonsterVarieties.dat',
        spec['MonsterVarieties.dat'],
      ).createQueryRelations(),
    ).toMatchSnapshot();
  });
});