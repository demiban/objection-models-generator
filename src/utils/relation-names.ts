import { O2MRelation, M2ORelation, M2MRelation, ForeignKey } from 'pg-structure';

const getKeyName = (key: ForeignKey) => {
  return key.columns[0].name.replace(/id$|_id$|Id$/gm, '')
}

export function o2m(relation: O2MRelation): string {
  const targetTableName = relation.targetName;
  let relationName = '';
  
  // Verify if Target Table O2M relation exist multiple times
  // and the foreing key name for a unique relation name 
  if (relation.sourceTable.hasManyTables
    .getAll(relation.targetTable.name)
    .length > 1) {
    const foreingKey = getKeyName(relation.foreignKey);
      
    relationName += `${foreingKey}_`;
  }

  relationName += targetTableName;

  return relationName;
}

export function m2o(relation: M2ORelation): string {
  return getKeyName(relation.foreignKey);
}

// TODO: Fix name repetion with O2M e.g see entity.model
export function m2m(relation: M2MRelation): string {

  const sourceFkName = getKeyName(relation.foreignKey)

  const targetFkName = getKeyName(relation.targetForeignKey);

  let relationName = ''

  if (relation.sourceTable.belongsToManyTables
    .getAll(relation.targetTable.name)
    .length > 1) {
    relationName += `${sourceFkName}_`;
  }

  relationName += targetFkName;

  return relationName;
}