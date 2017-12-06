/*
Profondeur supports visual exploration and analysis of metabolic networks.
Copyright (C) 2017 Thomas Cameron Waller

This program is free software: you can redistribute it and/or modify it under
the terms of the GNU General Public License as published by the Free Software
Foundation, either version 3 of the License, or (at your option) any later
version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE.
See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with
this program.
If not, see <http://www.gnu.org/licenses/>.

This file is part of project Profondeur.
Project repository's address: https://github.com/tcameronwaller/profondeur/
Author's electronic address: tcameronwaller@gmail.com
Author's physical address:
T Cameron Waller
Scientific Computing and Imaging Institute
University of Utah
72 South Central Campus Drive Room 3750
Salt Lake City, Utah 84112
United States of America
*/

/**
* The application's state.
* This class stores values of attributes that define the application's state.
* The class accepts and stores appropriate values of attributes that define the
* application's state.
*/
class State {
  /**
  * Initializes an instance of the class.
  */
  constructor() {
    // Set reference to class' current instance to persist across scopes.
    var self = this;
    // Specify state's attributes.
    this.attributeNames = [

      // Source.
      // Attribute "source" stores a reference to a file on client's system that
      // is a source of information.
      "source",

      // Metabolic entities and sets.
      // Attribute "metabolites" stores information about chemically-unique
      // metabolites.
      "metabolites",
      // Attribute "reactions" stores information about reactions that
      // facilitate chemical conversion or physical transport of metabolites.
      // Information includes references to attributes "metabolites",
      // "compartments", and "processes".
      "reactions",
      // Attribute "genes" stores information about genes.
      "genes",
      // Attribute "compartments" stores information about compartments within a
      // cell.
      "compartments",
      // Attribute "processes" stores information about processes or pathways.
      "processes",

      // Sets.
      // Attribute "totalReactionsSets" stores information for all reactions
      // about all the metabolites that participate in each reaction and the
      // sets to which each reaction belongs by all its values of attributes.
      // The purpose of attribute "totalReactionsSets" is to provide complete
      // information against which to apply filters.
      // Information includes references to attributes "reactions",
      // "metabolites", "compartments", and "processes".
      // Information derives from attribute "reactions".
      "totalReactionsSets",
      // Attribute "totalMetabolitesSets" stores information for all metabolites
      // about all the reactions in which each metabolite participates and the
      // sets to which each metabolite belongs by all its values of attributes.
      // The purpose of attribute "totalMetabolitesSets" is to provide complete
      // information against which to apply filters.
      // Information includes references to attributes "metabolites",
      // "reactions", "compartments", and "processes".
      // Information derives from attributes "totalReactionsSets" and
      // "reactions".
      "totalMetabolitesSets",
      // Attribute "setsFilters" stores information about selections of sets
      // by values of entities' attributes to apply as filters.
      // The purpose of attribute "setsFilters" is to define filters for
      // filtration of entities by their values of attributes.
      // Information includes references to attributes "compartments" and
      // "processes".
      "setsFilters",
      // Attribute "accessReactionsSets" stores information for reactions that
      // pass filters about all the metabolites that participate in each
      // reaction and the sets to which each reaction belongs by all its values
      // of attributes.
      // The purpose of attribute "accessReactionsSets" is to constrain the
      // accessibility of sets for selection in the sets' menu.
      // Information includes references to attributes "reactions",
      // "metabolites", "compartments", and "processes".
      // Information derives from attributes "setsFilters",
      // "totalReactionsSets", and "reactions".
      "accessReactionsSets",
      // Attribute "accessMetabolitesSets" stores information for metabolites
      // that pass filters about all the reactions in which each metabolite
      // participates and the sets to which each metabolite belongs by all its
      // values of attributes.
      // The purpose of attribute "accessMetabolitesSets" is to constrain the
      // accessibility of sets for selection in the sets' menu.
      // Information includes references to attributes "metabolites",
      // "reactions", "compartments", and "processes".
      // Information derives from attributes "totalMetabolitesSets",
      // "accessReactionsSets" and "reactions".
      "accessMetabolitesSets",
      // Attribute "filterReactionsSets" stores information for reactions that
      // pass filters about the metabolites that participate in each reaction in
      // contexts that pass filters and the sets to which each reaction belongs
      // by its values of attributes that pass filters.
      // The purpose of attribute "filterReactionsSets" is to define reactions,
      // metabolites, and their attributes that pass filters.
      // Information includes references to attributes "reactions",
      // "metabolites", "compartments", and "processes".
      // Information derives from attributes "setsFilters",
      // "totalReactionsSets", and "reactions".
      "filterReactionsSets",
      // Attribute "filterMetabolitesSets" stores information for metabolites
      // that pass filters about the reactions in which each metabolite
      // participates in contexts that pass filters and the sets to which each
      // metabolite belongs by its values of attributes that pass filters.
      // The purpose of attribute "filterMetabolitesSets" is to define
      // metabolites and their attributes that pass filters.
      // Information includes references to attributes "metabolites",
      // "reactions", "compartments", and "processes".
      // Information derives from attributes "totalMetabolitesSets",
      // "filterReactionsSets" and "reactions".
      "filterMetabolitesSets",
      // Attribute "setsEntities" stores information about the type of entities,
      // metabolites or reactions, to represent in the sets' summary.
      "setsEntities",
      // Attribute "setsFilter" stores information about whether to represent
      // entities and their values of attributes after filtration in the sets'
      // summary.
      "setsFilter",
      // Attribute "setsCardinalitites" stores information about the counts of
      // entities that belong to each set by their values of attributes.
      // Information includes references to attributes "compartments" and
      // "processes".
      // Information derives from attributes "setsEntities", "setsFilter",
      // "currentReactionsSets", "currentMetabolitesSets", "totalReactionsSets",
      // "totalMetabolitesSets".
      "setsCardinalities",
      // Attribute "setsSorts" stores information about the sort criteria and
      // orders for the summaries of sets' cardinalities.
      // Information includes references to attributes "compartments" and
      // "processes".
      "setsSorts",
      // Attribute "setsSummaries" stores information about the counts of
      // entities that belong to each set by their values of attributes.
      // Information includes additional details for representation in the sets'
      // summary.
      // Information includes references to attributes "compartments" and
      // "processes".
      // Information derives from attribute "setsCardinalities".
      "setsSummaries",

      // Entities.
      // Attribute "compartmentalization" stores information about whether to
      // represent compartmentalization of metabolites.
      "compartmentalization",

      // Attribute "reactionsSimplifications" stores information about
      // selections of reactions for simplification by omission.
      // Information includes references to attribute "reactionsCandidates".
      "reactionsSimplifications",
      // Attribute "metabolitesSimplifications" stores information about
      // selections of metabolites for simplification either by replication or
      // omission.
      // Information includes references to attribute "metabolitesCandidates".
      "metabolitesSimplifications",

      // Attribute "reactionsCandidates" stores information for each reaction
      // about the metabolites that participate.
      // Information includes compartmentalization of metabolites.
      // Information includes references to attributes "reactions",
      // "metabolites", and "compartments".
      // Information derives from attributes "compartmentalization",
      // "filterReactionsSets", and "reactions".
      "reactionsCandidates",
      // Attribute "metabolitesCandidates" stores information for each
      // metabolite about the reactions in which it participates.
      // Information includes compartmentalization of metabolites.
      // Information includes references to attributes "metabolites",
      // "reactions", and "compartments".
      // Information derives from attribute "reactionsCandidates".
      "metabolitesCandidates",

      // Network.
      "networkNodesReactions",
      "networkNodesMetabolites",
      "networkLinks",
      "subNetworkNodesMetabolites",
      "subNetworkNodesReactions",
      "subNetworkLinks",

      // TODO: Maybe include "relevantEntities" that represent entities that pass filters, are preserved as candidates, represented in network, and also part of specific subnetwork.




      // Network.
      "metabolitesNodes", "reactionsNodes", "links",
      "network",
      // Subnetwork.
      "proximityFocus", "proximityDirection", "proximityDepth",
      "pathOrigin", "pathDestination", "pathDirection", "pathCount",
      "currentMetabolitesNodes", "currentReactionsNodes", "currentLinks",
      "subNetwork",
    ];
  }
  /**
  * Restores the values of attributes in application's state and initializes
  * representation.
  * @param {Array<Object>} novelAttributes Novel values of attributes to replace
  * former values of attributes in application's state.
  * @param {Object} state Application's state.
  */
  restore(novelAttributes, state) {
    // Accept novel values of attributes and assign them to the state.
    novelAttributes.forEach(function (novelAttribute) {
      // Confirm that the entry for the attribute's value is valid.
      if (
        novelAttribute.hasOwnProperty("attribute") &&
        novelAttribute.hasOwnProperty("value")
      ) {
        // Confirm that the attribute is valid in the state.
        if (state.attributeNames.includes(novelAttribute.attribute)) {
          state[novelAttribute.attribute] = novelAttribute.value;
        }
      }
    });
    // Initialize instance of state's model.
    // Pass this instance a reference to the state.
    new Model(state);
  }
}
