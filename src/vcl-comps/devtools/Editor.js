"devtools/Resources, util/Xml, vcl/ui/Tab";

var Resources = require("devtools/Resources");

$(["ui/Form"], {
    activeControl: "ace",
    onLoad: function () {
        var tab = this.up("vcl/ui/Tab");
        var scope = this.getScope();
        
        var ExtensionToMode = {
            "html": "html",
            "css": "css",
            "scss": "scss",
            "json": "json",
            "geojson": "json",
            "js": "javascript",
            "blocks": "javascript",
            "vcl": "javascript",
            "ts": "typescript",
            "md": "markdown",
            "java": "java",
            "jsx": "jsx",
            "rdf": "xml",
            "wsdl": "xml",
            "xsd": "xml",
            "xml": "xml",
            "xsl": "xml",
            "jsp": "jsp"
        };

        var ed = scope.ace.getEditor();
        ed.setTheme("ace/theme/eclipse");
        ed.renderer.setHScrollBarAlwaysVisible(false);
        ed.setScrollSpeed(2);

        var resource = tab.vars(["resource"]);
        var name = resource.name || (resource.uri || "").split("/").pop();
        var type = (resource.contentType || "").split("/").pop();
        var ext = name.split(".").pop();
        var session = ed.getSession();

        var mode = "ace/mode/" + (ExtensionToMode[type || ext || this.getSpecializer()] || (type || ext || this.getSpecializer() || "js"));
        
        require([mode], 
        	function() { session.setMode(mode); }, 
        	function() { console.log("Unknown mode " + mode); });
        
        session.setUseWrapMode(true);
        session.setWrapLimitRange(null, null);

        session.on("change", function (e) {
            scope.ace.setTimeout("update", function () {
                var modified = tab.getVar("modified");
                if (modified === "resetundo,gototop") {
                    session.getUndoManager().reset();
                    tab.removeVar("modified");
                    tab.setState("invalidated", true);
                } else {
                    if (session.getUndoManager().hasUndo()) {
                        if (!modified) {
                            tab.setVar("modified", true);
                            tab.setState("invalidated", true);
                        }
                    } else {
                        if (tab.getVar("modified") !== undefined) {
                            tab.removeVar("modified");
                            tab.setState("invalidated", true);
                        }
                    }
                }
            }, 100);
        });

        scope.refresh.execute();
        
        return this.inherited(arguments);
    }
}, [
    $(("vcl/Action"), "refresh", {
        hotkey: "MetaCtrl+R",
        onExecute: function (evt) {
            var scope = this.getScope();
            var tab = this.up("vcl/ui/Tab");
            var resource = tab.getVar("resource");
            var editor = scope.ace.getEditor();
            if (resource) {
                scope.loading.show();
                editor.setReadOnly(true);
                editor.blur();
                Resources.get(resource.uri).
                    then(function (res) {
                        if(res.text !== undefined && res.text !== editor.session.getValue()) {
                            tab.setVar("modified", "resetundo,gototop");
                            editor.session.setValue(res.text);
                        } else {
                            tab.removeVar("modified");
                        }
                        tab.setVar("resource.revision", res.revision);
                        editor.setReadOnly(false);
                        editor.focus();
                        scope.loading.hide();
                        tab.emit("resource-loaded");
//                        tab.setState("invalidated", true);
                    }).
                    catch(function(res) {
                        editor.setReadOnly(false);
                        editor.focus();
                        
                        if(evt && res.status === 404) {
                        	tab.app().confirm(String.format("404 - %s\n\nThis resource does not exist. Would you like to create it?", resource.uri), function(res) {
                        			if(res === true) {
                        				Resources.create(resource.uri, resource)
                        					.then(_ => editor.print(_))
                        					.catch(_ => editor.print(_));
                        			}
	                        	});
                        }
                        
                        scope.loading.hide();
                        tab.emit("resource-loaded");
                    });
            }
        }
    }),
    $(("vcl/Action"), "save-resource", {
        onExecute: function () {
            var scope = this.getScope();
            var resource = this.getVar("resource", true);
            var text = scope.ace.getValue();
            var editor = scope.ace.getEditor();
            
            // vcl/ui/Tab[uri=devtools/Workspace]:owner-of(.)
            /*- Since it has to be the first owner 'up-wise', expressions become MUCH simpler by using ::up(). Hear, hear, Ext.. */
            var tab = this.up("vcl/ui/Tab"); 

            if(!resource.uri || !tab.getVar("modified")) {
                return;
            }

            scope.loading.show();
            editor.setReadOnly(true);
            editor.blur();

            resource.text = editor.getValue();
            Resources.update(resource.uri, resource).
                then(function(res) {
                    editor.setReadOnly(false);
                    editor.focus();
                    scope.loading.hide();
                    return res;
                }).
                then(function(res) {
                    tab.removeVar("modified");
                    tab.setState("invalidated", true);
                    if(res.hasOwnProperty("revision")) {
                    	resource.revision = res.revision;
                    }
                    tab.emit("resource-saved");
                }).
                catch(function(res) {
                	var msg;
                	if(res.status === 404) {
	                    // msg = "**WARNING*** - Changes have NOT been saved because the resource is non-existent. Would you like to try to create the resource?";
	                    
                    	tab.app().confirm(String.format("404 - %s\n\nThis resource does not exist. Would you like to create it?", resource.uri), function(res) {
                    			if(res === true) {
                    				Resources.create(resource.uri, resource)
                    					.then(_ => editor.print(_))
                    					.catch(_ => editor.print(_));
                    			}
                        	});

                 	} else if(res.status === 409) {
	                    msg = "**WARNING*** - The resource has not been saved because it has been changed since loading it. Copy the contents of the resource (to the clipboard eg.) before reloading it.";
                 	} else {
                 		console.error(res);
                 		msg = res.message;
                 	}
                 	msg && alert(String.format("%s\n\n%s - %s", msg, res.status, res.statusText));
                    scope.loading.hide();
                });
        }
    }),
    $(("vcl/Action"), "save", {
        hotkey: "MetaCtrl+S",
        parent: "save-resource",
        parentExecute: true
    }),
    $(("vcl/Action"), "format", {
        hotkey: "MetaCtrl+Shift+F",
        onExecute: function () {
            var Xml = require("util/Xml");
            var scope = this.getScope();
            var editor = scope.ace.getEditor();
            var mode = editor.session.$modeId || "";
            switch (mode.split("/").pop()) {
            case "javascript":
            case "json":
                editor.setValue(js.b(editor.getValue()));
                break;

            case "xml":
                editor.setValue(Xml.beautify(editor.getValue()));
                break;

            default:
                alert("Don't know how to format this (yet)");

            }
        }
    }),
    $(("vcl/Action"), "toggle-wrap", {
        hotkey: "MetaCtrl+Shift+W",
        onExecute: function (evt) {
            var editor = this.scope().ace.getEditor();
            editor.getSession().setUseWrapMode(!editor.getSession().getUseWrapMode());
            evt.preventDefault();
        }
    }),
    $(("vcl/Action"), "evaluate", {
        hotkey: "MetaCtrl+Enter|Alt+MetaCtrl+Enter",
        onExecute: function(evt) {
            var all = require("js/JsObject").all;
            var Deferred = require("js/Deferred");

/* TODO cleanup - @seealso blocks/Factory.prototype.constructor */

				var parentRequire = require;
				var uri = "$HOME/" + this.vars(["resource.uri"]);
            
				function normalize(uri, module) {
					if(module.includes("!")) {
						module = module.split("!");
						module[1] = js.normalize(uri, module[1]);
						module = module.join("!");
					} else {
						module = js.normalize(uri, module);
					}
					return module;
				}
				function thisRequire(modules, success, error) {
					if(modules instanceof Array) {
						modules = modules.map(module => normalize(uri, module));
					} else {
						modules = normalize(uri, modules);
					}
					return parentRequire(modules, success, error);
				}
				
				for(var k in parentRequire) {
					thisRequire[k] = parentRequire[k];
				}
            

            function defer(requirements, callback) {
                var deferred = new Deferred();
                require(requirements, function() {
                    var args = [deferred].concat(js.copy_args(arguments));
                    return callback.apply(this, args);
                });
                return deferred;
            }

			var app = this.app(), ws = this.up("devtools/Workspace<>:root");
            var scope = this.scope();
            var text = scope.ace.getEditor().getSession().getValue();
            var printer = evt.altKey ? app : ws;

            if(text.charAt(0) === "{") {
                text = "(" + text + ")";
            }
            try {
            	(function(require) {
	                var value = eval(text);
	                if(value !== undefined) {
	                    this.print(value);
	                }
            	}.apply(this, [thisRequire]));
            } catch(e) {
            	this.print(e);
            }
        }
    }),
    $(("vcl/Action"), "focus-in-navigator", {
    	hotkey: "MetaCtrl+48",
        onExecute: function(evt) {
            var app = this.getApp();
            var resource = this.getVar("resource", true);
            app.qsa("devtools/Workspace<>:owner-of(.) #navigator #resource-focus", this)
            	.execute({resource: resource}, this);
        }
    }),
    $(("vcl/ui/Ace"), "ace"),
    $(("vcl/ui/Panel"), "loading", {
        align: "none",
        autoSize: "both",
        css: {
            opacity: "0.75",
            background: "white url(/shared/vcl/images/loading.gif) no-repeat center center",
            "z-index": "10000",
            left: 0, top: 0, bottom: 0, right: 0
        },
        visible: false,
        
        /* TODO fade out */
        onLoad: function() {
            var canHide = Date.now();
            this.override({
                showNode: function() {
                    this.clearTimeout("hideNode");
                    canHide = Date.now() + 250;
                    return this.inherited(arguments);
                },
                hideNode: function() {
                    var me = this, args = js.copy_args(arguments);
                    args.callee = arguments.callee;
                    this.setTimeout(function() {
                        me.inherited(args);
                    }, canHide - Date.now());
                }
            })
        }
    })
]);