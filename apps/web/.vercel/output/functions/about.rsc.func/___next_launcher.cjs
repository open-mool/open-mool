"use strict";

// src/vercel-request-context.ts
var SYMBOL_FOR_REQ_CONTEXT = Symbol.for("@vercel/request-context");
function getContext() {
  const fromSymbol = globalThis;
  return fromSymbol[SYMBOL_FOR_REQ_CONTEXT]?.get?.() ?? {};
}

// src/next-request-context.ts
var import_async_hooks = require("async_hooks");
var name = "@next/request-context";
var NEXT_REQUEST_CONTEXT_SYMBOL = Symbol.for(name);
var INTERNAL_STORAGE_FIELD_SYMBOL = Symbol.for("internal.storage");
function getOrCreateContextSingleton() {
  const _globalThis = globalThis;
  if (!_globalThis[NEXT_REQUEST_CONTEXT_SYMBOL]) {
    const storage = new import_async_hooks.AsyncLocalStorage();
    const Context = {
      get: () => storage.getStore(),
      [INTERNAL_STORAGE_FIELD_SYMBOL]: storage
    };
    _globalThis[NEXT_REQUEST_CONTEXT_SYMBOL] = Context;
  }
  return _globalThis[NEXT_REQUEST_CONTEXT_SYMBOL];
}
var NextRequestContext = getOrCreateContextSingleton();
function withNextRequestContext(value, callback) {
  const storage = NextRequestContext[INTERNAL_STORAGE_FIELD_SYMBOL];
  return storage.run(value, callback);
}

// src/server-launcher.ts
process.chdir(__dirname);
var region = process.env.VERCEL_REGION || process.env.NOW_REGION;
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = region === "dev1" ? "development" : "production";
}
if (process.env.NODE_ENV !== "production" && region !== "dev1") {
  console.warn(
    `Warning: NODE_ENV was incorrectly set to "${process.env.NODE_ENV}", this value is being overridden to "production"`
  );
  process.env.NODE_ENV = "production";
}
process.env.__NEXT_PRIVATE_PREBUNDLED_REACT = "next"
var NextServer = require("next/dist/compiled/next-server/server.runtime.prod.js").default;
// @preserve next-server-preload-target
const conf = {"env":{},"eslint":{"ignoreDuringBuilds":false},"typescript":{"ignoreBuildErrors":false,"tsconfigPath":"tsconfig.json"},"distDir":".next","cleanDistDir":true,"assetPrefix":"","cacheMaxMemorySize":52428800,"configOrigin":"next.config.mjs","useFileSystemPublicRoutes":true,"generateEtags":true,"pageExtensions":["tsx","ts","jsx","js"],"poweredByHeader":true,"compress":false,"analyticsId":"","images":{"deviceSizes":[640,750,828,1080,1200,1920,2048,3840],"imageSizes":[16,32,48,64,96,128,256,384],"path":"/_next/image","loader":"default","loaderFile":"","domains":[],"disableStaticImages":false,"minimumCacheTTL":60,"formats":["image/webp"],"dangerouslyAllowSVG":false,"contentSecurityPolicy":"script-src 'none'; frame-src 'none'; sandbox;","contentDispositionType":"inline","remotePatterns":[{"protocol":"https","hostname":"lh3.googleusercontent.com","pathname":"/**"},{"protocol":"https","hostname":"s.gravatar.com","pathname":"/**"},{"protocol":"https","hostname":"images.clerk.dev","pathname":"/**"},{"protocol":"https","hostname":"img.clerk.com","pathname":"/**"}],"unoptimized":false},"devIndicators":{"buildActivity":true,"buildActivityPosition":"bottom-right"},"onDemandEntries":{"maxInactiveAge":60000,"pagesBufferLength":5},"amp":{"canonicalBase":""},"basePath":"","sassOptions":{},"trailingSlash":false,"i18n":null,"productionBrowserSourceMaps":false,"optimizeFonts":true,"excludeDefaultMomentLocales":true,"serverRuntimeConfig":{},"publicRuntimeConfig":{},"reactProductionProfiling":false,"reactStrictMode":null,"httpAgentOptions":{"keepAlive":true},"outputFileTracing":true,"staticPageGenerationTimeout":60,"swcMinify":true,"modularizeImports":{"@mui/icons-material":{"transform":"@mui/icons-material/{{member}}"},"lodash":{"transform":"lodash/{{member}}"}},"experimental":{"prerenderEarlyExit":false,"serverMinification":true,"serverSourceMaps":false,"linkNoTouchStart":false,"caseSensitiveRoutes":false,"clientRouterFilter":true,"clientRouterFilterRedirects":false,"fetchCacheKeyPrefix":"","middlewarePrefetch":"flexible","optimisticClientCache":true,"manualClientBasePath":false,"cpus":7,"memoryBasedWorkersCount":false,"isrFlushToDisk":true,"workerThreads":false,"optimizeCss":false,"nextScriptWorkers":false,"scrollRestoration":false,"externalDir":false,"disableOptimizedLoading":false,"gzipSize":true,"craCompat":false,"esmExternals":true,"fullySpecified":false,"outputFileTracingRoot":"/Users/sid/Documents/Projects/open-mool/apps/web","swcTraceProfiling":false,"forceSwcTransforms":false,"largePageDataBytes":128000,"adjustFontFallbacks":false,"adjustFontFallbacksWithSizeAdjust":false,"typedRoutes":false,"instrumentationHook":false,"bundlePagesExternals":false,"parallelServerCompiles":false,"parallelServerBuildTraces":false,"ppr":false,"missingSuspenseWithCSRBailout":true,"optimizeServerReact":true,"useEarlyImport":false,"staleTimes":{"dynamic":30,"static":300},"optimizePackageImports":["lucide-react","date-fns","lodash-es","ramda","antd","react-bootstrap","ahooks","@ant-design/icons","@headlessui/react","@headlessui-float/react","@heroicons/react/20/solid","@heroicons/react/24/solid","@heroicons/react/24/outline","@visx/visx","@tremor/react","rxjs","@mui/material","@mui/icons-material","recharts","react-use","@material-ui/core","@material-ui/icons","@tabler/icons-react","mui-core","react-icons/ai","react-icons/bi","react-icons/bs","react-icons/cg","react-icons/ci","react-icons/di","react-icons/fa","react-icons/fa6","react-icons/fc","react-icons/fi","react-icons/gi","react-icons/go","react-icons/gr","react-icons/hi","react-icons/hi2","react-icons/im","react-icons/io","react-icons/io5","react-icons/lia","react-icons/lib","react-icons/lu","react-icons/md","react-icons/pi","react-icons/ri","react-icons/rx","react-icons/si","react-icons/sl","react-icons/tb","react-icons/tfi","react-icons/ti","react-icons/vsc","react-icons/wi"],"trustHostHeader":true,"isExperimentalCompile":false},"configFileName":"next.config.mjs","_originalRedirects":[{"source":"/whatsapp","destination":"https://chat.whatsapp.com/DizWrcM1Mbr1vTRBvd43B5","permanent":false},{"source":"/github","destination":"https://github.com/open-mool/open-mool","permanent":false}]};
var nextServer = new NextServer({
  conf,
  dir: ".",
  minimalMode: true,
  customServer: false
});
var serve = (handler) => async (req, res) => {
  const vercelContext = getContext();
  await withNextRequestContext({ waitUntil: vercelContext.waitUntil }, () => {
    // @preserve entryDirectory handler
    return handler(req, res);
  });
};
module.exports = serve(nextServer.getRequestHandler());
if ((conf.experimental?.ppr || conf.experimental?.cacheComponents) && "getRequestHandlerWithMetadata" in nextServer && typeof nextServer.getRequestHandlerWithMetadata === "function") {
  module.exports.getRequestHandlerWithMetadata = (metadata) => serve(nextServer.getRequestHandlerWithMetadata(metadata));
}
if (process.env.NEXT_PRIVATE_PRELOAD_ENTRIES) {
  module.exports.preload = nextServer.unstable_preloadEntries.bind(nextServer);
}
