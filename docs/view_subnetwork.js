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
* Interface to represent and control subnetwork's definition.
*/
class ViewSubnetwork {
  /**
  * Initializes an instance of a class.
  * @param {Object} parameters Destructured object of parameters.
  * @param {Object} parameters.documentReference Reference to document object
  * model.
  * @param {Object} parameters.state Application's state.
  */
  constructor ({documentReference, state} = {}) {
    // Set common references.
    // Set reference to class' current instance to persist across scopes.
    var self = this;
    // Set reference to application's state.
    self.state = state;
    // Set reference to document object model (DOM).
    self.document = documentReference;
    // Set reference to other views.
    self.interfaceView = self.state.views.interface;
    self.tipView = self.state.views.tip;
    self.promptView = self.state.views.prompt;
    self.controlView = self.state.views.control;
    // Control view's composition and behavior.
    // Initialize view.
    self.initializeView(self);
    // Restore view.
    self.restoreView(self);
  }
  /**
  * Initializes, creates and activates, view's content and behavior that does
  * not vary with changes to the application's state.
  * @param {Object} self Instance of a class.
  */
  initializeView(self) {
    // Create or set reference to container.
    self.container = View.createReferenceContainer({
      identifier: "subnetwork",
      classNames: ["container", "panel", "control", "tierTwo"],
      type: "standard",
      target: self.controlView.subnetworkTab,
      position: "afterend",
      documentReference: self.document
    });
    // Determine whether to create and activate behavior of content.
    if (self.container.children.length === 0) {
      // Container is empty.
      // Create and activate behavior of content.
      // Create and activate button to restore view.
      self.createActivateRestorationButton(self);
      // Create and activate button to export information about network.
      self.createActivateExportButton(self);
      // Create break.
      self.container.appendChild(self.document.createElement("br"));
      // Create summary of network's elements.
      self.createActivateSummary(self);
      // Create and activate tabs.
      self.createActivateTabs(self);
    } else {
      // Container is not empty.
      // Set references to content.
      // Summary.
      self.graphNode = self.container.querySelector("table.summary svg.node");
      self.graphLink = self.container.querySelector("table.summary svg.link");
      // Tabs.
      self.queryTab = self.document.getElementById("tab-query");
    }
  }
  /**
  * Creates and activates button to restore view's controls.
  * @param {Object} self Instance of a class.
  */
  createActivateRestorationButton(self) {
    var restore = View.createButton({
      text: "restore",
      parent: self.container,
      documentReference: self.document
    });
    restore.addEventListener("click", function (event) {
      // Element on which the event originated is event.currentTarget.
      // Call action.
      ActionSubnetwork.restoreControls(self.state);
    });
  }
  /**
  * Creates and activates button to export information about network.
  * @param {Object} self Instance of a class.
  */
  createActivateExportButton(self) {
    var exportButton = View.createButton({
      text: "export",
      parent: self.container,
      documentReference: self.document
    });
    exportButton.addEventListener("click", function (event) {
      // Element on which the event originated is event.currentTarget.
      // Call action.
      ActionSubnetwork.export(self.state);
    });
  }

  // TODO: create and activate a tip for the summary...

  /**
  * Creates and activates a summary about subnetwork.
  * @param {Object} self Instance of a class.
  */
  createActivateSummary(self) {
    // Create or set reference to container.
    var container = View.createInsertContainer({
      classNames: ["container", "summary"],
      type: "standard",
      target: self.container,
      position: "beforeend",
      documentReference: self.document
    });
    // Create table body.
    self.summaryTableBody = View.createTableBody({
      className: "summary",
      parent: container,
      documentReference: self.document
    });
    self.createActivateSummaryNodes(self);
    self.createActivateSummaryLinks(self);
  }
  /**
  * Creates and activates a summary about subnetwork's nodes.
  * @param {Object} self Instance of a class.
  */
  createActivateSummaryNodes(self) {
    var row = View.createTableRow({
      parent: self.summaryTableBody,
      documentReference: self.document
    });
    row.classList.add("node");
    var cellLabel = View.createTableBodyCell({
      parent: row,
      className: "name",
      documentReference: self.document
    });
    cellLabel.classList.add("label");
    cellLabel.textContent = "Nodes:";
    var cellChart = View.createTableBodyCell({
      parent: row,
      className: "count",
      documentReference: self.document
    });
    cellChart.classList.add("chart");
    // Create chart for nodes.
    self.graphNode = View.createNodeChart({
      selection: true,
      parent: cellChart,
      documentReference: self.document
    });
  }
  /**
  * Creates and activates a summary about subnetwork's links.
  * @param {Object} self Instance of a class.
  */
  createActivateSummaryLinks(self) {
    var row = View.createTableRow({
      parent: self.summaryTableBody,
      documentReference: self.document
    });
    row.classList.add("link");
    var cellLabel = View.createTableBodyCell({
      parent: row,
      className: "name",
      documentReference: self.document
    });
    cellLabel.classList.add("label");
    cellLabel.textContent = "Links:";
    var cellChart = View.createTableBodyCell({
      parent: row,
      className: "count",
      documentReference: self.document
    });
    cellChart.classList.add("chart");
    // Create chart for links.
    self.graphLink = View.createLinkChart({
      selection: true,
      parent: cellChart,
      documentReference: self.document
    });
  }
  /**
  * Creates and activates tabs.
  * @param {Object} self Instance of a class.
  */
  createActivateTabs(self) {
    var tabs = Model.determineSubnetworkTabs(self.state);
    tabs.forEach(function (category) {
      var reference = View.createTabReference(category);
      self[reference] = View.createActivateTab({
        type: "subnetwork",
        category: category,
        classNames: ["tab", "tierTwo"],
        parent: self.container,
        documentReference: self.document,
        state: self.state
      });
    });
  }
  /**
  * Restores view's content and behavior that varies with changes to the
  * application's state.
  * @param {Object} self Instance of a class.
  */
  restoreView(self) {
    // Create view's variant elements.
    // Activate variant behavior of view's elements.
    // Restore chart for nodes.
    View.restoreNodeChart({
      nodes: self.state.networkSummary.nodes,
      nodesMetabolites: self.state.networkSummary.nodesMetabolites,
      nodesReactions: self.state.networkSummary.nodesReactions,
      selection: true,
      nodesMetabolitesSelection: self.state.subnetworkSummary.nodesMetabolites,
      nodesReactionsSelection: self.state.subnetworkSummary.nodesReactions,
      pad: 1.5,
      graph: self.graphNode
    });
    // Restore chart for links.
    View.restoreLinkChart({
      links: self.state.networkSummary.links,
      selection: true,
      linksSelection: self.state.subnetworkSummary.links,
      pad: 1.5,
      graph: self.graphLink
    });
  }
}
