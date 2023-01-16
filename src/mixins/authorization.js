//import { mapGetters } from 'vuex';

const ROLES = {
  NONE: 'NONE',
  ANY: 'ANY',
  ADMINISTRADOR: 'ADMINISTRADOR',
  GESTOR: 'GESTOR',
  REQUISITANTE: 'REQUISITANTE'
};

export const authorizationMixin = {
  props: {
    viewRoles: {
      type: [String, Array, Function],
      default: ROLES.ANY
    },
    addRoles: {
      type: [String, Array, Function],
      default: ROLES.ANY
    },
    editRoles: {
      type: [String, Array, Function],
      default: ROLES.ANY
    },
    delRoles: {
      type: [String, Array, Function],
      default: ROLES.ANY
    }
  },
  computed: {
    //s...mapGetters('auth', ['currentRole'])
  },
  methods: {
    canAdd (context) {
      return this.solveRolePolicy(this.addRoles, context);
    },
    canView (context) {
      return this.solveRolePolicy(this.viewRoles, context);
    },
    canEdit (context) {
      return this.solveRolePolicy(this.editRoles, context);
    },
    canDel (context) {
      return this.solveRolePolicy(this.delRoles, context);
    },
    solveRolePolicy (rolePolicy, context) {
      const rawAllowedRoles = (typeof rolePolicy === 'function')
        ? rolePolicy(context)
        : rolePolicy;

      const allowedRoles = Array.isArray(rawAllowedRoles)
        ? rawAllowedRoles
        : [rawAllowedRoles];

      if (allowedRoles.includes(ROLES.NONE)) return false;
      if (allowedRoles.includes(ROLES.ANY)) return true;

      return allowedRoles.includes(this.currentRole);
    }
  }
};
