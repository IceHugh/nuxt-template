// <define:__ROUTES__>
var define_ROUTES_default = {
  version: 1,
  include: ["/*"],
  exclude: ["/_fonts/*", "/_nuxt/*", "/_scripts/*", "/favicon.ico", "/robots.txt"],
};

import { isRoutingRuleMatch } from "/Users/icehugh/.bun/install/global/node_modules/wrangler/templates/pages-dev-util.ts";
// ../../.bun/install/global/node_modules/wrangler/templates/pages-dev-pipeline.ts
import worker from "/Users/icehugh/workspace/nuxt-template/.wrangler/tmp/pages-VhBbAH/bundledWorker-0.3358652606799011.mjs";

export * from "/Users/icehugh/workspace/nuxt-template/.wrangler/tmp/pages-VhBbAH/bundledWorker-0.3358652606799011.mjs";

var routes = define_ROUTES_default;
var pages_dev_pipeline_default = {
  fetch(request, env, context) {
    const { pathname } = new URL(request.url);
    for (const exclude of routes.exclude) {
      if (isRoutingRuleMatch(pathname, exclude)) {
        return env.ASSETS.fetch(request);
      }
    }
    for (const include of routes.include) {
      if (isRoutingRuleMatch(pathname, include)) {
        const workerAsHandler = worker;
        if (workerAsHandler.fetch === void 0) {
          throw new TypeError("Entry point missing `fetch` handler");
        }
        return workerAsHandler.fetch(request, env, context);
      }
    }
    return env.ASSETS.fetch(request);
  },
};
export { pages_dev_pipeline_default as default };
//# sourceMappingURL=kmskmcy3fu.js.map
