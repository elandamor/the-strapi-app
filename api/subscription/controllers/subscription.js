"use strict";

const paystack = require("paystack-api")(process.env.PAYSTACK_SECRET_KEY);

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  /**
   * Handle Paystack events
   */
  paystack: async ({ request }) => {
    // TODO: Verify paystack signature

    const data = request.body.data;
    const eventType = request.body.event;

    switch (eventType) {
      case "charge.success": {
        const { authorization, customer, plan } = data;

        const {
          data: { subscriptions },
        } = await paystack.customer.get({
          id: customer.customer_code,
        });

        await strapi.services.subscription.completeSubscription({
          authorization,
          customer,
          plan,
          subscription: subscriptions[0],
        });

        break;
      }
    }

    return (request.status = 200);
  },
};
