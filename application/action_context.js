/*
This file is part of project Profondeur
(https://github.com/tcameronwaller/profondeur/).

Profondeur supports visual exploration and analysis of metabolic networks.
Copyright (C) 2018 Thomas Cameron Waller

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

Thomas Cameron Waller
tcameronwaller@gmail.com
Department of Biochemistry
University of Utah
Room 5520C, Emma Eccles Jones Medical Research Building
15 North Medical Drive East
Salt Lake City, Utah 84112
United States of America
*/

/**
* Actions that modify the application's state.
* This class does not store any attributes and does not require instantiation.
* This class stores methods that control actions that modify the application's
* state.
* The methods require a reference to the instance of the state.
* These methods also call external methods as necessary.
*/
class ActionContext {

  /**
  * Initializes values of application's variables for controls relevant to view.
  * @returns {Object} Values of application's variables for view's controls.
  */
  static initializeControls() {
    // Initialize controls.
    var compartmentalization = false;
    var defaultSimplifications = true;
    var candidatesSearches = Candidacy.createInitialCandidatesSearches();
    var candidatesSorts = Candidacy.createInitialCandidatesSorts();
    // Compile information.
    var variablesValues = {
      compartmentalization: compartmentalization,
      defaultSimplifications: defaultSimplifications,
      candidatesSearches: candidatesSearches,
      candidatesSorts: candidatesSorts
    };
    // Return information.
    return variablesValues;
  }

  // TODO: I think restoreControls need update and repair...
  /**
  * Restores values of application's variables for controls relevant to view.
  * @param {Object} state Application's state.
  */
  static restoreControls(state) {
    // Initialize controls for candidacy view.
    var candidacyViewControls = Action.initializeCandidacyViewControls();
    // Determine candidate entities and prepare their summaries.
    var candidatesSummaries = Candidacy.collectCandidatesPrepareSummaries({
      reactionsSets: state.filterSetsReactions,
      reactions: state.reactions,
      metabolites: state.metabolites,
      compartmentalization: candidacyViewControls.compartmentalization,
      candidatesSearches: candidacyViewControls.candidatesSearches,
      candidatesSorts: candidacyViewControls.candidatesSorts,
      compartments: state.compartments
    });
    // Determine simplifications of candidate entities.
    // Create simplifications for default entities and include with other
    // simplifications.
    var simplifications = Candidacy.createIncludeDefaultSimplifications({
      defaultSimplificationsMetabolites: candidacyViewControls
      .defaultSimplificationsMetabolites,
      candidatesReactions: candidatesSummaries.candidatesReactions,
      candidatesMetabolites: candidatesSummaries.candidatesMetabolites,
      reactionsSets: state.filterSetsReactions,
      reactions: state.reactions,
      compartmentalization: candidacyViewControls.compartmentalization,
      reactionsSimplifications: {},
      metabolitesSimplifications: {}
    });
    // Create network's elements.
    var networkElements = Network.createNetworkElements({
      candidatesReactions: candidatesSummaries.candidatesReactions,
      candidatesMetabolites: candidatesSummaries.candidatesMetabolites,
      reactionsSimplifications: simplifications.reactionsSimplifications,
      metabolitesSimplifications: simplifications.metabolitesSimplifications,
      reactions: state.reactions,
      metabolites: state.metabolites,
      compartmentalization: candidacyViewControls.compartmentalization
    });
    // Create subnetwork's elements.
    var subnetworkElements = Network.copyNetworkElementsRecords({
      networkNodesRecords: networkElements.networkNodesRecords,
      networkLinksRecords: networkElements.networkLinksRecords
    });
    // Initialize whether to force representation of topology for networks of
    // excessive scale.
    var forceTopology = false;
    // Compile variables' values.
    var novelVariablesValues = {
      forceTopology: forceTopology
    };
    var variablesValues = Object.assign(
      novelVariablesValues,
      candidacyViewControls,
      candidatesSummaries,
      simplifications,
      networkElements,
      subnetworkElements,
    );
    // Submit variables' values to the application's state.
    ActionGeneral.submitStateVariablesValues({
      variablesValues: variablesValues,
      state: state
    });
  }
  /**
  * Changes specification of compartmentalization's relevance.
  * @param {Object} state Application's state.
  */
  static changeCompartmentalization(state) {
    // Determine compartmentalization.
    if (state.compartmentalization) {
      var compartmentalization = false;
    } else {
      var compartmentalization = true;
    }
    // Determine candidate entities and prepare their summaries.
    var candidatesSummaries = Candidacy.collectCandidatesPrepareSummaries({
      reactionsSets: state.filterSetsReactions,
      reactions: state.reactions,
      metabolites: state.metabolites,
      compartmentalization: compartmentalization,
      candidatesSearches: state.candidatesSearches,
      candidatesSorts: state.candidatesSorts,
      compartments: state.compartments
    });
    // Determine simplifications of candidate entities.
    // Create simplifications for default entities and include with other
    // simplifications.
    var simplifications = Candidacy.createIncludeDefaultSimplifications({
      defaultSimplificationsMetabolites: state
      .defaultSimplificationsMetabolites,
      candidatesReactions: candidatesSummaries.candidatesReactions,
      candidatesMetabolites: candidatesSummaries.candidatesMetabolites,
      reactionsSets: state.filterSetsReactions,
      reactions: state.reactions,
      compartmentalization: state.compartmentalization,
      reactionsSimplifications: state.reactionsSimplifications,
      metabolitesSimplifications: state.metabolitesSimplifications
    });
    // Determine default simplifications.
    var defaultSimplifications = true;
    // Create network's elements.
    var networkElements = Network.createNetworkElements({
      candidatesReactions: candidatesSummaries.candidatesReactions,
      candidatesMetabolites: candidatesSummaries.candidatesMetabolites,
      reactionsSimplifications: simplifications.reactionsSimplifications,
      metabolitesSimplifications: simplifications.metabolitesSimplifications,
      reactions: state.reactions,
      metabolites: state.metabolites,
      compartmentalization: compartmentalization
    });
    // Create subnetwork's elements.
    var subnetworkElements = Network.copyNetworkElementsRecords({
      networkNodesRecords: networkElements.networkNodesRecords,
      networkLinksRecords: networkElements.networkLinksRecords
    });
    // Initialize whether to force representation of topology for networks of
    // excessive scale.
    var forceTopology = false;
    // Compile variables' values.
    var novelVariablesValues = {
      compartmentalization: compartmentalization,
      defaultSimplifications: defaultSimplifications,
      forceTopology: forceTopology
    };
    var variablesValues = Object.assign(
      novelVariablesValues,
      candidatesSummaries,
      simplifications,
      networkElements,
      subnetworkElements
    );
    // Submit variables' values to the application's state.
    ActionGeneral.submitStateVariablesValues({
      variablesValues: variablesValues,
      state: state
    });
  }
  /**
  * Changes whether to create default simplifications.
  * @param {Object} state Application's state.
  */
  static changeDefaultSimplifications(state) {
    // Determine default simplifications.
    // Determine simplifications of candidate entities.
    if (state.defaultSimplifications) {
      // Change default simplifications to false.
      var defaultSimplifications = false;
      // Remove simplifications for default entities.
      var simplifications = Candidacy.removeDefaultSimplifications({
        defaultSimplificationsMetabolites: state
        .defaultSimplificationsMetabolites,
        candidatesReactions: state.candidatesReactions,
        candidatesMetabolites: state.candidatesMetabolites,
        reactionsSets: state.filterSetsReactions,
        reactions: state.reactions,
        compartmentalization: state.compartmentalization,
        reactionsSimplifications: state.reactionsSimplifications,
        metabolitesSimplifications: state.metabolitesSimplifications
      });
    } else {
      // Change default simplifications to true.
      var defaultSimplifications = true;
      // Create simplifications for default entities and include with other
      // simplifications.
      var simplifications = Candidacy.createIncludeDefaultSimplifications({
        defaultSimplificationsMetabolites: state
        .defaultSimplificationsMetabolites,
        candidatesReactions: state.candidatesReactions,
        candidatesMetabolites: state.candidatesMetabolites,
        reactionsSets: state.filterSetsReactions,
        reactions: state.reactions,
        compartmentalization: state.compartmentalization,
        reactionsSimplifications: state.reactionsSimplifications,
        metabolitesSimplifications: state.metabolitesSimplifications
      });
    }
    // Create network's elements.
    var networkElements = Network.createNetworkElements({
      candidatesReactions: state.candidatesReactions,
      candidatesMetabolites: state.candidatesMetabolites,
      reactionsSimplifications: simplifications.reactionsSimplifications,
      metabolitesSimplifications: simplifications.metabolitesSimplifications,
      reactions: state.reactions,
      metabolites: state.metabolites,
      compartmentalization: state.compartmentalization
    });
    // Create subnetwork's elements.
    var subnetworkElements = Network.copyNetworkElementsRecords({
      networkNodesRecords: networkElements.networkNodesRecords,
      networkLinksRecords: networkElements.networkLinksRecords
    });
    // Initialize whether to force representation of topology for networks of
    // excessive scale.
    var forceTopology = false;
    // Compile variables' values.
    var novelVariablesValues = {
      defaultSimplifications: defaultSimplifications,
      forceTopology: forceTopology
    };
    var variablesValues = Object.assign(
      novelVariablesValues,
      simplifications,
      networkElements,
      subnetworkElements
    );
    // Submit variables' values to the application's state.
    ActionGeneral.submitStateVariablesValues({
      variablesValues: variablesValues,
      state: state
    });
  }
  /**
  * Changes explicit and implicit simplifications.
  * @param {Object} parameters Destructured object of parameters.
  * @param {string} parameters.identifier Identifier of a candidate entity.
  * @param {string} parameters.category Category of entities, metabolites or
  * reactions.
  * @param {string} parameters.method Method for simplification, omission or
  * replication.
  * @param {Object} parameters.state Application's state.
  */
  static changeSimplification({identifier, category, method, state} = {}) {
    // Change explicit and implicit designations of entities for simplification.
    var simplifications = Candidacy.changeSimplifications({
      identifier: identifier,
      category: category,
      method: method,
      candidatesReactions: state.candidatesReactions,
      candidatesMetabolites: state.candidatesMetabolites,
      reactionsSets: state.filterSetsReactions,
      reactions: state.reactions,
      compartmentalization: state.compartmentalization,
      reactionsSimplifications: state.reactionsSimplifications,
      metabolitesSimplifications: state.metabolitesSimplifications
    });
    // Determine default simplifications.
    // Determine whether simplifications exist for all default entities.
    var defaultSimplifications = Candidacy.determineDefaultSimplifications({
      defaultSimplificationsMetabolites: state.defaultSimplificationsMetabolites,
      candidatesMetabolites: state.candidatesMetabolites,
      metabolitesSimplifications: simplifications.metabolitesSimplifications
    });
    // Create network's elements.
    var networkElements = Network.createNetworkElements({
      candidatesReactions: state.candidatesReactions,
      candidatesMetabolites: state.candidatesMetabolites,
      reactionsSimplifications: simplifications.reactionsSimplifications,
      metabolitesSimplifications: simplifications.metabolitesSimplifications,
      reactions: state.reactions,
      metabolites: state.metabolites,
      compartmentalization: state.compartmentalization
    });
    // Create subnetwork's elements.
    var subnetworkElements = Network.copyNetworkElementsRecords({
      networkNodesRecords: networkElements.networkNodesRecords,
      networkLinksRecords: networkElements.networkLinksRecords
    });
    // Initialize whether to force representation of topology for networks of
    // excessive scale.
    var forceTopology = false;
    // Compile variables' values.
    var novelVariablesValues = {
      defaultSimplifications: defaultSimplifications,
      forceTopology: forceTopology
    };
    var variablesValues = Object.assign(
      novelVariablesValues,
      simplifications,
      networkElements,
      subnetworkElements
    );
    // Submit variables' values to the application's state.
    ActionGeneral.submitStateVariablesValues({
      variablesValues: variablesValues,
      state: state
    });
  }

}
