define([
    'base/js/namespace',
    'base/js/events'
    ], function(Jupyter, events) {

        // Adds a cell above current cell (will be top if no cells)
        var add_cell = function() {
        Jupyter.notebook.
        insert_cell_above('code').
        // Define default cell here
        set_text(`#Welcome to -> Frame wirk`);
	console.log('This is the current notebook application instance:',Jupyter.notebook,events);
	//Method to capture the event name
	var parent = document.querySelector('#maintoolbar-container.container.toolbar');
    <!-- Add click event on parent div -->
      parent.addEventListener('click', function(e){
      const clicked_Data = e.target;
        console.log("Site clicked..............",clicked_Data.title);
        
        fetch('https://jsonplaceholder.typicode.com/posts', {
   	 method: 'POST',
    	 body: JSON.stringify({
         	title: JSON.stringify(clicked_Data.title),
      		body: JSON.stringify(clicked_Data),
      		userId: 1
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => console.log(json));

      });
      
      
Jupyter.notebook.select_prev();
Jupyter.notebook.execute_cell_and_select_below();
      };
      

      // Button to add default cell
      var defaultCellButton = function () {
          Jupyter.toolbar.add_buttons_group([
              Jupyter.keyboard_manager.actions.register ({
                  'help': 'Add default cell',
                  'icon' : 'fa-play-circle',
                  'handler': add_cell
              }, 'add-default-cell', 'Default cell')
          ])
      }
    // Run on start
    function load_ipython_extension() {
        // Add a default cell if there are no cells
        if (Jupyter.notebook.get_cells().length===1){
            add_cell();
        }
        defaultCellButton();
	
    }
    return {
        load_ipython_extension: load_ipython_extension
    };
});
