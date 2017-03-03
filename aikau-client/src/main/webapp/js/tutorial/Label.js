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

      postCreate: function tutorial_Label__postCreate() {
         if (this.widgets)
         {
            var clonedWidgets = lang.clone(this.widgets);
            this.processObject(["processInstanceTokens"], clonedWidgets);
            this.processWidgets(clonedWidgets, this.containerNode);
         }
      }
   });
});