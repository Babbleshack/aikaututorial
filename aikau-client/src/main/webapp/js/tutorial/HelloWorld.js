define(["dojo/_base/declare",
        "dijit/_WidgetBase", 
        "dijit/_TemplatedMixin",
        "dojo/text!./html/HelloWorld.html",
        "alfresco/core/Core"], 
        function(declare, _WidgetBase, _TemplatedMixin, template, Core) {

   return declare([_WidgetBase, _TemplatedMixin, Core], {

      cssRequirements: [{cssFile:"./css/HelloWorld.css"}],

      i18nRequirements: [{i18nFile: "./i18n/HelloWorld.properties"}],

      templateString: template,

      postMixInProperties: function tutorial_HelloWorld__postMixInProperties()
      {
         this.greeting = this.message("greeting.label");
		 this.alfLog("log", "Setting greeting message!");      }
   });
});