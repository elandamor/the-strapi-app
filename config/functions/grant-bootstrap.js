const _ = require("lodash");

const grantConfigOverrides = {
  google: {
    scope: ["email", "profile"],
  },
};

module.exports = {
  initWithOverrides: async () => {
    const pluginStore = strapi.store({
      environment: "",
      type: "plugin",
      name: "users-permissions",
    });

    let grantConfig = (await pluginStore.get({ key: "grant" })) || {};

    if (!_.isEmpty(grantConfig)) {
      grantConfig = _.merge(grantConfig, grantConfigOverrides);

      await pluginStore.set({ key: "grant", value: grantConfig });
    }
  },
};
