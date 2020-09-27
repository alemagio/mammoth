import { Query, ResultSet } from '../types';
import { count, defineDb, defineTable, integer, text, timestampWithTimeZone, uuid } from '..';

/** @dts-jest enable:test-type */

const foo = defineTable(`foo`, {
  id: uuid().primaryKey().default(`gen_random_id()`),
  createDate: timestampWithTimeZone().notNull().default(`now()`),
  name: text().notNull(),
  value: integer(),
});

const toSnap = <T extends Query>(query: T): ResultSet<T, true> => {
  return undefined as any;
};

const db = defineDb(() => Promise.resolve({ rows: [], affectedRowsCount: 0 }));

// @dts-jest:group update
{
  // @dts-jest:snap should update and returning id
  toSnap(db.update(foo).set({ name: `Test`, value: 123 }).returning(`id`));

  // @dts-jest:snap should update and returning two columns
  toSnap(db.update(foo).set({ name: `Test`, value: 123 }).returning(`id`, `name`));

  // @dts-jest:snap should update without returning and return number
  toSnap(db.update(foo).set({ name: `Test`, value: 123 }));

  // @dts-jest:snap should insert into foo with a single required column
  db.insertInto(foo).values({
    name: `Test`,
  });
}