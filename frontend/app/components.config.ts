import { Injectable, EventEmitter } from '@angular/core';
import { Roles } from './models/enums/roles.enum';
import { IApplication } from './interfaces/application.interface';

@Injectable()
export class ComponentsConfig {
  private static instance: ComponentsConfig;

  private constructor() {}

  public static getInstance(): ComponentsConfig {
    if (!ComponentsConfig.instance) {
      ComponentsConfig.instance = new ComponentsConfig();
    }
    return ComponentsConfig.instance;
  }

  //? Pagina login
  public loginPageConfig: any = {
    loginButton: {
      width: '100%',
      text: 'Redirigiendo…',
      type: 'primary',
      shape: null,
      size: 'large',
      block: true,
      class: 'btn-primary',
    },
    microsoftLoginButton: {
      width: '100%',
      text: 'Continuar con Microsoft',
      type: 'default',
      shape: null,
      size: 'large',
      block: true,
      disabled: true,
      imgUrl: 'assets/svg/microsoft.svg',
      class: 'text-left btn-secondary',
    },
    alternativeLoginButton: {
      width: '100%',
      text: 'Continuar con Nuevo Portal',
      type: 'default',
      shape: null,
      size: 'large',
      block: true,
      disabled: false,
      imgHeight: '17px',
      imgWidth: '17px',
      class: 'text-left btn-secondary',
      imgUrl: 'assets/svg/isotipo-bitsion.svg',
    },
    userInput: {
      inputGroup: {
        input: {
          size: 'default',
          disabled: false,
          placeholder: 'Ingrese su usuario',
          prefix: '',
          type: 'text',
          value: '',
          borderless: false,
          allowClear: false,
          allowVisibility: false,
        },
        icon: {
          theme: '',
          type: 'eye',
        },
      },
      hasFeedback: false,
      validateStatus: 'validating',
      validatingTip: '',
    },
    passwordInput: {
      inputGroup: {
        input: {
          size: 'default',
          disabled: false,
          placeholder: 'Ingrese su contraseña',
          prefix: '',
          type: 'password',
          value: '',
          borderless: false,
          allowClear: false,
          allowVisibility: false,
        },
        icon: {
          theme: '',
          type: 'eye',
        },
      },
      hasFeedback: false,
      validateStatus: 'validating',
      validatingTip: '',
    },
  };

  //? Pagina principial
  public mainPageConfig: any = {
    sidebar: {
      nzMode: 'inline',
      nzTheme: 'light',
      nzInlineCollapsed: false,
      nzMenuItems: [
        {
          index: 1,
          text: 'Home',
          //roles : [Roles.AdminInmobiliaria],
          icon: {
            type: 'home',
            theme: '',
          },
          disabled: false,
          routerLink: 'home',
          nzSelected: false,
        },
        {
          index: 2,
          text: 'Liquidaciones',
          //roles : [Roles.AdminInmobiliaria],
          icon: {
            type: 'file-document',
            theme: '',
          },
          disabled: false,
          routerLink: 'liquidations',
          nzSelected: false,
        },
        /*{
          index: 3,
          text: 'Cuenta Corriente',
          roles : [Roles.AdminInmobiliaria],
          icon: {
            type: 'chart-bar',
            theme: '',
          },
          disabled: false,
          routerLink: 'checking-account',
          nzSelected: false,
        },
        {
          index: 4,
          text: 'Documento extraordinario',
          roles : [Roles.AdminInmobiliaria],
          icon: {
            type: 'file-document-edit',
            theme: 'outline',
          },
          disabled: false,
          routerLink: 'extraordinary-document',
          nzSelected: false,
        },
        {
          index: 5,
          text: 'Registrar pagos',
          roles : [Roles.AdminInmobiliaria],
          icon: {
            type: 'mdi mdi-currency-usd',
            theme: '',
          },
          disabled: false,
          routerLink: 'register-payment',
          nzSelected: false,
        },
        {
          index: 6,
          text: 'Contratos',
          roles : [Roles.AdminInmobiliaria],
          icon: {
            type: 'file-document-edit',
            theme: 'outline',
          },
          disabled: false,
          routerLink: 'contracts/contracts',
          nzSelected: false,
        },
        {
          index: 7,
          text: 'Clientes',
          roles : [Roles.AdminInmobiliaria],
          icon: {
            type: 'account-multiple',
            theme: 'outline',
          },
          disabled: false,
          routerLink: 'people',
          nzSelected: false,
        },
        {
          index: 8,
          text: 'Propiedades',
          roles : [Roles.AdminInmobiliaria],
          icon: {
            type: 'store',
            theme: 'outline',
          },
          disabled: false,
          routerLink: 'properties',
          nzSelected: false,
        },
        {
          index: 9,
          text: 'Reportes',
          roles : [Roles.AdminInmobiliaria],
          icon: {
            type: 'chart-box',
            theme: 'outline',
          },
          disabled: false,
          routerLink: 'reports',
          nzSelected: false,
        },
        {
          index: 10,
          text: 'Home',
          roles : [Roles.SuperAdmin],
          icon: {
            type: 'home',
            theme: 'outline',
          },
          disabled: false,
          routerLink: 'home-admin',
          nzSelected: true,
        },
        {
          index: 11,
          text: 'Inmobiliarias',
          roles : [Roles.SuperAdmin],
          icon: {
            type: 'domain',
            theme: '',
          },
          disabled: false,
          routerLink: 'real-estate',
          nzSelected: true,
        },*/
      ],
    },
    userMenu: {
      name: 'Santiago del Corro',
      icon: {
        type: 'account',
        theme: 'outline',
        fontSize: '25px',
      },
      avatar: {
        nzIcon: '',
        nzSize: 30,
        nzShape: 'circle',
      },
      options: {
        itemClicked: new EventEmitter(),
        nzTrigger: 'click',
        nzPlacement: 'bottomLeft',
        title: '',
        nzIcon: 'down',
        htmlElement: {
          ghost: false,
          shape: 'circle',
          size: 'default',
          type: 'text',
          icon: {
            visible: true,
            iconFont: 'anticon',
            rotate: 0,
            theme: 'outline',
            twoToneColor: '',
            type: 'user',
            color: '#fff',
          },
        },
        list: {
          nzMode: 'inline',
          nzTheme: 'light',
          nzInlineCollapsed: false,
          nzMenuItems: [
            {
              text: 'Ver mi perfil',
              icon: {
                theme: '',
                type: 'account',
              },
              event: 'APM_VIEW_PROFILE',
            },
            {
              text: 'Cambiar mi contraseña',
              icon: {
                theme: '',
                type: 'lock',
              },
              event: 'APM_CHANGE_PASSWORD',
            },
            {
              icon: {
                theme: '',
                type: 'logout',
              },
              text: 'Cerrar sesión',
              event: 'APM_LOGOUT',
            },
          ],
        },
      },
    },
  };

  public tucarpeta: IApplication = {
    components: {
      sidebar: {
        dropDownMenu: {
          itemClicked: new EventEmitter(),
          nzTrigger: 'click',
          nzPlacement: 'bottomLeft',
          title: '',
          nzIcon: 'menu',
          htmlElement: {
            text: 'Nuevo',
            class: 'btn-primary',
            borderRadius: '10%',
            shape: null,
            size: 'large',
            width: '170px',
            type: 'primary',
            icon: {
              visible: true,
              iconFont: 'anticon',
              rotate: 0,
              theme: 'outline',
              twoToneColor: '',
              type: 'plus',
            },
            badge: undefined,
          },
          list: {
            nzMode: 'inline',
            nzTheme: 'light',
            nzInlineCollapsed: false,
            nzMenuItems: [
              {
                text: 'Liquidación',
                icon: {
                  theme: '',
                  type: 'file-document',
                },
                event: 'APM_LIQUIDATION_CREATE',
              },
              {
                text: 'Cobranza',
                icon: {
                  theme: '',
                  type: 'mdi mdi-currency-usd',
                },
                event: 'APM_REGISTERPAYMENT_CREATE',
              },
              {
                text: 'Transferencia',
                icon: {
                  theme: '',
                  type: 'cash-sync',
                },
                event: 'APM_REGISTERPAYMENTTRANSFER_CREATE',
              },
            ],
          },
        },
        userMenuParams: {
          name: 'User Test',
          company: 'Empresa 232',
          title:'',
          subTitle: '',
          icon: {
            type: 'account',
            theme: 'outline',
            fontSize: '25px',
          },
          avatar: {
            nzSize: 30,
            nzShape: 'circle',
          },
          options: {
            itemClicked: new EventEmitter(),
            nzTrigger: 'click',
            nzPlacement: 'bottomLeft',
            nzIcon: 'down',
            htmlElement: {
              ghost: false,
              shape: 'circle',
              size: 'default',
              type: 'text',
              icon: {
                visible: true,
                iconFont: 'anticon',
                rotate: 0,
                theme: 'outline',
                twoToneColor: '',
                type: 'user',
              },
            },
            list: {
              nzMode: 'inline',
              nzTheme: 'light',
              nzInlineCollapsed: false,
              nzMenuItems: [
                /*{
                  text: 'Ver mi perfil',
                  icon: {
                    theme: '',
                    type: 'account',
                  },
                  event: 'APM_VIEW_PROFILE',
                },*/
                {
                  icon: {
                    theme: '',
                    type: 'logout',
                  },
                  text: 'Cerrar sesión',
                  event: 'APM_LOGOUT',
                },
              ],
            },
          },
        },
        menuParams: {
          nzMode: 'inline',
          nzTheme: 'light',
          nzInlineCollapsed: false,
          nzMenuItems: [
            {
              index: 1,
              text: 'Home',
              //roles : '',
              icon: {
                type: 'home',
                theme: 'outline',
              },
              disabled: false,
              routerLink: 'home',
              nzSelected: false,
            },
            {
              index: 2,
              text: 'Liquidaciones',
              // roles: ['empleado', 'empleador', 'contador'],
              icon: {
                type: 'file-document',
                theme: '',
              },
              disabled: false,
              routerLink: 'liquidations',
              nzSelected: true,
            },
            {
              index: 3,
              text: 'Cobranzas',
             // roles : [Roles.AdminInmobiliaria],
              icon: {
                type: 'mdi mdi-currency-usd',
                theme: '',
              },
              disabled: false,
              routerLink: 'payments',
              nzSelected: false,
              visible: true
            },
            {
              index: 4,
              text: 'Transferencias',
             // roles : [Roles.AdminInmobiliaria],
              icon: {
                type: 'cash-sync',
                theme: '',
              },
              disabled: false,
              routerLink: 'transfers',
              nzSelected: false,
              visible: true
            },
            {
              index: 5,
              text: 'Cotitulares',
             // roles : [Roles.AdminInmobiliaria],
              icon: {
                type: 'account-multiple',
                theme: '',
              },
              disabled: false,
              routerLink: 'co-owners',
              nzSelected: false,
              visible: true
            },
            {
              index: 6,
              text: 'Reportes',
            // roles : [Roles.AdminInmobiliaria],
              icon: {
                type: 'chart-box',
                theme: 'outline',
              },
              disabled: false,
              routerLink: 'reports',
              nzSelected: false,
            },
          ],
          nzMenuSub: [
            {
              text: 'Registros',
              roles: [Roles.Developer],
              disabled: false,
              icon: {
                type: 'file-text',
                theme: '',
              },
              menuItem: [
                {
                  index: 7,
                  text: 'Compañías',
                  icon: {
                    type: 'domain',
                    theme: '',
                  },
                  disabled: false,
                  routerLink: 'companies',
                  nzSelected: true,
                },
                {
                  index: 8,
                  text: 'Roles',
                  icon: {
                    type: 'account-cog',
                    theme: 'outline',
                  },
                  disabled: false,
                  routerLink: 'roles',
                  nzSelected: true,
                },
                {
                  index: 9,
                  text: 'Usuarios',
                  icon: {
                    type: 'account-multiple',
                    theme: 'outline',
                  },
                  disabled: false,
                  routerLink: 'users',
                  nzSelected: true,
                },
                {
                  index: 10,
                  text: 'Settings',
                  icon: {
                    type: 'cog',
                    theme: '',
                  },
                  disabled: false,
                  routerLink: 'settings',
                  nzSelected: true,
                },
                {
                  index: 11,
                  text: 'Templates',
                  icon: {
                    type: 'application',
                    theme: '',
                  },
                  disabled: false,
                  routerLink: 'templates',
                  nzSelected: true,
                },
                {
                  index: 12,
                  text: 'Tipos de documento',
                  icon: {
                    type: 'file',
                    theme: '',
                  },
                  disabled: false,
                  routerLink: 'document-types',
                  nzSelected: true,
                }
              ],
            }
          ],
        },
      },
    },
  };

   //?Home page config
   public homePageConfig: any = {
    empty: {
      nzNotFoundImage: 'assets/svg/tray_vector.svg',
      description: {
        url: '',
        urlText: '',
        text: 'Aún no tienes cobros registrados.'
      },
    }
  };

   // users page config
   public usersPageConfig: any = {
    pageTitle: 'Usuarios',
    pageSubtitle: '',
    createUser: {
      shape: null,
      size: 'default',
      text: 'Nuevo usuario',
      type: 'primary',
      disabled: false,
      class: 'border-button',
      icon: {
        visible: true,
        type: 'plus',
        theme: 'outline',
        iconFont: '',
        twoToneColor: '',
        rotate: 0,
      },
    },
    breadCrumb:{
      icon: {
        type: 'account-multiple',
        theme: 'outline',
      },
      items: [
        {
          label: 'Usuarios',
          link: '/main/users',
          params: '',
        },
      ],
    },
    tableUsers: {
      empty: {
        nzNotFoundImage: 'assets/svg/tray_vector.svg',
        description: {
          url: '',
          urlText: '',
          text: 'No se encontraron registros.',
        },
      },
      dropdownParams: {
        itemClicked: new EventEmitter(),
        nzTrigger: 'click',
        nzPlacement: 'bottomLeft',
        title: '',
        nzIcon: 'menu',
        htmlElement: {
          class: 'more-icon',
          text: '',
          borderRadius: '2px',
          shape: null,
          size: 'default',
          type: 'text',
          icon: {
            visible: true,
            type: 'more',
            theme: 'outline',
            iconFont: '',
            rotate: 0,
            twoToneColor: '',
          },
          badge: undefined,
        },
        list: {
          nzMode: 'inline',
          nzTheme: 'light',
          nzInlineCollapsed: false,
          nzMenuItems: [
            {
              text: 'Modificar',
              icon: {
                theme: '',
                type: 'pencil',
              },
              event: 'VIEW_USER',
            },
          ],
        },
      },
    }
  };

    //? modal alta usuarios
    public postUserModalConfig: any = {
      title: 'Crear usuario',
      name: {
        inputGroup: {
          input: {
            size: 'default',
            disabled: false,
            placeholder: 'Nombre',
            suffix: '',
            type: 'text',
            value: '',
            borderless: false,
            allowClear: false,
            allowVisibility: false,
            borderRadius: '10px'
          },
          icon: {
            theme: '',
            type: 'eye',
          },
        },
        hasFeedback: false,
        validateStatus: 'validating',
        validatingTip: '',
        errorTip: 'Dato no válido',
        pattern:/^[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,°.'\-!@#$%^&*()_+={}\[\]:;"<>?|~`\\/]{1,50}$/u
      },
      lastName: {
        inputGroup: {
          input: {
            size: 'default',
            disabled: false,
            placeholder: 'Apellido',
            suffix: '',
            type: 'text',
            value: '',
            borderless: false,
            allowClear: false,
            allowVisibility: false,
            borderRadius: '10px'
          },
          icon: {
            theme: '',
            type: 'eye',
          },
        },
        hasFeedback: false,
        validateStatus: 'validating',
        validatingTip: '',
        errorTip: 'Dato no válido',
        pattern:/^[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,°.'\-!@#$%^&*()_+={}\[\]:;"<>?|~`\\/]{1,50}$/u
      },
      cuil: {
        inputGroup: {
          input: {
            size: 'default',
            disabled: false,
            placeholder: 'Número',
            suffix: '',
            type: 'text',
            value: '',
            borderless: false,
            allowClear: false,
            allowVisibility: false,
            borderRadius: '10px'
          },
          icon: {
            theme: '',
            type: 'eye',
          },
        },
        hasFeedback: false,
        validateStatus: 'validating',
        validatingTip: '',
        errorTip: 'CUIT/CUIL no válido',
          pattern: /^\d{11,11}$/g,
      },
      email: {
        inputGroup: {
          input: {
            size: 'default',
            disabled: false,
            placeholder: 'Email',
            type: 'text',
            value: '',
            borderless: false,
            allowClear: false,
            allowVisibility: false,
            borderRadius: '10px'
          },
          icon: {
            theme: '',
            type: 'eye',
          },
        },
        hasFeedback: false,
        validateStatus: 'validating',
        validatingTip: '',
        errorTip: 'Email no válido',
        pattern: /^[a-zA-Z0-9._-]{1,64}@[a-zA-Z0-9]{1,255}\.[a-zA-Z.]{2,8}$/,
      },
      role: {
        id: '',
        options: [],
        allowClear: false,
        placeholder: 'Seleccionar',
        showSearch: false,
        disabled: false,
        listOfSelectedValue: [],
        optionGroup: [],
        width: '100%',
        borderless: false,
        borderRadius: true
      },
      company: {
        id: '',
        options: [],
        allowClear: false,
        placeholder: 'Compañía',
        showSearch: false,
        listOfSelectedValue: [],
        optionGroup: [],
        width: '100%',
        disabled : false,
        borderless: false,
        borderRadius: true
      },
      cancel: {
        shape: null,
        size: 'default',
        text: 'Cancelar',
        type: 'default',
        width: '100%',
        disabled: false,
        class: 'border-button'
      },
      postUser: {
        shape: null,
        size: 'default',
        text: 'Crear usuario',
        type: 'primary',
        width: '100%',
        disabled: true,
        class: 'border-button'
      },
    };
  
    //? modal modificacion usuarios
     public updateUserModalConfig: any = {
      title: 'Modificar usuario',
      name: {
        inputGroup: {
          input: {
            size: 'default',
            disabled: true,
            placeholder: 'Nombre',
            suffix: '',
            type: 'text',
            value: '',
            borderless: false,
            allowClear: false,
            allowVisibility: false,
            borderRadius: '10px'
          },
          icon: {
            theme: '',
            type: 'eye',
          },
        },
        hasFeedback: false,
        validateStatus: 'validating',
        validatingTip: '',
        errorTip: 'Dato no válido',
        pattern:/^[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,°.'\-!@#$%^&*()_+={}\[\]:;"<>?|~`\\/]{1,50}$/u
      },
      cuil: {
        inputGroup: {
          input: {
            size: 'default',
            disabled: true,
            placeholder: 'Número',
            suffix: '',
            type: 'text',
            value: '',
            borderless: false,
            allowClear: false,
            allowVisibility: false,
            borderRadius: '10px'
          },
          icon: {
            theme: '',
            type: 'eye',
          },
        },
        hasFeedback: false,
        validateStatus: 'validating',
        validatingTip: '',
        errorTip: 'CUIT/CUIL no válido',
          pattern: /^\d{11,11}$/g,
      },
      role: {
        id: '',
        options: [],
        allowClear: false,
        placeholder: 'Seleccionar',
        showSearch: false,
        disabled: false,
        listOfSelectedValue: [],
        optionGroup: [],
        width: '100%',
        borderless: false,
        borderRadius: true
      },
      company: {
        id: '',
        options: [],
        allowClear: false,
        placeholder: 'Compañía',
        showSearch: false,
        listOfSelectedValue: [],
        optionGroup: [],
        width: '100%',
        disabled : false,
        borderless: false,
        borderRadius: true
      },
      cancel: {
        shape: null,
        size: 'default',
        text: 'Cancelar',
        type: 'default',
        width: '100%',
        disabled: false,
        class: 'border-button'
      },
      updateUser: {
        shape: null,
        size: 'default',
        text: 'Modificar',
        type: 'primary',
        width: '100%',
        disabled: true,
        class: 'border-button'
      },
    };
  
}
