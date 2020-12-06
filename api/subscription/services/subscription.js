"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
  /**
   * Fulfill a subscription order in the database
   */
  completeSubscription: async ({
    authorization,
    customer,
    plan,
    subscription,
  }) => {
    /**
     * Create a subscription record in the database
     * @param {string} id Salon
     */
    const createSubscription = async (id) => {
      const payload = {
        authorizationCode: authorization.authorization_code,
        name: plan.name,
        paystackId: subscription.subscription_code,
        paystackToken: subscription.email_token,
        subscriber: id,
      };

      return await strapi.query("subscription").create(payload);
    };

    const user = await strapi
      .query("user", "users-permissions")
      .findOne({ email: customer.email });

    const userId = user && user.id;

    try {
      await createSubscription(userId);
      return "ok";
    } catch (error) {
      console.log({ error });
      return null;
    }
  },
};
