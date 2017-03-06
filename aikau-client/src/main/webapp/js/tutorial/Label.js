define(["dojo/_base/declare",
        "alfresco/core/ProcessWidgets",
        "alfresco/core/ObjectProcessingMixin",
        "dojo/_base/lang"], 
        function(declare, ProcessWidgets, ObjectProcessingMixin, lang) {

   return declare([ProcessWidgets, ObjectProcessingMixin], {

      label: "Hello",

      additionalCssClasses: "",

      widgets: [
         {
            name: "alfresco/html/Label",
            config: {
               label: "{label}",
               additionalCssClasses: "{additionalCssClasses}"
            }
         }
      ],

      /* postCreate is called after the widget has been constructed and its DOM elements have 
      been generated, but before the DOM elements are attached to the main DOM tree, and therefore 
      provides a hook, allowing 'last-minute' customisation of the widget*/
      postCreate: function tutorial_Label__postCreate() {
        /* Here we have constructed a instance of the widget from a common prototype, so we make a copy of the 
        widget via 'lang.clone'; processObject calls 'processInstanceTokens', on our cloned widgets. In this case
        We are processing the 'label' and 'additionaCssClasses' tokens; finally processWidgets takes our customised
        widget and instantiates it as a container node DOM element

        TODO: FIND OUT ABOUT CONTAINER NODE*/ 
         if (this.widgets)
         {
            var clonedWidgets = lang.clone(this.widgets);
            this.processObject(["processInstanceTokens"], clonedWidgets);
            this.processWidgets(clonedWidgets, this.containerNode);
         }
      }
   });
});