define(["dojo/_base/declare",
        "alfresco/core/ProcessWidgets"], 
        function(declare, ProcessWidgets) {

   return declare([ProcessWidgets], {

      widgets: [
         {
            id: "HEADER_BAR",
            name: "alfresco/header/Header",
            config: {
               widgets: [
                  {
                     id: "APP_MENU_BAR",
                     name: "alfresco/header/AlfMenuBar",
                     align: "left",
                     config: {
                        widgets: [
                           {
                              id: "HOME",
                              name: "alfresco/menus/AlfMenuBarItem",
                              config: {
                                 label: "Home",
                                 targetUrl: "ap/ws/home"
                              }
                           }
                        ]
                     }
                  },
                  {
                     id: "USER_MENU_BAR",
                     name: "alfresco/header/AlfMenuBar",
                     align: "right",
                     config: {
                        widgets: [
                           {
                              id: "USER_MENU",
                              name: "alfresco/header/AlfMenuBarPopup",
                              config: {
                                 label: "User Menu",
                                 widgets: [
                                    {
                                       id: "HEADER_USER_MENU",
                                       name: "alfresco/menus/AlfMenuGroup",
                                       config: {
                                          widgets: [
                                             {
                                                id: "LOGOUT",
                                                name: "alfresco/header/AlfMenuItem",
                                                config:
                                                {
                                                   label: "Logout",
                                                   iconClass: "alf-user-logout-icon",
                                                   publishTopic: "ALF_DOLOGOUT"
                                                }
                                             }
                                          ]
                                       }
                                    }
                                 ]
                              }
                           }
                        ]
                     }
                  }
               ]
            }
         }
      ]
   });
});