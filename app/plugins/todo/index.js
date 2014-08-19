define('Todo', function(){
  return {
    title : 'Todo', // this will shown as the menu title
    name : 'Todo', // Foundry will add an object with this name, so you can access with it.
    type : 'plugin',
    anchor : '#/Todo', // this property is for angular route
    icon : 'icon-list',
    init : function(){
      // a basic method for foundry to init your plugin
      
      foundry.initialized(this.name);
    }
  } 
});
