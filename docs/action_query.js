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
class ActionQuery {

// 1. application initiation...
// ... initial controls, create subnetwork's initial elements accordingly
// ... derive downstream dependent state (primarily exploration view)
// 2. changeCombination...
// ... create subnetwork's initial elements accordingly
// ... derive downstream dependent state (primarily exploration view)
// 3.

// Maybe the a single execute procedure could call the derive State to execute the correct query and then derive state?

  // Direct actions.

  //////////////////////////////////////////////////////////////////////////////

  // Direct actions that modify only proximal variables.

  /**
  * Changes the selection of type of controls in query view.
  * @param {string} parameters.queryType Type of query, "rogue", "proximity",
  * "path", or "combination".
  * @param {Object} parameters.state Application's state.
  */
  static changeType({queryType, state} = {}) {
    // Initialize controls for query view.
    var subordinateControls = ActionQuery.initializeSubordinateControls();
    // Derive dependent state.
    var dependentStateVariables = ActionQuery.deriveSubordinateState({
      viewsRestoration: state.viewsRestoration,
      state: state
    });
    // Compile variables' values.
    var novelVariablesValues = {
      queryType: queryType
    };
    var variablesValues = Object.assign(
      novelVariablesValues,
      subordinateControls,
      dependentStateVariables
    );
    // Submit variables' values to the application's state.
    ActionGeneral.submitStateVariablesValues({
      variablesValues: variablesValues,
      state: state
    });
  }
  /**
  * Changes the selection of focus for rogue query.
  * @param {Object} parameters Destructured object of parameters.
  * @param {string} parameters.identifier Identifier of a node.
  * @param {string} parameters.type Type of a node, metabolite or reaction.
  * @param {Object} parameters.state Application's state.
  */
  static changeRogueFocus({identifier, type, state} = {}) {
    // Create record.
    var record = {
      identifier: identifier,
      type: type
    };
    // Derive dependent state.
    var dependentStateVariables = ActionQuery.deriveSubordinateState({
      viewsRestoration: state.viewsRestoration,
      state: state
    });
    // Compile variables' values.
    var novelVariablesValues = {
      queryRogueFocus: record
    };
    var variablesValues = Object.assign(
      novelVariablesValues,
      dependentStateVariables
    );
    // Submit variables' values to the application's state.
    ActionGeneral.submitStateVariablesValues({
      variablesValues: variablesValues,
      state: state
    });
  }
  /**
  * Changes the selection of focus for proximity query.
  * @param {Object} parameters Destructured object of parameters.
  * @param {string} parameters.identifier Identifier of a node.
  * @param {string} parameters.type Type of a node, metabolite or reaction.
  * @param {Object} parameters.state Application's state.
  */
  static changeProximityFocus({identifier, type, state} = {}) {
    // Create record.
    var record = {
      identifier: identifier,
      type: type
    };
    // Derive dependent state.
    var dependentStateVariables = ActionQuery.deriveSubordinateState({
      viewsRestoration: state.viewsRestoration,
      state: state
    });
    // Compile variables' values.
    var novelVariablesValues = {
      queryProximityFocus: record
    };
    var variablesValues = Object.assign(
      novelVariablesValues,
      dependentStateVariables
    );
    // Submit variables' values to the application's state.
    ActionGeneral.submitStateVariablesValues({
      variablesValues: variablesValues,
      state: state
    });
  }
  /**
  * Changes the selection of direction for proximity query.
  * @param {Object} state Application's state.
  */
  static changeProximityDirection(state) {
    // Determine direction.
    if (state.queryProximityDirection === "successors") {
      var direction = "neighbors";
    } else if (state.queryProximityDirection === "neighbors") {
      var direction = "predecessors";
    } else if (state.queryProximityDirection === "predecessors") {
      var direction = "successors";
    }
    // Derive dependent state.
    var dependentStateVariables = ActionQuery.deriveSubordinateState({
      viewsRestoration: state.viewsRestoration,
      state: state
    });
    // Compile variables' values.
    var novelVariablesValues = {
      queryProximityDirection: direction
    };
    var variablesValues = Object.assign(
      novelVariablesValues,
      dependentStateVariables
    );
    // Submit variables' values to the application's state.
    ActionGeneral.submitStateVariablesValues({
      variablesValues: variablesValues,
      state: state
    });
  }
  /**
  * Changes the selection of depth for proximity query.
  * @param {number} depth Depth in links to which to traverse.
  * @param {Object} state Application's state.
  */
  static changeProximityDepth(depth, state) {
    // Derive dependent state.
    var dependentStateVariables = ActionQuery.deriveSubordinateState({
      viewsRestoration: state.viewsRestoration,
      state: state
    });
    // Compile variables' values.
    var novelVariablesValues = {
      queryProximityDepth: depth
    };
    var variablesValues = Object.assign(
      novelVariablesValues,
      dependentStateVariables
    );
    // Submit variables' values to the application's state.
    ActionGeneral.submitStateVariablesValues({
      variablesValues: variablesValues,
      state: state
    });
  }
  /**
  * Changes the selection of source for path query.
  * @param {Object} parameters Destructured object of parameters.
  * @param {string} parameters.identifier Identifier of a node.
  * @param {string} parameters.type Type of a node, metabolite or reaction.
  * @param {Object} parameters.state Application's state.
  */
  static changePathSource({identifier, type, state} = {}) {
    // Create record.
    var record = {
      identifier: identifier,
      type: type
    };
    // Derive dependent state.
    var dependentStateVariables = ActionQuery.deriveSubordinateState({
      viewsRestoration: state.viewsRestoration,
      state: state
    });
    // Compile variables' values.
    var novelVariablesValues = {
      queryPathSource: record
    };
    var variablesValues = Object.assign(
      novelVariablesValues,
      dependentStateVariables
    );
    // Submit variables' values to the application's state.
    ActionGeneral.submitStateVariablesValues({
      variablesValues: variablesValues,
      state: state
    });
  }
  /**
  * Changes the selection of target for path query.
  * @param {Object} parameters Destructured object of parameters.
  * @param {string} parameters.identifier Identifier of a node.
  * @param {string} parameters.type Type of a node, metabolite or reaction.
  * @param {Object} parameters.state Application's state.
  */
  static changePathTarget({identifier, type, state} = {}) {
    // Create record.
    var record = {
      identifier: identifier,
      type: type
    };
    // Derive dependent state.
    var dependentStateVariables = ActionQuery.deriveSubordinateState({
      viewsRestoration: state.viewsRestoration,
      state: state
    });
    // Compile variables' values.
    var novelVariablesValues = {
      queryPathTarget: record
    };
    var variablesValues = Object.assign(
      novelVariablesValues,
      dependentStateVariables
    );
    // Submit variables' values to the application's state.
    ActionGeneral.submitStateVariablesValues({
      variablesValues: variablesValues,
      state: state
    });
  }
  /**
  * Changes the selection of direction for path query.
  * @param {Object} state Application's state.
  */
  static changePathDirection(state) {
    // Determine direction.
    if (state.queryPathDirection === "forward") {
      var direction = "both";
    } else if (state.queryPathDirection === "both") {
      var direction = "reverse";
    } else if (state.queryPathDirection === "reverse") {
      var direction = "forward";
    }
    // Derive dependent state.
    var dependentStateVariables = ActionQuery.deriveSubordinateState({
      viewsRestoration: state.viewsRestoration,
      state: state
    });
    // Compile variables' values.
    var novelVariablesValues = {
      queryPathDirection: direction
    };
    var variablesValues = Object.assign(
      novelVariablesValues,
      dependentStateVariables
    );
    // Submit variables' values to the application's state.
    ActionGeneral.submitStateVariablesValues({
      variablesValues: variablesValues,
      state: state
    });
  }
  /**
  * Changes the selection of count for a query's method.
  * @param {Object} parameters Destructured object of parameters.
  * @param {number} parameters.count Count of paths to collect between each pair
  * of targets.
  * @param {string} parameters.type Type of method for query, path or
  * connection.
  * @param {Object} parameters.state Application's state.
  */
  static changeTypeCount({count, type, state} = {}) {
    // Determine type of query.
    if (type === "path") {
      var variableName = "queryPathCount";
    } else if (type === "connection") {
      var variableName = "queryConnectionCount";
    }
    // Derive dependent state.
    var dependentStateVariables = ActionQuery.deriveSubordinateState({
      viewsRestoration: state.viewsRestoration,
      state: state
    });
    // Compile variables' values.
    var novelVariablesValues = {
      [variableName]: count
    };
    var variablesValues = Object.assign(
      novelVariablesValues,
      dependentStateVariables
    );
    // Submit variables' values to the application's state.
    ActionGeneral.submitStateVariablesValues({
      variablesValues: variablesValues,
      state: state
    });
  }
  /**
  * Changes the selection of target for connection query.
  * @param {Object} parameters Destructured object of parameters.
  * @param {string} parameters.identifier Identifier of a node.
  * @param {string} parameters.type Type of a node, metabolite or reaction.
  * @param {Object} parameters.state Application's state.
  */
  static changeConnectionTarget({identifier, type, state} = {}) {
    // Create record.
    var record = {
      identifier: identifier,
      type: type
    };
    // Derive dependent state.
    var dependentStateVariables = ActionQuery.deriveSubordinateState({
      viewsRestoration: state.viewsRestoration,
      state: state
    });
    // Compile variables' values.
    var novelVariablesValues = {
      queryConnectionTarget: record
    };
    var variablesValues = Object.assign(
      novelVariablesValues,
      dependentStateVariables
    );
    // Submit variables' values to the application's state.
    ActionGeneral.submitStateVariablesValues({
      variablesValues: variablesValues,
      state: state
    });
  }

  // TODO: sort the list of targets by default...

  /**
  * Includes a node in the targets for connection query.
  * @param {Object} state Application's state.
  */
  static includeConnectionTarget(state) {
    // Determine whether there is a valid candidate for inclusion.
    if (state.queryConnectionTarget.identifier.length > 0) {
      // Determine whether collection of targets includes the node.
      var match = state
      .queryConnectionTargets.find(function (record) {
        return (
          (
            record.identifier === state
            .queryConnectionTarget.identifier
          ) &&
          (record.type === state.queryConnectionTarget.type)
        );
      });
      if (!match) {
        // Create record.
        var record = {
          identifier: state.queryConnectionTarget.identifier,
          type: state.queryConnectionTarget.type
        };
        // Include record in collection.
        var queryConnectionTargets = state
        .queryConnectionTargets.concat(record);
      } else {
        var tranversalConnectionTargets = state
        .queryConnectionTargets;
      }
      // Restore candidate.
      var queryConnectionTarget = {identifier: "", type: ""};
      // Derive dependent state.
      var dependentStateVariables = ActionQuery.deriveSubordinateState({
        viewsRestoration: state.viewsRestoration,
        state: state
      });
      // Compile variables' values.
      var novelVariablesValues = {
        queryConnectionTarget: queryConnectionTarget,
        queryConnectionTargets: queryConnectionTargets
      };
      var variablesValues = Object.assign(
        novelVariablesValues,
        dependentStateVariables
      );
      // Submit variables' values to the application's state.
      ActionGeneral.submitStateVariablesValues({
        variablesValues: variablesValues,
        state: state
      });
    }
  }
  /**
  * Excludes a node from targets for connection query.
  * @param {Object} parameters Destructured object of parameters.
  * @param {string} parameters.identifier Identifier of a node.
  * @param {string} parameters.type Type of a node, metabolite or reaction.
  * @param {Object} parameters.state Application's state.
  */
  static excludeConnectionTarget({identifier, type, state} = {}) {
    var queryConnectionTargets = state
    .queryConnectionTargets.filter(function (record) {
      return !((record.identifier === identifier) && (record.type === type));
    });
    // Derive dependent state.
    var dependentStateVariables = ActionQuery.deriveSubordinateState({
      viewsRestoration: state.viewsRestoration,
      state: state
    });
    // Compile variables' values.
    var novelVariablesValues = {
      queryConnectionTargets: queryConnectionTargets
    };
    var variablesValues = Object.assign(
      novelVariablesValues,
      dependentStateVariables
    );
    // Submit variables' values to the application's state.
    ActionGeneral.submitStateVariablesValues({
      variablesValues: variablesValues,
      state: state
    });
  }

  //////////////////////////////////////////////////////////////////////////////

  // Direct actions that modify proximal and distal variables.

  /**
  * Changes the selection of combination in query view.
  * @param {string} queryCombination Method of combination, "inclusion" or
  * "exclusion".
  * @param {Object} parameters.state Application's state.
  */
  static changeCombination({queryCombination, state} = {}) {
    // Derive dependent state.
    var dependentStateVariables = ActionQuery.deriveState({
      subnetworkRestoration: true,
      queryCombination: queryCombination,
      subnetworkNodesRecords: state.subnetworkNodesRecords,
      subnetworkLinksRecords: state.subnetworkLinksRecords,
      networkNodesRecords: state.networkNodesRecords,
      networkLinksRecords: state.networkLinksRecords,
      viewsRestoration: state.viewsRestoration,
      state: state
    });
    // Compile variables' values.
    var novelVariablesValues = {
      queryCombination: queryCombination
    };
    var variablesValues = Object.assign(
      novelVariablesValues,
      dependentStateVariables
    );
    // Submit variables' values to the application's state.
    ActionGeneral.submitStateVariablesValues({
      variablesValues: variablesValues,
      state: state
    });
  }
  /**
  * Evaluates and executes query and combination on the network.
  * @param {Object} state Application's state.
  */
  static executeQuery(state) {
    // Detemine type of query.
    if (state.queryType === "rogue") {
      var pass = Model.determineRogueQuery(state);
    } else if (state.queryType === "proximity") {
      var pass = Model.determineProximityQuery(state);
    } else if (state.queryType === "path") {
      var pass = Model.determinePathQuery(state);
    } else if (state.queryType === "connection") {
      var pass = Model.determineConnectionQuery(state);
    }
    // Determine whether application's variables match query.
    if (pass) {
      // Derive dependent state.
      var dependentStateVariables = ActionQuery.deriveState({
        subnetworkRestoration: false,
        queryCombination: state.queryCombination,
        subnetworkNodesRecords: state.subnetworkNodesRecords,
        subnetworkLinksRecords: state.subnetworkLinksRecords,
        networkNodesRecords: state.networkNodesRecords,
        networkLinksRecords: state.networkLinksRecords,
        viewsRestoration: state.viewsRestoration,
        state: state
      });
      // Compile variables' values.
      var novelVariablesValues = {};
      var variablesValues = Object.assign(
        novelVariablesValues,
        dependentStateVariables
      );
      // Submit variables' values to the application's state.
      ActionGeneral.submitStateVariablesValues({
        variablesValues: variablesValues,
        state: state
      });
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // TODO: this block is obsolete... once I use them for scrap...

  // TODO: still need to update stuff below here...


  /**
  * Executes rogue query and combination on the network.
  * @param {Object} state Application's state.
  */
  static executeRogueCombination(state) {
    // Determine whether application's state includes valid variables for
    // procedure.
    if (Model.determineRogueQuery(state)) {
      var subnetworkElements = Query.combineRogueNodeNetwork({
        focus: state.queryRogueFocus.identifier,
        combination: state.queryCombination,
        subnetworkNodesRecords: state.subnetworkNodesRecords,
        subnetworkLinksRecords: state.subnetworkLinksRecords,
        networkNodesRecords: state.networkNodesRecords,
        networkLinksRecords: state.networkLinksRecords
      });
      // Initialize controls for query view.
      var queryViewControls = ActionQuery.initializeControls();
      // Compile variables' values.
      var variablesValues = Object.assign(
        subnetworkElements,
        queryViewControls
      );
      // Submit variables' values to the application's state.
      ActionGeneral.submitStateVariablesValues({
        variablesValues: variablesValues,
        state: state
      });
    }
  }
  /**
  * Executes proximity query and combination on the network.
  * @param {Object} state Application's state.
  */
  static executeProximityCombination(state) {
    // Determine whether application's state includes valid variables for
    // procedure.
    if (Model.determineProximityQuery(state)) {
      var subnetworkElements = Query.combineProximityNetwork({
        focus: state.queryProximityFocus.identifier,
        direction: state.queryProximityDirection,
        depth: state.queryProximityDepth,
        combination: state.queryCombination,
        subnetworkNodesRecords: state.subnetworkNodesRecords,
        subnetworkLinksRecords: state.subnetworkLinksRecords,
        networkNodesRecords: state.networkNodesRecords,
        networkLinksRecords: state.networkLinksRecords
      });
      // Derive dependent state.
      var dependentStateVariables = ActionExploration.deriveState({
        simulationDimensions: state.simulationDimensions,
        previousSimulation: state.simulation,
        subnetworkNodesRecords: subnetworkElements.subnetworkNodesRecords,
        subnetworkLinksRecords: subnetworkElements.subnetworkLinksRecords,
        state: state
      });
      // Determine which views to restore.
      var viewsRestoration = ActionInterface.changeViewsRestoration({
        skips: [],
        viewsRestoration: state.viewsRestoration
      });
      // Compile variables' values.
      var novelVariablesValues = {
        viewsRestoration: viewsRestoration
      };
      var variablesValues = Object.assign(
        novelVariablesValues,
        subnetworkElements,
        dependentStateVariables
      );
      // Submit variables' values to the application's state.
      ActionGeneral.submitStateVariablesValues({
        variablesValues: variablesValues,
        state: state
      });
    }
  }
  /**
  * Executes path query and combination on the network.
  * @param {Object} state Application's state.
  */
  static executePathCombination(state) {
    // Determine whether application's state includes valid variables for
    // procedure.
    if (Model.determinePathQuery(state)) {
      var subnetworkElements = Query.combinePathNetwork({
        source: state.queryPathSource.identifier,
        target: state.queryPathTarget.identifier,
        direction: state.queryPathDirection,
        count: state.queryPathCount,
        combination: state.queryCombination,
        subnetworkNodesRecords: state.subnetworkNodesRecords,
        subnetworkLinksRecords: state.subnetworkLinksRecords,
        networkNodesRecords: state.networkNodesRecords,
        networkLinksRecords: state.networkLinksRecords
      });
      // Derive dependent state.
      var dependentStateVariables = ActionExploration.deriveState({
        simulationDimensions: state.simulationDimensions,
        previousSimulation: state.simulation,
        subnetworkNodesRecords: subnetworkElements.subnetworkNodesRecords,
        subnetworkLinksRecords: subnetworkElements.subnetworkLinksRecords,
        state: state
      });
      // Determine which views to restore.
      var viewsRestoration = ActionInterface.changeViewsRestoration({
        skips: [],
        viewsRestoration: state.viewsRestoration
      });
      // Compile variables' values.
      var novelVariablesValues = {
        viewsRestoration: viewsRestoration
      };
      var variablesValues = Object.assign(
        novelVariablesValues,
        subnetworkElements,
        dependentStateVariables
      );
      // Submit variables' values to the application's state.
      ActionGeneral.submitStateVariablesValues({
        variablesValues: variablesValues,
        state: state
      });
    }
  }
  /**
  * Executes connection query and combination on the network.
  * @param {Object} state Application's state.
  */
  static executeConnectionCombination(state) {
    // Determine whether application's state includes valid variables for
    // procedure.
    if (Model.determineConnectionQuery(state)) {
      // Extract targets.
      var targets = General
      .collectValueFromObjects("identifier", state.queryConnectionTargets);
      var subnetworkElements = Query.combineConnectionNetwork({
        targets: targets,
        count: state.queryConnectionCount,
        combination: state.queryCombination,
        subnetworkNodesRecords: state.subnetworkNodesRecords,
        subnetworkLinksRecords: state.subnetworkLinksRecords,
        networkNodesRecords: state.networkNodesRecords,
        networkLinksRecords: state.networkLinksRecords
      });
      // Derive dependent state.
      var dependentStateVariables = ActionExploration.deriveState({
        simulationDimensions: state.simulationDimensions,
        previousSimulation: state.simulation,
        subnetworkNodesRecords: subnetworkElements.subnetworkNodesRecords,
        subnetworkLinksRecords: subnetworkElements.subnetworkLinksRecords,
        state: state
      });
      // Determine which views to restore.
      var viewsRestoration = ActionInterface.changeViewsRestoration({
        skips: [],
        viewsRestoration: state.viewsRestoration
      });
      // Compile variables' values.
      var novelVariablesValues = {
        viewsRestoration: viewsRestoration
      };
      var variablesValues = Object.assign(
        novelVariablesValues,
        subnetworkElements,
        dependentStateVariables
      );
      // Submit variables' values to the application's state.
      ActionGeneral.submitStateVariablesValues({
        variablesValues: variablesValues,
        state: state
      });
    }
  }
  //////////////////////////////////////////////////////////////////////////////

  // TODO: these execute procedures might be an exception, since they're independent of queryType

  /**
  * Executes rogue query and union on the network.
  * @param {Object} state Application's state.
  */
  static executeRogueUnion(state) {
    // Determine whether application's state includes valid variables for
    // procedure.
    if (Model.determineRogueQuery(state)) {
      var subnetworkElements = Query.combineRogueNodeNetwork({
        focus: state.queryRogueFocus.identifier,
        combination: "union",
        subnetworkNodesRecords: state.subnetworkNodesRecords,
        subnetworkLinksRecords: state.subnetworkLinksRecords,
        networkNodesRecords: state.networkNodesRecords,
        networkLinksRecords: state.networkLinksRecords
      });
      // Initialize controls for query view.
      var queryViewControls = ActionQuery.initializeControls();
      // Initialize controls for pompt view.
      var prompt = ActionPrompt.initializeControls();
      // Compile variables' values.
      var novelVariablesValues = {
        prompt: prompt
      };
      var variablesValues = Object.assign(
        novelVariablesValues,
        subnetworkElements,
        queryViewControls
      );
      // Submit variables' values to the application's state.
      ActionGeneral.submitStateVariablesValues({
        variablesValues: variablesValues,
        state: state
      });
    }
  }
  /**
  * Executes proximity query expansion to depth of one and combination by
  * union.
  * @param {Object} state Application's state.
  */
  static executeProximityExpansion(state) {
    // Determine whether application's state includes valid variables for
    // procedure.
    if (Model.determineProximityQuery(state)) {
      var subnetworkElements = Query.combineProximityNetwork({
        focus: state.prompt.reference.identifier,
        direction: "neighbors",
        depth: 1,
        combination: "union",
        subnetworkNodesRecords: state.subnetworkNodesRecords,
        subnetworkLinksRecords: state.subnetworkLinksRecords,
        networkNodesRecords: state.networkNodesRecords,
        networkLinksRecords: state.networkLinksRecords
      });
      // Initialize controls for query view.
      var queryViewControls = ActionQuery.initializeControls();
      // Remove any prompt view.
      var prompt = ActionPrompt.initializeControls();
      // Compile variables' values.
      var novelVariablesValues = {
        prompt: prompt
      };
      var variablesValues = Object.assign(
        novelVariablesValues,
        subnetworkElements,
        queryViewControls
      );
      // Submit variables' values to the application's state.
      ActionGeneral.submitStateVariablesValues({
        variablesValues: variablesValues,
        state: state
      });
    }
  }

  // Indirect actions.

  /**
  * Initializes values of application's variables for controls relevant to view.
  * @returns {Object} Values of application's variables for view's controls.
  */
  static initializeControls() {
    // Initialize controls.
    var queryCombination = "exclusion";
    var queryType = "rogue";
    var queryProximityDirection = "successors";
    var queryProximityDepth = 1;
    var queryPathDirection = "forward";
    var queryPathCount = 1;
    var queryConnectionCount = 1;
    var subordinateControls = ActionQuery.initializeSubordinateControls();
    // Compile information.
    var novelVariablesValues = {
      queryCombination: queryCombination,
      queryType: queryType,
      queryProximityDirection: queryProximityDirection,
      queryProximityDepth: queryProximityDepth,
      queryPathDirection: queryPathDirection,
      queryPathCount: queryPathCount,
      queryConnectionCount: queryConnectionCount
    };
    var variablesValues = Object.assign(
      novelVariablesValues,
      subordinateControls
    );
    // Return information.
    return variablesValues;
  }
  /**
  * Initializes values of application's variables for controls relevant to view.
  * @returns {Object} Values of application's variables for view's controls.
  */
  static initializeSubordinateControls() {
    // Subordinate controls depend on query's combination and require
    // initialization upon change of query's combination.
    // Initialize controls.
    var queryRogueFocus = {identifier: "", type: ""};
    var queryProximityFocus = {identifier: "", type: ""};
    var queryPathSource = {identifier: "", type: ""};
    var queryPathTarget = {identifier: "", type: ""};
    var queryConnectionTarget = {identifier: "", type: ""};
    var queryConnectionTargets = [];
    // Compile information.
    var variablesValues = {
      queryRogueFocus: queryRogueFocus,
      queryProximityFocus: queryProximityFocus,
      queryPathSource: queryPathSource,
      queryPathTarget: queryPathTarget,
      queryConnectionTarget: queryConnectionTarget,
      queryConnectionTargets: queryConnectionTargets
    };
    // Return information.
    return variablesValues;
  }
  /**
  * Derives application's dependent state from controls relevant to view.
  * @param {Object} parameters Destructured object of parameters.
  * @param {Object<boolean>} parameters.viewsRestoration Information about
  * whether to restore each view.
  * @param {Object} parameters.state Application's state.
  * @returns {Object} Values of application's variables.
  */
  static deriveSubordinateState({viewsRestoration, state} = {}) {
    // TODO: What exactly does this procedure need to do?
    // TODO: set viewsRestoration to restore at least the query view

    // Determine which views to restore.
    var novelViewsRestoration = ActionInterface.changeViewsRestoration({
      views: [
        "query",
      ],
      type: true,
      viewsRestoration: viewsRestoration
    });
    // Compile information.
    var novelVariablesValues = {
      viewsRestoration: novelViewsRestoration
    };
    var variablesValues = Object.assign(
      novelVariablesValues,
    );
    // Return information.
    return variablesValues;
  }
  /**
  * Derives subnetwork's elements.
  * @param {Object} parameters Destructured object of parameters.
  * @param {boolean} parameters.subnetworkRestoration Whether to restore
  * subnetwork's elements.
  * @param {string} parameters.queryCombination Method of combination,
  * "inclusion" or "exclusion".
  * @param {string} parameters.queryType Type of query, "rogue", "proximity",
  * "path", or "combination".
  * @param {Object<string>} parameters.queryRogueFocus Information about a node.
  * @param {Object<string>} parameters.queryProximityFocus Information about a
  * node.
  * @param {string} parameters.queryProximityDirection Direction in which to
  * traverse links, "successors" for source to target, "predecessors" for target
  * to source, or "neighbors" for either.
  * @param {number} parameters.queryProximityDepth Depth in links to which to
  * traverse.
  * @param {Object<string>} parameters.queryPathSource Information about a node.
  * @param {Object<string>} parameters.queryPathTarget Information about a node.
  * @param {string} parameters.queryPathDirection Direction in which to traverse
  * links, "forward" for source to target, "reverse" for target to source, or
  * "both" for either.
  * @param {number} parameters.queryPathCount Count of paths to collect.
  * @param {Array<Object<string>>} parameters.queryConnectionTargets Information
  * about nodes.
  * @param {number} parameters.queryConnectionCount Count of paths to collect
  * between each pair of targets.
  * @param {Array<Object>} parameters.subnetworkNodesRecords Information about
  * subnetwork's nodes.
  * @param {Array<Object>} parameters.subnetworkLinksRecords Information about
  * subnetwork's links.
  * @param {Array<Object>} parameters.networkNodesRecords Information about
  * network's nodes.
  * @param {Array<Object>} parameters.networkLinksRecords Information about
  * network's links.
  * @returns {Object} Values of application's variables.
  */
  static deriveSubnetwork({subnetworkRestoration, queryCombination, queryType, queryRogueFocus, queryProximityFocus, queryProximityDirection, queryProximityDepth, queryPathSource, queryPathTarget, queryPathDirection, queryPathCount, queryConnectionTargets, queryConnectionCount, subnetworkNodesRecords, subnetworkLinksRecords, networkNodesRecords, networkLinksRecords} = {}) {
    // Determine whether to derive subnetwork's elements by a query.
    if (subnetworkRestoration) {
      // Derive subnetwork's elements by initial combinations.
      // Consider combination strategy.
      if (queryCombination === "inclusion") {
        var subnetworkElements = {
          subnetworkNodesRecords: [],
          subnetworkLinksRecords: []
        };
      } else if (queryCombination === "exclusion") {
        var subnetworkElements = Network.copyNetworkElementsRecords({
          networkNodesRecords: networkNodesRecords,
          networkLinksRecords: networkLinksRecords
        });
      }
    } else {
      // Derive subnetwork's elements by execution of query.
      // Preserve any current elements in subnetwork.
      // Execute query and combine elements to subnetwork.
      var subnetworkElements = ActionQuery.executeQueryCombineNetwork({
        queryCombination: queryCombination,
        queryType: queryType,
        queryRogueFocus: queryRogueFocus,
        queryProximityFocus: queryProximityFocus,
        queryProximityDirection: queryProximityDirection,
        queryProximityDepth: queryProximityDepth,
        queryPathSource: queryPathSource,
        queryPathTarget: queryPathTarget,
        queryPathDirection: queryPathDirection,
        queryPathCount: queryPathCount,
        queryConnectionTargets: queryConnectionTargets,
        queryConnectionCount: queryConnectionCount,
        subnetworkNodesRecords: subnetworkNodesRecords,
        subnetworkLinksRecords: subnetworkLinksRecords,
        networkNodesRecords: networkNodesRecords,
        networkLinksRecords: networkLinksRecords
      });
    }
    // Compile information.
    var novelVariablesValues = {
    };
    var variablesValues = Object.assign(
      novelVariablesValues,
      subnetworkElements
    );
    // Return information.
    return variablesValues;
  }
  /**
  * Derives subnetwork's elements.
  * @param {Object} parameters Destructured object of parameters.
  * @param {boolean} parameters.subnetworkRestoration Whether to restore
  * subnetwork's elements.
  * @param {string} parameters.queryCombination Method of combination,
  * "inclusion" or "exclusion".
  * @param {string} parameters.queryType Type of query, "rogue", "proximity",
  * "path", or "combination".
  * @param {Object<string>} parameters.queryRogueFocus Information about a node.
  * @param {Object<string>} parameters.queryProximityFocus Information about a
  * node.
  * @param {string} parameters.queryProximityDirection Direction in which to
  * traverse links, "successors" for source to target, "predecessors" for target
  * to source, or "neighbors" for either.
  * @param {number} parameters.queryProximityDepth Depth in links to which to
  * traverse.
  * @param {Object<string>} parameters.queryPathSource Information about a node.
  * @param {Object<string>} parameters.queryPathTarget Information about a node.
  * @param {string} parameters.queryPathDirection Direction in which to traverse
  * links, "forward" for source to target, "reverse" for target to source, or
  * "both" for either.
  * @param {number} parameters.queryPathCount Count of paths to collect.
  * @param {Array<Object<string>>} parameters.queryConnectionTargets Information
  * about nodes.
  * @param {number} parameters.queryConnectionCount Count of paths to collect
  * between each pair of targets.
  * @param {Array<Object>} parameters.subnetworkNodesRecords Information about
  * subnetwork's nodes.
  * @param {Array<Object>} parameters.subnetworkLinksRecords Information about
  * subnetwork's links.
  * @param {Array<Object>} parameters.networkNodesRecords Information about
  * network's nodes.
  * @param {Array<Object>} parameters.networkLinksRecords Information about
  * network's links.
  * @returns {Object} Values of application's variables.
  */
  static executeQueryCombineNetwork({queryCombination, queryType, queryRogueFocus, queryProximityFocus, queryProximityDirection, queryProximityDepth, queryPathSource, queryPathTarget, queryPathDirection, queryPathCount, queryConnectionTargets, queryConnectionCount, subnetworkNodesRecords, subnetworkLinksRecords, networkNodesRecords, networkLinksRecords} = {}) {
    // Determine query's type.
    if (queryType === "rogue") {
      var subnetworkElements = Query.combineRogueNodeNetwork({
        focus: queryRogueFocus.identifier,
        combination: queryCombination,
        subnetworkNodesRecords: subnetworkNodesRecords,
        subnetworkLinksRecords: subnetworkLinksRecords,
        networkNodesRecords: networkNodesRecords,
        networkLinksRecords: networkLinksRecords
      });
    } else if (queryType === "proximity") {
      var subnetworkElements = Query.combineProximityNetwork({
        focus: queryProximityFocus.identifier,
        direction: queryProximityDirection,
        depth: queryProximityDepth,
        combination: queryCombination,
        subnetworkNodesRecords: subnetworkNodesRecords,
        subnetworkLinksRecords: subnetworkLinksRecords,
        networkNodesRecords: networkNodesRecords,
        networkLinksRecords: networkLinksRecords
      });
    } else if (queryType === "path") {
      var subnetworkElements = Query.combinePathNetwork({
        source: queryPathSource.identifier,
        target: queryPathTarget.identifier,
        direction: queryPathDirection,
        count: queryPathCount,
        combination: queryCombination,
        subnetworkNodesRecords: subnetworkNodesRecords,
        subnetworkLinksRecords: subnetworkLinksRecords,
        networkNodesRecords: networkNodesRecords,
        networkLinksRecords: networkLinksRecords
      });
    } else if (queryType === "connection") {
      var targets = General
      .collectValueFromObjects("identifier", queryConnectionTargets);
      var subnetworkElements = Query.combineConnectionNetwork({
        targets: targets,
        count: queryConnectionCount,
        combination: queryCombination,
        subnetworkNodesRecords: subnetworkNodesRecords,
        subnetworkLinksRecords: subnetworkLinksRecords,
        networkNodesRecords: networkNodesRecords,
        networkLinksRecords: networkLinksRecords
      });
    }
    // Compile information.
    var novelVariablesValues = {
    };
    var variablesValues = Object.assign(
      novelVariablesValues,
      subnetworkElements
    );
    // Return information.
    return variablesValues;
  }
  /**
  * Derives application's dependent state from controls relevant to view.
  * @param {Object} parameters Destructured object of parameters.
  * @param {boolean} subnetworkRestoration Whether to restore subnetwork's
  * elements.
  * @param {string} queryCombination Method of combination, "inclusion" or
  * "exclusion".
  * @param {Array<Object>} parameters.subnetworkNodesRecords Information about
  * subnetwork's nodes.
  * @param {Array<Object>} parameters.subnetworkLinksRecords Information about
  * subnetwork's links.
  * @param {Array<Object>} parameters.networkNodesRecords Information about
  * network's nodes.
  * @param {Array<Object>} parameters.networkLinksRecords Information about
  * network's links.
  * @param {Object<boolean>} parameters.viewsRestoration Information about
  * whether to restore each view.
  * @param {Object} parameters.state Application's state.
  * @returns {Object} Values of application's variables.
  */
  static deriveState({subnetworkRestoration, queryCombination, subnetworkNodesRecords, subnetworkLinksRecords, networkNodesRecords, networkLinksRecords, viewsRestoration, state} = {}) {
    // Derive state relevant to view.

    // Initialize controls for query view.
    var subordinateControls = ActionQuery.initializeSubordinateControls();

    // Restore subnetwork's elements.
    var subnetworkElements = ActionQuery.deriveSubnetwork({
      subnetworkRestoration: subnetworkRestoration,
      queryCombination: queryCombination,
      queryType: state.queryType,
      queryRogueFocus: state.queryRogueFocus,
      queryProximityFocus: state.queryProximityFocus,
      queryProximityDirection: state.queryProximityDirection,
      queryProximityDepth: state.queryProximityDepth,
      queryPathSource: state.queryPathSource,
      queryPathTarget: state.queryPathTarget,
      queryPathDirection: state.queryPathDirection,
      queryPathCount: state.queryPathCount,
      queryConnectionTargets: state.queryConnectionTargets,
      queryConnectionCount: state.queryConnectionCount,
      subnetworkNodesRecords: subnetworkNodesRecords,
      subnetworkLinksRecords: subnetworkLinksRecords,
      networkNodesRecords: networkNodesRecords,
      networkLinksRecords: networkLinksRecords
    });
    // Determine summary information about subnetwork.
    var subnetworkSummary = Network.determineSubnetworkSummary({
      subnetworkNodesRecords: subnetworkElements.subnetworkNodesRecords,
      subnetworkLinksRecords: subnetworkElements.subnetworkLinksRecords
    });


    // Determine which views to restore.
    var novelViewsRestoration = ActionInterface.changeViewsRestoration({
      views: [
        "subnetwork",
        "query",
        "measurement",
        "summary",
        "exploration",
        "notice",
        "progress",
        "topology"
      ],
      type: true,
      viewsRestoration: viewsRestoration
    });
    // Initialize subordinate controls relevant to dependent state.
    var explorationControls = ActionExploration.initializeSubordinateControls();
    // Derive dependent state.
    var dependentStateVariables = ActionExploration.deriveState({
      simulationDimensions: state.simulationDimensions,
      forceNetworkDiagram: explorationControls.forceNetworkDiagram,
      simulationRestoration: true,
      subnetworkNodesRecords: subnetworkElements.subnetworkNodesRecords,
      subnetworkLinksRecords: subnetworkElements.subnetworkLinksRecords,
      viewsRestoration: novelViewsRestoration,
      state: state
    });
    // Compile information.
    var novelVariablesValues = {
      subnetworkSummary: subnetworkSummary
    };
    var variablesValues = Object.assign(
      novelVariablesValues,
      subnetworkElements,
      subordinateControls,
      explorationControls,
      dependentStateVariables
    );
    // Return information.
    return variablesValues;
  }
}
