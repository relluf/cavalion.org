"use vcl/ui/Node, dropbox";

var DBX_XS_TOKEN = "4OZtEz8LDp4AAAAAAABLV81n84RSnHKyv9kCTgtYwfICAiQJ4RREDPS1MSNDEl1_";

var Node_ = require("vcl/ui/Node");
var Dropbox = require("dropbox").Dropbox;

$([], {
	onLoad: function() {
		// var ws = this.up("devtools/Workspace<>:root");
		var fs = this.down("#tree < #fs");
		var NavigatorNode = fs.constructor;

		var node = new NavigatorNode({
			vars: { 
				resource: { 
					uri: "pouchdb://va_objects",
					name: "va-objects", 
					type: "Folder"
				}
			},
			owner: this,
			parent: this.scope().databases,
			expandable: true,
			onNodesNeeded: function() {
				var fs = this.up("devtools/Workspace<>").down("#navigator #fs");
				return fs._onChildNodesNeeded.apply(fs, arguments);
			}
		});

		// must have a Resources implementation, take it from fs		
		this.setVar("Resources", fs.getVar("Resources"));
		
		return this.inherited(arguments);
	},
	vars: {
		dbx: new Dropbox({accessToken:DBX_XS_TOKEN}),
		"#navigator favorites": [
			"Workspaces/cavalion.org/cavalion-blocks/src/prototypes;blocks/prototypes",
			"Workspaces/cavalion.org/cavalion-blocks/src/;blocks/src",
			"Workspaces/cavalion.org/cavalion-code/src/cavalion-blocks/console",
			"Workspaces/cavalion.org/cavalion-devtools/src/cavalion-blocks/devtools",
			"Workspaces/cavalion.org/cavalion-ide/src/cavalion-blocks/ide",
			"Workspaces/veldapps.com/veldapps-vo/src/cavalion-blocks;veldapps",
		]
	}
},  [
	$i("navigator", [
		$i("tree", [
			$("vcl/ui/Node", {
				text: "DROPBOX",
				classes: "folder seperator",
				expandable: true,
				// index: 0,
				onNodesNeeded: function(parent) {
					parent = parent || this;
			
					var owner = this;
					var dbx = this.vars(["dbx", true]);
					return dbx.filesListFolder({path: parent.vars("path") || ""})
						.then(function(res) {
							res.entries.sort(function(i1, i2) {
								return i1.name < i2.name ? -1 : 1;
							}).forEach(function(entry) {
								var folder = entry['.tag'] === "folder";
								(new Node_(owner)).setProperties({
									parent: parent,
									expandable: folder,
									classes: folder ? "folder" : "file",
									text: entry.name || entry.path_display
								}).vars("path", entry.path_display);
							});
						});
				}
			}),
			$("vcl/ui/Node", "databases", {
				text: "Databases",
				// visible: false,
				classes: "_root-invisible folder seperator",
				expanded: true,
				// onLoad: function() {
				// 	var fs = this.up("devtools/Workspace<>").down("#navigator #fs");
				// 	this.setParent(fs);
				// 	this.show();
				// },
				onNodesNeeded: function() {}
			})
		])	
	])
]);