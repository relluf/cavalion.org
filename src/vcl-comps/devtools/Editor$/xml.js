"fast-xml-parser";

var Parser = require("fast-xml-parser");

function sikb(root) {
	var arr = root['imsikb0101:FeatureCollectionIMSIKB0101']['imsikb0101:featureMember'];
	var entityMap = {};
	arr.forEach(function(_) {
		var key = Object.keys(_)[0];
		var arr = (entityMap[key] = entityMap[key] || []);
		arr.push(_[key]);
	});
	return entityMap;
}

var utils = {
	sikb: sikb
};

var styles = {
	"#output": "background-color: #f0f0f0; border-right: 1px solid silver;"
};

$([], { css: styles }, [
    $("vcl/Action#toggle-source", {
        hotkey: "Shift+MetaCtrl+S",
        selected: "state", visible: "state",
        state: true,
        
        onExecute: function() {
        	this.setState(!this.getState());
        	// this.scope().ace.setVisible(this.getState());
        }
    }),
    $("vcl/Action#toggle-output", {
        hotkey: "Shift+MetaCtrl+O",
        selected: "state",
        visible: "state",
        state: true,
        
        onExecute: function() {
        	var output = this.scope().output;
        	output.setVisible(!output.isVisible());
        }
    }),
    $("vcl/Action#render", {
    	onExecute: function() {
    		var scope = this.scope();
		 	var console = scope.console;
			
			var root = Parser.parse(scope.ace.getValue(), {ignoreAttributes : false});
			this._owner.setVar("root", root);
			
			console.print("root", root);
    	}
    }),
    
    $("vcl/ui/Panel", "output", { align: "client" }, [
	    $("vcl/ui/Tabs", "tabs", { align: "bottom", classes: "bottom" }, [
	    	$("vcl/ui/Tab", { text: locale("Console"), control: "console", selected: true })
	    ]),
	    $("vcl/ui/Console", "console", { align: "client", 
	    	onEvaluate: function(expr) {
	    		var root = this._owner.getVar("root"), scope = this.scope();
	    		return eval(expr);
	    	}
	    })
    ]),
    $i("ace", { 
    	align: "left", width: 600, action: "toggle-source",
    	executesAction: "none",
        onChange: function() {
        	var scope = this.scope();
        	
        	
            scope.render.setTimeout("execute", 500);
        }
    }),
]);