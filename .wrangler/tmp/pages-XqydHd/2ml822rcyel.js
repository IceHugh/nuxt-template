// <define:__ROUTES__>
var define_ROUTES_default = {
  version: 1,
  include: ["/*"],
  exclude: ["/_fonts/*", "/_nuxt/*", "/_scripts/*", "/favicon.ico", "/robots.txt"],
};

import { isRoutingRuleMatch } from "/Users/icehugh/.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/pages-dev-util.ts";
// ../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/pages-dev-pipeline.ts
import worker from "/Users/icehugh/workspace/nuxt-template/.wrangler/tmp/pages-XqydHd/bundledWorker-0.7658123043886425.mjs";

export * from "/Users/icehugh/workspace/nuxt-template/.wrangler/tmp/pages-XqydHd/bundledWorker-0.7658123043886425.mjs";

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
//# sourceMappingURL=2ml822rcyel.js.map
