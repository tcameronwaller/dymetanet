/**
 * Model of the comprehensive state of the application.
 * This class stores attributes that represent the entire state of the
 * application.
 * It is the role of the model to know which attributes and which values of
 * these attributes describe the application.
 */
class Model {
    /**
     * Initializes an instance of class Model.
     */
    constructor() {
        // It is the role of the model to know which attributes and which values
        // of these attributes describe the application.
        // Specify attributes for the model to expect and accept.
        this.attributeNames = [
            "metabolites", "reactions", "compartments", "genes", "processes",
            "entityAttributes", "checkFile", "assemblyFile", "restoreFile",
            "attributeViewEntity", "attributeViewFilter",
            "attributeViewAttributeSearches",
            "attributeViewAttributeValueSelections",
            "entityViewControlSelection", "entityViewCompartmentalization",
            "entityViewReplications", "entityViewShowReplications",
            "entityViewNetworkNodes", "entityViewNetworkLinks",
            "entityViewProximityFocus", "entityViewProximityDirection",
            "entityViewProximityDepth", "entityViewSubnetworkNodes",
            "entityViewSubnetworkLinks", "persistence"
        ];
    }
    /**
     * Restores the model for changes and initializes representation of the
     * application's state.
     * This method controls the vetting of all proposals for changes to the
     * model.
     * @param {Array<Object>} newAttributes Collection of new attributes to
     * replace old attributes in the model.
     */
    restore(newAttributes) {
        // Accept new attributes and assign them to the model.
        newAttributes.forEach(function (newAttribute) {
            // Confirm that the record for the new attribute value is valid.
            if (
                newAttribute.hasOwnProperty("attribute") &&
                newAttribute.hasOwnProperty("value")
            ) {
                // Confirm that the attribute exists in the model.
                if (this.attributeNames.includes(newAttribute.attribute)) {
                    this[newAttribute.attribute] = newAttribute.value;
                }
            }
        });
        // Initialize instance of state representation.
        // Pass this instance a reference to the model.
        new State(this);
    }

    // TODO: I might want functionality to print a representation of the model to the console.
    // TODO: I might also want the ability to save a JSON of the model to allow session persistence and restoration.

}