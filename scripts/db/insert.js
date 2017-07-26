const _ = require('lodash');

const { orm_creator } = require('../../src/db');
const { buildAssocKeys, buildAttrObj } = require('../../src/model/util');

// maximum tally of records inserted in one packet
const MAX_PACKET_SIZE = 50000;

// splits records into chunks and maps model#bulkCreate on these chunks
const bulkChunkCreate = (model, records, size, options = {}) =>
  _.chunk(records, size).map(
    async chunk => await model.bulkCreate(chunk, options),
  );

/**
 * gets the affectedRows by all the chunks
 * @param {bulkdCreate.returnval[]} chunks 
 */
const affectedRowsInChunks = async chunks => {
  const inserted = await Promise.all(chunks);
  return _.sum(inserted.map(chunk => chunk.length));
};

const all_records = require('../../data/records.json');

(async () => {
  const orm = orm_creator({ logging: false });
  const models = require('../../src/models')({ normalization: 3 }).init(orm);

  const start_time = Date.now();

  let total_insert_count = 0;

  try {
    for (const [dat_file, records] of Object.entries(all_records).filter(
      ([dat]) => dat === 'Achievements.dat',
    )) {
      const model = Object.values(models).find(
        model => model.DAT_FILE === dat_file,
      );

      const records_as_obj = records.map((record, row) => {
        return buildAttrObj(record, model, { row });
      });

      const inserted = await model.bulkCreate(records_as_obj, {
        ignoreDuplicates: true,
      });
      const affected_rows = inserted.length;

      total_insert_count += affected_rows;

      console.log(`inserted ${affected_rows} instances into ${model.name}`);

      const many_to_may_records = records.reduce(
        (associations, record, row) => {
          const assoc_keys = buildAssocKeys(model, record, row);

          if (row === 0) {
            return assoc_keys;
          } else {
            // merge
            for (const assoc in assoc_keys) {
              associations[assoc] = associations[assoc].concat(
                assoc_keys[assoc],
              );
            }

            return associations;
          }
        },
        {},
      );

      // create entries in the Through models
      for (const assoc in many_to_may_records) {
        const records = many_to_may_records[assoc];
        const assoc_model = model.associations[assoc].through.model;

        const assocs_as_obj = records.map(([source, target]) => {
          return {
            [model.associations[assoc].foreignKey]: source,
            [model.associations[assoc].otherKey]: target,
          };
        });

        // chunk or we will get packet to large
        const inserts = bulkChunkCreate(
          assoc_model,
          assocs_as_obj,
          MAX_PACKET_SIZE,
          {
            ignoreDuplicates: true,
            // keep this as simple as possible
            // these are just join models so we are cutting it a bit loose to
            // be fast
            hooks: false,
            validate: false,
            // not documented but according to stackoverflow this
            // will skip building every single object
            raw: true,
          },
        );

        const affected_rows = await affectedRowsInChunks(inserts);
        total_insert_count += affected_rows;

        console.log(
          `inserted ${affected_rows} associations into ${assoc_model.name}`,
        );
      }
    }
  } catch (e) {
    console.warn(e);
  } finally {
    orm.close();

    const runtime = (Date.now() - start_time) / 1000;
    console.log(
      `inserted ${total_insert_count} in ${runtime}s (${total_insert_count /
        runtime} inserts/s)`,
    );
  }
})();
