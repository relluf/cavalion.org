$([], {
	// onLoad() { return this.inherited(arguments); }
}, [

	$i("workspaces-tabs", { //align: "top", index: 0, classes: "", _zoom: 0,
		css: "background-color:white;",
		onNodeCreated() { 
			// this.setTimeout("zoom", () => this.setZoom(1.45), 750); 
		}
		
	}, [
		$("vcl/ui/Element", { index: 0, element: "span", content: "<b>cavalion-devtools<b>", css: "font-size:7pt;"})
	])	
	
]);