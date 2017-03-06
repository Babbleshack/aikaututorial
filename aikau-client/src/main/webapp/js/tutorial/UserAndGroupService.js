define(["dojo/_base/declare",
"alfresco/core/Core",
"dojo/_base/lang",
"alfresco/core/CoreXhr",
"service/constants/Default",
"dojo/_base/array",
"alfresco/dialogs/AlfDialog"],
function(declare, Core, lang, CoreXhr, AlfConstants, array, AlfDialog) {
  return declare([Core, CoreXhr], {

    constructor: function tutorial_UserAndGroupService__constructor(args) {
      lang.mixin(this, args);
      this.alfSubscribe("TUTORIAL_CREATE_GROUP", lang.hitch(this, this.createGroup));
      this.alfSubscribe("TUTORIAL_ADD_USER_TO_GROUP", lang.hitch(this, this.addUserToGroup));
      this.alfSubscribe("TUTORIAL_REMOVE_USER_FROM_GROUP", lang.hitch(this, "removeUserFromGroup"));
      this.alfSubscribe("TUTORIAL_GET_GROUPS", lang.hitch(this, "getGroups"));
      this.alfSubscribe("TUTORIAL_DELETE_GROUPS", lang.hitch(this, this.deleteGroups));
    },

    createGroup: function tutorial_UserAndGroupService__createGroup(payload) {
      this.serviceXhr({
        url: AlfConstants.PROXY_URI + "api/rootgroups/" + payload.groupId,
        method: "POST",
        data: {
          displayName: payload.displayName
        },
        successCallback: this.onSuccess,
        callbackScope: this
      });
    },

    addUserToGroup: function tutorial_UserAndGroupService__addUserToGroup(payload) {
      this.serviceXhr({
        url: AlfConstants.PROXY_URI + "api/groups/" + payload.groupId + "/children/" + payload.userName,
        method: "POST",
        data: {
          pubSubScope: payload.pubSubScope
        },
        successCallback: this.onSuccess,
        callbackScope: this
      });
    },

    removeUserFromGroup: function tutorial_UserAndGroupService__removeUserFromGroup(payload) {
      this.serviceXhr({
        url: AlfConstants.PROXY_URI + "api/groups/" + payload.groupId + "/children/" + payload.shortName,
        method: "DELETE",
        data: {
          pubSubScope: payload.pubSubScope
        },
        successCallback: this.onSuccess,
        callbackScope: this
      });
    },

    getGroups: function tutorial_UserAndGroupService__getGroups(payload) {
      var alfTopic = 
        (payload.alfResponseTopic != null) ? payload.alfResponseTopic : "";

      var sortDir = 
        (payload.sortAscending != null && payload.sortAscending === true) ? "asc" : "desc";

      var sortField = 
        (payload.sortField != null) ? payload.sortField : "shortName";

      var pageNo = (payload.page != null) ? payload.page : 1;
      var pageSize = (payload.pageSize != null) ? payload.pageSize: 25;
      var skipCount = (pageNo - 1) * pageSize;

      this.serviceXhr({
        url: AlfConstants.PROXY_URI + "api/groups?dir=" + sortDir + 
             "&sortBy=" + sortField + 
             "&zone=APP.DEFAULT&maxItems=" + pageSize + 
             "&skipCount=" + skipCount,
        method: "GET",
        alfTopic: alfTopic
      });
    },

    deleteGroupsConfirmation: function tutorial_UserAndGroupService__deleteGroupsConfirmation(payload) {
      this.alfUnsubscribe(this._deleteHandle);
      var groupsToDelete = payload.selectedItems;
      if (groupsToDelete != null)
      {
        array.forEach(groupsToDelete, lang.hitch(this, this.deleteGroup));
      }
    },

    deleteGroups: function tutorial_UserAndGroupService__deleteGroups(payload) {
      var responseTopic = this.generateUuid();  //create a single use topic
      this._deleteHandle = this.alfSubscribe(responseTopic, lang.hitch(this, this.deleteGroupsConfirmation));

      var dialog = new AlfDialog({
        generatePubSubScope: false,
        title: "Delete Groups",
        textContent: "Are you sure you want to delete the selected groups?",
        widgetsButtons: [
          {
            name: "alfresco/buttons/AlfButton",
            config: {
              label: "Yes",
              publishTopic: responseTopic,
              publishPayload: lang.clone(payload)
            }
          },
          {
            name: "alfresco/buttons/AlfButton",
            config: {
              label: "No",
              publishTopic: "NOOP"
            }
          }
        ]
      });
      dialog.show();
    },

    deleteGroup: function tutorial_UserAndGroupService__deleteGroup(payload) {
      this.serviceXhr({
        url: AlfConstants.PROXY_URI + "api/groups/" + payload.shortName,
          method: "DELETE",
          data: {
            pubSubScope: payload.pubSubScope
          },
          successCallback: this.onSuccess,
          callbackScope: this
        });
    },

    onSuccess: function tutorial_UserAndGroupService_onSuccess(response, originalRequestConfig) {
      var pubSubScope = lang.getObject("data.pubSubScope", false, originalRequestConfig);
     if (pubSubScope == null)
     {
        pubSubScope = "";
     }
     this.alfPublish(pubSubScope + "ALF_DOCLIST_RELOAD_DATA");
      //on form submission succes publish to 'ALF_DOCLIST_RELOAD_DATA' topic, causing AlfListView to reload data.
      // this.alfPublish("ALF_DOCLIST_RELOAD_DATA", {});
    }
  })
})
