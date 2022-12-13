import { Entities, TEntities } from 'interfaces/entities';

export function convertObjToEntity<T>(EntityKey: TEntities, obj: T) {
  const _user = new Entities[EntityKey]();
  Object.keys(obj).forEach((key) => {
    _user[key] = obj[key];
  });
  return _user;
}
