// TODO: I still need to organize the setSummary for use in the interface...
// TODO: That setSummary should be specific to the entity of the current setCardinalities.


/**
 * Functionality of utility for counting the metabolic entities that belong to
 * sets according to their values of attributes.
 * This class does not store any attributes and does not require instantiation.
 * This class stores methods for external utility.
 */
class Cardinality {
    // Master control of cardinality procedure.
    /**
     * Determines cardinalities of entities in sets for all values of all
     * attributes.
     * @param {Array<Object>} entitiesAttributes Attributes of all entities.
     * @returns {Object<Object<Object<number>>>} Cardinalities of sets by
     * entities, attributes, and values.
     */
    static determineSetCardinalities(entitiesAttributes) {
        // There are 3 dimensions of information within the table for values of
        // attributes of entities.
        // Dimension 1 includes the individual entities.
        // Dimension 2 includes all attributes of each individual entity.
        // Dimension 3 includes all values of each attribute.
        // Collect counts of entities with each value of each attribute.
        // Iterate separately across entities, attributes, and values.
        // Each iteration only needs access to information about its dimension.
        return Cardinality.collectEntitiesAttributesValues({
            entitiesAttributes: entitiesAttributes
        });
    }
    /**
     * Collects cardinalities across entities.
     * @param {Object} parameters Destructured object of parameters.
     * @param {Array<Object>} parameters.entitiesAttributes Attributes of all
     * entities.
     * @returns {Object<Object<Object<number>>>} Cardinalities of sets by
     * entities, attributes, and values.
     */
    static collectEntitiesAttributesValues({entitiesAttributes} = {}) {
        // Iterate on entities.
        return entitiesAttributes
            .reduce(function (entitiesCollection, entityRecord) {
                // Determine entity.
                var entity = entityRecord.entity;
                // Collect counts of values of attributes for current entity.
                if (entitiesCollection.hasOwnProperty(entity)) {
                    // Collection has a record for the current entity.
                    // Preserve existing records in the collection.
                    var attributesCollection = Object
                        .assign({}, entitiesCollection[entity]);
                } else {
                    // Collection does not have a record for the current entity.
                    // Create a new record.
                    var attributesCollection = {};
                }
                var newAttributesCollection = Cardinality
                    .collectAttributesValues({
                        entityRecord: entityRecord,
                        oldAttributesCollection: attributesCollection
                    });
                // Include information from current entity record within the
                // collection.
                var newEntityRecord = {
                    [entity]: newAttributesCollection
                };
                var newEntitiesCollection = Object
                    .assign({}, entitiesCollection, newEntityRecord);
                return newEntitiesCollection;
            }, {});
    }
    /**
     * Collects cardinalities across attributes of a single entity.
     * @param {Object} parameters Destructured object of parameters.
     * @param {Array<Object>} parameters.entityRecord Record with values of
     * attributes for a single entity.
     * @param {Object<Object>} parameters.oldAttributesCollection
     * Collection of attributes for a single entity.
     * @returns {Object<Object<number>>} Cardinalities of sets by attributes and
     * values.
     */
    static collectAttributesValues({
                                       entityRecord,
                                       oldAttributesCollection
    } = {}) {
        // Determine attributes in entity record.
        var attributes = Object
            .keys(entityRecord).filter(function (key) {
                return (key === "compartments" || key === "processes");
            });
        // Iterate on attributes.
        return attributes
            .reduce(function (attributesCollection, attribute) {
                // Determine attribute record.
                var attributeRecord = entityRecord[attribute];
                // Collect counts of values for current attribute.
                if (attributesCollection.hasOwnProperty(attribute)) {
                    // Collection has a record for the current attribute.
                    // Preserve existing records in the collection.
                    var valuesCollection = Object
                        .assign({}, attributesCollection[attribute]);
                } else {
                    // Collection does not have a record for the current
                    // attribute.
                    // Create a new record.
                    var valuesCollection = {};
                }
                var newValuesCollection = Cardinality.collectValues({
                        attributeRecord: attributeRecord,
                        oldValuesCollection: valuesCollection
                    });
                // Include information from current attribute record within the
                // collection.
                var newAttributeRecord = {
                    [attribute]: newValuesCollection
                };
                var newAttributesCollection = Object
                    .assign({}, attributesCollection, newAttributeRecord);
                return newAttributesCollection;
            }, oldAttributesCollection);
    }
    /**
     * Collects cardinalities across values.
     * @param {Object} parameters Destructured object of parameters.
     * @param {Array<string>} parameters.attributeRecord Record with values of
     * a single attribute.
     * @param {Object<number>} parameters.oldValuesCollection Collection across
     * values.
     * @returns {Object<number>} Cardinalities of sets by values.
     */
    static collectValues({
                             attributeRecord,
                             oldValuesCollection
    } = {}) {
        // Determine values of attribute in entity record.
        var values = attributeRecord;
        // Iterate on values.
        return values.reduce(function (valuesCollection, value) {
            // Collect counts of values.
            if (valuesCollection.hasOwnProperty(value)) {
                // Collection has a record for the current value.
                // Increment count in the record from the collection.
                var count = valuesCollection[value] + 1;
            } else {
                // Collection does not have a record for the current
                // attribute.
                // Initialize count in a new record.
                var count = 1;
            }
            var newValueRecord = {
                [value]: count
            };
            var newValuesCollection = Object
                .assign({}, valuesCollection, newValueRecord);
            return newValuesCollection;
        }, oldValuesCollection);
    }
}

/**
 * Functionality of utility for counting the metabolic entities that belong to
 * sets according to their values of attributes.
 * This class does not store any attributes and does not require instantiation.
 * This class stores methods for external utility.
 */
class CardinalityOld {
    // Master control of cardinality procedure.
    /**
     * Collects cardinalities of sets for all values of all attributes.
     * @param {Array<Object>} entitiesAttributes Attributes of all entities.
     * @returns {Array<Object>} Cardinalities of sets by values of attributes.
     */
    static determineSetCardinalities(entitiesAttributes) {
        // Assume that all records for attributes of entities have the same
        // properties, like rows of a table with the same columns.
        // Determine attributes.
        var attributes = Object
            .keys(entitiesAttributes[0]).filter(function (key) {
                return (key === "compartments" || key === "processes");
            });
        // Iterate on attributes.
        return attributes.map(function (attribute) {
            var entityAttributeValues = Cardinality
                .collectEntityAttributeValues(attribute, entitiesAttributes);
            var metaboliteValues = Cardinality
                .translateEntityAttributeValues(
                    entityAttributeValues.metabolite, "metabolite"
                );
            var reactionValues = Cardinality
                .translateEntityAttributeValues(
                    entityAttributeValues.reaction, "reaction"
                );
            var entityValues = [].concat(metaboliteValues, reactionValues);
            var entityValueCounts = Cardinality
                .countEntityAttributeValues(entityValues);
            // Include the attribute in the value record for reference.
            var values = Object.keys(entityValueCounts).map(function (key) {
                return {
                    attribute: attribute,
                    metabolites: entityValueCounts[key].metabolite,
                    reactions: entityValueCounts[key].reaction,
                    value: entityValueCounts[key].value,
                };
            });
            return {
                attribute: attribute,
                values: values
            };
        });
    }
    /**
     * Collects entities' values of attributes.
     * @param {string} attribute Attribute of interest.
     * @param {Array<Object>} entitiesAttributes Attributes of all entities.
     * @returns {Object<Array<string>>} Collection of values of the attribute
     * for each entity.
     */
    static collectEntityAttributeValues(attribute, entitiesAttributes) {
        // Iterate on entities.
        // Collect all values of the attribute.
        // Partition values by entity.
        return entitiesAttributes.reduce(function (collection, record) {
            // Determine the entities of the current record.
            // Entities are either metabolites or reactions.
            var currentEntity = record.entity;
            if (currentEntity === "metabolite") {
                var otherEntity = "reaction";
            } else {
                var otherEntity = "metabolite";
            }
            if (
                collection.hasOwnProperty(currentEntity) &&
                collection.hasOwnProperty(otherEntity)
            ) {
                // The collection includes records for the entities.
                // Replace the current record with a new record.
                // Update the record for the current entity.
                // Preserve the record for the other entity.
                return {
                    [currentEntity]: collection[currentEntity]
                        .concat(record[attribute]),
                    [otherEntity]: collection[otherEntity]
                };
            } else {
                // The collection does not include records for the entities.
                // Create a new record for the entities.
                // Update the record for the current entity.
                // Initiate the record for the other entity.
                return {
                    [currentEntity]: record[attribute],
                    [otherEntity]: []
                };
            }
        }, {});
    }
    /**
     * Translates records of entities' values of attribute to designate entity
     * along with value.
     * @param {Array<string>} values Values of a single attribute.
     * @param {string} entity Type of entity, metabolite or reaction.
     * @returns {Array<Object<string>>} Entities' values of an attribute.
     */
    static translateEntityAttributeValues(values, entity) {
        return values.map(function (value) {
            return {
                entity: entity,
                value: value
            };
        });
    }
    /**
     * Counts the instances of entities with each value of an attribute.
     * @param {Array<Object<string>>} entityValues Entities' values of an
     * attribute.
     * @returns {Array<Object>} Counts of entities with each value of the
     * attribute.
     */
    static countEntityAttributeValues(entityValues) {
        return entityValues.reduce(function (valueCollection, entityValue) {
            // Determine the entities of the current record.
            var currentEntity = entityValue.entity;
            if (currentEntity === "metabolite") {
                var otherEntity = "reaction";
            } else {
                var otherEntity = "metabolite";
            }
            if (valueCollection.hasOwnProperty(entityValue.value)) {
                // The collection includes a record for the value.
                // Replace the current record with a new record.
                // Increment the count for the current entity.
                // Preserve the current count for the other entity.
                var newRecord = {
                    [entityValue.value]: {
                        value: entityValue.value,
                        [currentEntity]: valueCollection
                            [entityValue.value][currentEntity] + 1,
                        [otherEntity]: valueCollection
                            [entityValue.value][otherEntity]
                    }
                };
                // New record will replace previous record in collection.
                return Object.assign({}, valueCollection, newRecord);
            } else {
                // The collection does not include a record for the value.
                // Create a new record for the value.
                // Initiate the count for the current entity to one.
                // Initiate the count for the other entity to zero.
                var newRecord = {
                    [entityValue.value]: {
                        value: entityValue.value,
                        [currentEntity]: 1,
                        [otherEntity]: 0
                    }
                };
                // New record will replace previous record in collection.
                return Object.assign({}, valueCollection, newRecord);
            }
        }, {});
    }
}