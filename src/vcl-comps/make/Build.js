//
// cd C:\Users\ralph\Source\veldapps.com\veldoffice\rapportage
// node r.js -o build.json
//
$([], {
    vars: {
		modules: ["js/global","js/beautify","js/minify","js/nameOf","js/serialize","util/Browser","util/Event","locales/prototype","locales/en-US","text","vcl/ui/Ace","vcl/ui/FormContainer","ace/ace","vcl/ui/Form","vcl/ui/Panel","vcl/Control","ace/lib/fixoldbrowsers","ace/lib/dom","ace/lib/event","ace/range","ace/undomanager","ace/worker/worker_client","ace/keyboard/hash_handler","ace/placeholder","ace/virtual_renderer","ace/mode/folding/fold_mode","ace/theme/textmate","ace/multi_select","ace/ext/error_marker","ace/config","vcl/ui/Container","ace/editor","ace/edit_session","ace/lib/oop","ace/lib/net","ace/lib/event_emitter","ace/layer/gutter","ace/layer/marker","ace/layer/text","ace/layer/cursor","ace/scrollbar","ace/renderloop","ace/layer/font_metrics","ace/requirejs/text","ace/range_list","ace/selection","ace/mouse/multi_select_handler","ace/lib/lang","ace/commands/multi_select_commands","ace/search","ace/line_widgets","ace/lib/app_config","vcl/ui/Element","ace/keyboard/textinput","ace/mouse/mouse_handler","ace/mouse/fold_handler","ace/commands/command_manager","ace/keyboard/keybinding","ace/commands/default_commands","ace/token_iterator","ace/clipboard","ace/bidihandler","ace/mode/text","ace/document","ace/background_tokenizer","ace/search_highlight","ace/edit_session/folding","ace/edit_session/bracket_match","util/Stylesheet","util/DocumentHook","vcl/Action","vcl/EventDispatcher","vcl/ControlUpdater","vcl/CssRules","vcl/Dragger","ace/lib/regexp","ace/lib/useragent","ace/lib/es5-shim","ace/lib/keys","ace/layer/lines","data/SourceEvent","ace/mouse/default_handlers","ace/mouse/default_gutter_handler","ace/mouse/mouse_event","ace/mouse/dragdrop_handler","ace/lib/bidiutil","ace/tokenizer","ace/mode/text_highlight_rules","ace/mode/behaviour/cstyle","ace/unicode","ace/apply_delta","ace/anchor","ace/edit_session/fold_line","ace/edit_session/fold","util/Ajax","util/HotkeyManager","ace/tooltip","ace/mode/behaviour","util/Keyboard","util/Fullscreen","vcl/Application","util/Command","vcl/ui/Sizer","entities/EM","entities/ExpressionBuilder","util/Rest","features/FM","entities/Instance","jquery","data/Source","data/SourceState","vcl/ui/Button","vcl/ui/Console","vcl/ui/Console.evaluate","vcl/ui/Tab","vcl/ui/Bar","vcl/ui/Input","vcl/ui/Tabs","vcl/ui/Node","vcl/ui/ListHeader","vcl/ui/Group","devtools/NavigatorNode","devtools/Resources","devtools/Resources-node","vcl/data/Array","vcl/ui/List","vcl/ui/ListColumn","vcl/ui/Tree","vcl/ui/ListFooter","vcl/ui/ListBody","vcl/ui/ListRow","util/Xml","ace/theme/eclipse","ace/mode/javascript","ace/mode/javascript_highlight_rules","ace/mode/matching_brace_outdent","ace/mode/folding/cstyle","ace/mode/doc_comment_highlight_rules","../lib/bower_components/framework7/dist/js/framework7","ace/mode/html","ace/mode/css","ace/mode/html_highlight_rules","ace/mode/behaviour/xml","ace/mode/html_completions","ace/mode/folding/html","ace/mode/css_highlight_rules","ace/mode/css_completions","ace/mode/behaviour/css","ace/mode/xml_highlight_rules","ace/mode/folding/mixed","ace/mode/folding/xml","on","../lib/bower_components/markdown/lib/markdown","ace/mode/markdown","ace/mode/xml","ace/mode/markdown_highlight_rules","ace/mode/folding/markdown","ace/mode/sh","ace/mode/sh_highlight_rules","vcl/ui/CheckGroup","ace/mode/json","ace/mode/json_highlight_rules","ace/ext/searchbox"],
        components: [
        	"text!vcl-comps/devtools/App.js","text!vcl-comps/App.js","text!vcl/prototypes/App.v1.js","text!vcl/prototypes/App.console.js","text!vcl/prototypes/App.js","text!vcl-comps/ui/forms/util/Console.js","text!vcl/prototypes/ui/forms/util/Console.js","text!vcl/prototypes/App.openform.js","text!vcl/prototypes/App.toast.js","text!vcl/prototypes/ui/controls/SizeHandle.js","text!vcl/prototypes/ui/Form.js","text!vcl/prototypes/ui/controls/Toolbar.js","text!vcl-comps/devtools/Main.js","text!vcl-comps/devtools/TabFactory.js","text!vcl-comps/devtools/DragDropHandler.js","text!vcl-comps/devtools/CtrlCtrl.js","text!vcl-comps/devtools/Workspace.js","text!vcl-comps/devtools/Navigator.js","text!vcl-comps/devtools/Bookmarks.js","text!vcl-comps/devtools/Outline.js","text!vcl-comps/devtools/OpenTabs.js","text!vcl-comps/devtools/Console.js","text!vcl-comps/make/Build.js","text!vcl-comps/devtools/Editor$/html.js","text!vcl-comps/devtools/Editor.js","text!vcl-comps/devtools/Editor$/vcl.js","text!vcl-comps/devtools/Editor$/png.js","text!vcl-comps/devtools/Editor$/md.js","text!vcl-comps/devtools/Editor$/folder.js","text!blocks/prototypes/Console.js","text!vcl-comps/devtools/Editor$/blocks.js","text!vcl-comps/veldoffice/Session.js","text!vcl-comps/devtools/Editor$/xml.js","text!vcl-comps/devtools/Editor$/xsd.js"]

   //     implicit_components: {
   //     	"text!vcl-comps/App.console.desktop.v1.js":"$([\"App\", \"App.v1\", \"App.desktop\", \"App.console\"]);","text!vcl-comps/App.js":"$([\"vcl/prototypes/App\"]);","text!vcl-comps/App.v1.js":"$([\"App\", \"vcl/prototypes/App.v1\"]);","text!vcl-comps/App.desktop.js":"$([\"App\", \"vcl/prototypes/App.desktop\"]);","text!vcl-comps/App.console.js":"$([\"App\", \"vcl/prototypes/App.console\"]);","text!vcl-comps/ui/forms/util/Console.js":"$([\"vcl/prototypes/ui/forms/util/Console\"]);","text!vcl/prototypes/App.openform.toast.js":"$([\"vcl/prototypes/App\", \"vcl/prototypes/App.toast\", \"vcl/prototypes/App.openform\"]);","text!vcl-comps/ui/controls/Toolbar.js":"$([\"vcl/prototypes/ui/controls/Toolbar\"]);","text!vcl-comps/Portal$/Onderzoek.js":"$([\"Portal\"]);","text!vcl-comps/Portal.reports.js":"$([\"Portal\", \"vcl/prototypes/Portal.reports\"]);","text!vcl/prototypes/Portal.reports.js":"$([\"vcl/prototypes/Portal\"]);","text!vcl/prototypes/Portal.js":"$(\"vcl/Component\", \"dead-end\");","text!vcl-comps/ui/forms/Portal.js":"$([\"vcl/prototypes/ui/forms/Portal\"]);","text!vcl-comps/Home.reports.js":"$([\"Home\", \"vcl/prototypes/Home.reports\"]);","text!vcl-comps/Home$/Onderzoek.js":"$([\"Home\"]);","text!vcl/prototypes/Home.reports.js":"$([\"vcl/prototypes/Home\"]);","text!vcl/prototypes/Home.js":"$(\"vcl/Component\", \"dead-end\");","text!vcl-comps/ui/forms/Home.tree.js":"$([\"ui/forms/Home\", \"vcl/prototypes/ui/forms/Home.tree\"]);","text!vcl-comps/ui/forms/Home.js":"$([\"vcl/prototypes/ui/forms/Home\"]);","text!vcl-comps/ui/forms/View.js":"$([\"vcl/prototypes/ui/forms/View\"]);"}
    }
});