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
          all: true,
          warn: true,
          error: true
          // filter: "tutorial/HelloWorld(.*)"
        }
      }
    }
  ],
  widgets:[
    {
      name: "alfresco/layout/HorizontalWidgets",
      config: {
        widgetMarginLeft: "10",
        widgetMarginRight: "10",
        widgets: [
          {
            name: "alfresco/layout/ClassicWindow",
            config: {
              title: "Groups",
              additionalCssClasses: "no-margin",
              widgets: [
                {
                  name: "alfresco/layout/TitleDescriptionAndContent",
                  config: {
                    title: "Manage Groups",
                    description: "Creat, edit and delete groups. ",
                    widgets: [ //fold here
                      {
                        name: "alfresco/layout/LeftAndRight",
                        config: {
                          widgets: [
                            {
                              name: "alfresco/menus/AlfMenuBar",
                              align: "left",
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
                                ]
                              }
                            },
                            {
                              name: "alfresco/menus/AlfMenuBar",
                              align: "right",
                              config: {
                                widgets: [
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
                            }
                          ]
                        }
                      },
                      {
                        name: "alfresco/menus/AlfMenuBar",
                        config: {
                            widgets: [
                              
                            ]
                        }//AlfMenuBar
                      },
                      { //AlfSortablePaginatedList
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
                        }//paginator
                      }
                    ]
                  }
                } //Manage groups
              ]
            }
          },
          {
            name: "alfresco/layout/ClassicWindow",
            config: {
              title: "Users",
              additionalCssClasses: "no-margin",
              widgets: [
                {
                  name: "alfresco/layout/TitleDescriptionAndContent",
                  config: {
                    title: "Manage Users",
                    description: "Creat, edit and delete users. ",
                    widgets: [
                      {
                        name: "alfresco/menus/AlfMenuBar",
                        config: {
                          widgets: [
                            {
                              name: "alfresco/menus/AlfMenuBar",
                              config: {
                                widgets: [
                                //userName
                                //firstName
                                //lastName
                                //email
                                //password
                                {                                 
                                  name: "alfresco/menus/AlfMenuBarItem",
                                  config: {
                                    label: "Create New User",
                                    publishTopic: "ALF_CREATE_FORM_DIALOG_REQUEST",
                                    publishPayload: {
                                      dialogTitle: "Create User",
                                      dialogConfirmationButtonTitle: "Save",
                                      dialogCancellationButtonTitle: "Cancel",
                                      formSubmissionTopic: "ALF_CRUD_CREATE",
                                      formSubmissionPayloadMixin: {
                                        url: "api/people",
                                        pubSubScope: "TUTORIAL_USER_MANAGEMENT_"
                                      },
                                      fixedWidth: true,
                                      widgets: [
                                        {
                                          name: "alfresco/forms/controls/TextBox",
                                          config: {
                                            fieldId: "USERNAME",
                                            label: "Username",
                                            name: "userName",
                                            description: "Enter a unique Identifier for the user. Only alphanumeric values.",
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
                                            fieldId: "FIRSTNAME",
                                            label: "First Name",
                                            name: "firstName",
                                            description: "Enter a username.",
                                            requirementConfig: {
                                              initialValue: true
                                            },
                                            validationConfig: [
                                              {
                                                validation: "regex",
                                                regex: "^[A-Za-z]+$",
                                                errorMessage: "Alphabetic Characters Only."
                                              }
                                            ]
                                          }
                                        },
                                        {
                                          name: "alfresco/forms/controls/TextBox",
                                          config: {
                                            fieldId: "LASTNAME",
                                            label: "Last Name",
                                            name: "lastName",
                                            description: "Enter your last name."
                                          }
                                        },
                                        {
                                          name: "alfresco/forms/controls/TextBox",
                                          config: {
                                            fieldId: "EMAIL",
                                            label: "Email Address",
                                            name: "email",
                                            description: "Enter your email address",
                                            requirementConfig: {
                                              initialValue: true
                                            },
                                            validationConfig: [
                                              {
                                                validation: "regex",
                                                regex: "^([0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-w]*[0-9a-zA-Z].)+[a-zA-Z]{2,9})$",
                                                errorMessage: "Valid E-mail Address Required."
                                              }
                                            ]
                                          }
                                        },
                                        {
                                          name: "alfresco/forms/controls/Password",
                                          config: {
                                            fieldId: "PASSWORD",
                                            label: "Password",
                                            name: "password",
                                            requirementConfig: {
                                              initialValue: true
                                            },
                                          }
                                        },
                                        {
                                          name: "alfresco/forms/controls/Password",
                                          config: {
                                            fieldId: "CONFIRM_PASSWORD",
                                            label: "Confirm Password",
                                            name: "confirmPassword",
                                            confirmationTargetId: "PASSWORD",
                                            confirmationErrorMessage: "Passwords must match!",
                                            requirementConfig: {
                                              initialValue: true
                                            },
                                          }
                                        }
                                      ]
                                    }
                                  }
                                }
                                ]
                              }
                            }
                          ]
                        }
                      },
                      {
                        name: "alfresco/lists/AlfList",
                        config: {
                          loadDataPublishTopic: "ALF_CRUD_GET_ALL",
                          loadDataPublishPayload: {
                            url: "api/people?filter="
                          },
                          pubSubScope: "TUTORIAL_USER_MANAGEMENT_", //all widgets will now inherit this scope.
                          itemsProperty: "people",
                          widgets: [
                            {
                              name: "alfresco/lists/views/AlfListView",
                              config: {
                                widgetsForHeader: [ //HEADER WIDGETS
                                  {
                                    name: "alfresco/lists/views/layouts/HeaderCell",
                                    config: {
                                      label: "Username",
                                    }
                                  },
                                  {
                                    name: "alfresco/lists/views/layouts/HeaderCell",
                                    config: {
                                      label: "First Name",
                                    }
                                  },
                                  {
                                    name: "alfresco/lists/views/layouts/HeaderCell",
                                    config: {
                                      label: "Last Name"
                                    }
                                  },
                                  {
                                    name: "alfresco/lists/views/layouts/HeaderCell",
                                    config: {
                                      label: "Action"
                                    }
                                  }
                                ],
                                additionalCssClasses: "bordered",
                                widgets: [
                                  {
                                    name: "alfresco/lists/views/layouts/Row",
                                    config: {
                                      widgets: [
                                        {
                                          name: "alfresco/lists/views/layouts/Cell",
                                          config:
                                          {//
                                            additionalCssClasses: "mediumpad",
                                            widgets: [
                                              {
                                                name: "alfresco/renderers/Property",
                                                config: {
                                                  propertyToRender: "userName"
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
                                            widgets: [
                                              {
                                                name: "alfresco/renderers/Property",
                                                config: {
                                                  propertyToRender: "firstName"
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
                                            widgets: [
                                              {
                                                name: "alfresco/renderers/Property",
                                                config: {
                                                  propertyToRender: "lastName"
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
                                                name: "alfresco/renderers/PublishAction",
                                                config: 
                                                {
                                                  additionalCssClasses: "mediumpad",
                                                  iconClass: "delete-16",
                                                  publishTopic: "ALF_CRUD_DELETE",
                                                  publishPayloadType: "PROCESS",
                                                  publishPayloadModifiers: ["processCurrentItemTokens"],
                                                  publishPayload: {
                                                    url: "api/people/{userName}",
                                                    requiresConfirmation: true,
                                                    confirmationTitle: "Delete {userName}?",
                                                    confirmationPrompt: "Are you sure you want to delete {userName}?",
                                                    pubSubScope: "TUTORIAL_USER_MANAGEMENT_"
                                                  },
                                                  publishPayloadItemMixin: true
                                                  // publishGlobal: true
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
                  }
                }
              ]
            }//WORKING HERE
          }
        ]
      }
    },
    {
      name: "alfresco/logging/SubscriptionLog"
    }
  ]
};
