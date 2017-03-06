var options = [];
var result = remote.call("/api/people?filter=");
if(result.status.code == status.STATUS_OK)
{
  var rawData = JSON.parse(result);
  if (rawData && rawData.people)
  {
    var people = rawData.people;
    for (var i=0; i<people.length; i++)
    {
      options.push({
        value: people[i].userName,
        label: people[i].firstName + " " + people[i].lastName
      });
    }  
  }
}

model.jsonModel = {
  services: [
    "alfresco/services/CrudService",
    "alfresco/services/DialogService",
    "tutorial/UserAndGroupService",
    "alfresco/services/OptionsService",
    {
      name: "alfresco/services/LoggingService",
      config: {
        loggingPreferences: {
          enabled: true,
          all: false,
          warn: true,
          error: true
          // filter: "tutorial/HelloWorld(.*)"
        }
      }
    }
  ],
  widgets:[
    {
      name: "alfresco/menus/AlfMenuBar",
      config: {
          widgets: [
            {
              name: "alfresco/documentlibrary/AlfSelectDocumentListItems"
            },
            {
              name: "alfresco/menus/AlfMenuBarItem",
              config: {
                label: "Create New Group",
                publishTopic: "ALF_CREATE_FORM_DIALOG_REQUEST",
                publishPayload: {
                  dialogTitle: "Create Group",
                  dialogConfirmationButtonTitle: "Create",
                  dialogCancellationButtonTitle: "Cancel",
                  formSubmissionTopic: "TUTORIAL_CREATE_GROUP",
                  fixedWidth: true,
                  widgets: [
                    {
                      name: "alfresco/forms/controls/TextBox",
                      config: {
                        fieldId: "ID",
                        label: "Identifier",
                        name: "groupId",
                        description: "Enter a unique Identifier for teh group. Only alphanumeric values.",
                        requirementConfig: {
                          initialValue: true
                        },
                        validationConfig: [
                          {
                            validation: "regex",
                            regex:"^[A-Za-z0-9]+$",
                            errorMessage: "alphanumeric values only"
                          }
                        ]
                      }
                    },
                    {
                      name: "alfresco/forms/controls/TextBox",
                      config: {
                        fieldId: "DISPLAYNAME",
                        label: "Display Name",
                        name: "displayName"
                      }
                    }
                  ]
                }
              }
            },
            {
               name: "alfresco/documentlibrary/AlfSelectedItemsMenuBarPopup",
               config: {
                  passive: false,
                  itemKeyProperty: "shortName",
                  label: "Selected items...",
                  widgets: [
                     {
                        name: "alfresco/menus/AlfMenuGroup",
                        config: {
                           widgets: [
                              {
                                 name: "alfresco/menus/AlfSelectedItemsMenuItem",
                                 config: {
                                    label: "Delete",
                                    iconClass: "alf-delete-icon",
                                    clearSelectedItemsOnClick: true,
                                    publishTopic: "TUTORIAL_DELETE_GROUPS"
                                 }
                              }
                           ]
                        }
                     }
                  ]
               }
            },
            {
               name: "alfresco/menus/AlfMenuBarToggle",
               config: {
                  subscriptionTopic: "ALF_DOCLIST_SORT",
                  subscriptionAttribute: "direction",
                  checkedValue: "ascending",
                  checked: true,
                  onConfig: {
                     title: "Change sort order to descending",
                     iconClass: "alf-sort-ascending-icon",
                     iconAltText: "Sorted ascending",
                     publishTopic: "ALF_DOCLIST_SORT",
                     publishPayload: {
                        direction: "ascending"
                     }
                  },
                  offConfig: {
                     title: "Change sort order to ascending",
                     iconClass: "alf-sort-descending-icon",
                     iconAltText: "Sorted descending",
                     publishTopic: "ALF_DOCLIST_SORT",
                     publishPayload: {
                        direction: "descending"
                     }
                  }
               }
            },
            {
               name: "alfresco/menus/AlfMenuBarSelect",
               config: {
                  title: "Sort By",
                  selectionTopic: "ALF_DOCLIST_SORT",
                  widgets: [
                     {
                        name: "alfresco/menus/AlfMenuGroup",
                        config: {
                           widgets: [
                              {
                                 name: "alfresco/menus/AlfCheckableMenuItem",
                                 config: {
                                    label: "Identifier",
                                    title: "Sort By Group Identifier",
                                    value: "shortName",
                                    group: "GROUP_SORT_FIELDS",
                                    publishTopic: "ALF_DOCLIST_SORT",
                                    checked: true,
                                    publishPayload: {
                                       label: "Identifier",
                                       direction: "ascending",
                                       sortable: true
                                    }
                                 }
                              },
                              {
                                 name: "alfresco/menus/AlfCheckableMenuItem",
                                 config: {
                                    label: "Display Name",
                                    title: "Sort By Display Name",
                                    value: "displayName",
                                    group: "GROUP_SORT_FIELDS",
                                    publishTopic: "ALF_DOCLIST_SORT_FIELD_SELECTION",
                                    checked: false,
                                    publishPayload: {
                                       label: "Display Name",
                                       direction: "ascending",
                                       sortable: true
                                    }
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
    },
    {
      name: "alfresco/lists/AlfSortablePaginatedList",
      config: {
        loadDataPublishTopic: "TUTORIAL_GET_GROUPS",
        // loadDataPublishPayload: {
        //   url: "api/groups?sortBy=displayName&zone=APP.DEFAULT"
        // },
        itemsProperty: "data",
        sortField: "shortName",
        currentPageSize: 5,
        startIndexProperty: "paging.skipCount",
        totalResultsProperty: "paging.totalItems",
        widgets: [
          {
            name: "alfresco/lists/views/AlfListView",
            config: {
              widgetsForHeader: [ //HEADER WIDGETS
                {
                  name: "alfresco/lists/views/layouts/HeaderCell",
                  config: {
                    label: ""
                  }
                },
                {
                  name: "alfresco/lists/views/layouts/HeaderCell",
                  config: {
                    label: "Group Identifier",
                    sortable: true,
                    sortValue: "displayName"
                  }
                },
                {
                  name: "alfresco/lists/views/layouts/HeaderCell",
                  config: {
                    label: "Display Name",
                    sortable: true,
                    sortValue: "displayName"
                  }
                },
                {
                  name: "alfresco/lists/views/layouts/HeaderCell",
                  config: {
                    label: "Actions"
                  }
                }
              ],
              additionalCssClasses: "bordered", //HEADER STYLING
              widgets: [ //widgets used for rendering returned items. 
                {
                  name: "alfresco/lists/views/layouts/Row",
                  config: {
                    widgets: [
                      {
                        name: "alfresco/lists/views/layouts/Row",
                        config: {
                          widgets: [
                            {
                              name: "alfresco/lists/views/layouts/Cell",
                              config: {
                                additionalCssClasses: "mediumpad",
                                widgets: [
                                  {
                                    name: "alfresco/renderers/Selector"
                                  }
                                ]
                              }
                            }
                          ]
                        }
                      },
                      {
                        name: "alfresco/lists/views/layouts/Cell",
                        config: {
                          additionalCssClasses: "mediumpad",
                          widgets: [
                            {
                              name: "alfresco/renderers/PropertyLink",
                              config: 
                              {
                                propertyToRender: "shortName",
                                useCurrentItemAsPayload: false,
                                publishTopic: "ALF_CREATE_DIALOG_REQUEST",
                                publishPayloadType: "PROCESS",
                                publishPayloadModifiers: ["processCurrentItemTokens"],
                                publishPayload: 
                                {
                                  dialogTitle: "{displayName}",
                                  fixedWidth: true,
                                  widgetsContent: [ //What to do when clicking on a item/row
                                    {
                                      name: "alfresco/forms/Form",
                                      config: 
                                      {
                                        okButtonLabel: "Add User",
                                        okButtonPublishTopic: "TUTORIAL_ADD_USER_TO_GROUP",
                                        okButtonPublishPayload: 
                                        {
                                          groupId: "{shortName}",
                                          pubSubScope: "GROUP_USERS_"
                                        },
                                        okButtonPublishGlobal: true,
                                        showCancelButton: false,
                                        widgets: 
                                        [
                                          {
                                            name: "alfresco/forms/controls/Select",
                                            config: 
                                            {
                                              label: "User",
                                              description: "Select user to add to group.",
                                              name: "userName",
                                              optionsConfig: {
                                                fixed: options
                                                // publishTopic: "ALF_GET_FORM_CONTROL_OPTIONS",
                                                // publishPayload: {
                                                //   url: url.context + "/proxy/alfresco/api/people?filter=",
                                                //   itemsAttribute: "people",
                                                //   labelAttribute: "userName",
                                                //   valueAttribute: "userName"
                                                // }
                                              } 
                                            }
                                          }
                                        ]
                                      }
                                    },
                                    {
                                      name: "alfresco/lists/AlfList",
                                      config: {
                                        pubSubScope: "GROUP_USERS_",
                                        waitForPageWidgets: false,
                                        // generatePubSubScope: true,
                                        loadDataPublishTopic: "ALF_CRUD_GET_ALL",
                                        loadDataPublishPayload: {
                                          url: "api/groups/{shortName}/children?sortBy=displayName&maxItems=50&skipCount=0"
                                        },
                                        itemsProperty: "data",
                                        widgets: [
                                          {
                                            name: "alfresco/documentlibrary/views/AlfDocumentListView",
                                            config: {
                                              widgets: [
                                                {
                                                  name: "alfresco/lists/views/layouts/Row",
                                                  config: {
                                                    widgets: [
                                                      {
                                                        name: "alfresco/lists/views/layouts/Cell", //USERS LIST
                                                        config: {
                                                          additionalCssClasses: "mediumpad",
                                                          widgets: [
                                                            {
                                                              name: "alfresco/renderers/Property",
                                                              config: {
                                                                propertyToRender: "displayName"
                                                              }
                                                            },
                                                            {
                                                              name: "alfresco/renderers/PublishAction",
                                                              config: 
                                                              {
                                                                iconClass: "delete-16",
                                                                publishTopic: "TUTORIAL_REMOVE_USER_FROM_GROUP",
                                                                publishPayload: {
                                                                  pubSubScope: "GROUP_USERS_",
                                                                  groupId: "{shortName}"
                                                                },
                                                                publishPayloadItemMixin: true,
                                                                publishGlobal: true
                                                              }
                                                            }

                                                          ]
                                                        }
                                                      },
                                                      {
                                                        name: "alfresco/lists/views/layouts/Cell",
                                                        config: 
                                                        {
                                                          additionalCssClasses: "mediumpad",
                                                          widgets: 
                                                          [

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
                                }
                              }
                            }
                          ]
                        }
                      },
                      {
                        name: "alfresco/lists/views/layouts/Cell",
                        config: 
                        {
                          additionalCssClasses: "mediumpad",
                          widgets: 
                          [
                            {
                              name: "alfresco/renderers/InlineEditProperty",
                              config: 
                              {
                                propertyToRender: "displayName",
                                refreshCurrentItem: true,
                                requirementConfig: 
                                {
                                  initialValue: true
                                },
                                publishTopic: "ALF_CRUD_DELETE",
                                publishPayloadType: "PROCESS",
                                publishPayloadModifiers: ["processCurrentItemTokens"],
                                publishPayloadItemMixin: false,
                                publishPayload: {
                                  url: "api/groups/{shortName}",
                                  noRefresh: true
                                }
                              }
                            }
                          ]
                        }
                      },
                      {
                         name: "alfresco/lists/views/layouts/Cell", //GROUPS
                         config: {
                          additionalCssClasses: "mediumpad",
                            widgets: [
                               {
                                  name: "alfresco/renderers/PublishAction",
                                  config: {
                                      iconClass: "delete-16",
                                      publishTopic: "ALF_CRUD_DELETE",
                                      publishPayloadType: "PROCESS",
                                      publishPayloadModifiers: ["processCurrentItemTokens"],
                                      publishPayload: {
                                         url: "api/groups/{shortName}",
                                         requiresConfirmation: true,
                                         confirmationTitle: "Delete {displayName}?",
                                         confirmationPrompt: "Are you sure you want to delete {displayName}?"
                                      },
                                      publishGlobal: true

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
    },
    {
      name: "alfresco/lists/Paginator",
      config: {
        documentsPerPage: 5,
        pageSizes: [5,10,20]
      }
    }
  ]
};
