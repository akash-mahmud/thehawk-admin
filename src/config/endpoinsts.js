export const endpoint = {
  tag: {
    add: "/tag",
    get: "/tag",
    getById: "/tag/:id",
    delete: "/tag/:id",
    update: "/tag/:id",
  },
  media: {
    single: "/media/single",
    multiple: "",
    getAll: "/media",
  },
  category: {
    getAll: "/category",
    create: "/category",
    delete: "/category/:id",
    update: "/category/:id",
  },
  post: {
    getAll: "/post",
    create: "/post",
    delete: "/post/:id",
    update: "/post/:id",
    getById: "/singlepost/:id",
    adminPost: "/post/admin",
  },
  rss: {
    getAll: "/rss/all",
    single: "/rss/:id",
    update: "/rss/:id",
    delete: "/rss/:id",
    create: "/rss_feed",
  },
  subcategory: {
    getAll: "/subCategory",
    create: "/subCategory",
    delete: "/subCategory/:id",
    update: "/subCategory/:id",
    getById: "/subCategory/:id",
  },
  user: {
    all: "/user",
    logout: "/user/me/logout",
    auth: "/user/me",
    login: "/user",
    delete: "/user/:id",
    update: "/user/:id",
    register: "/user/register",
  },
  pool: {
    create: "/pool",
    currentPool: "/pool",
  },

  database: {
    restore: "/restore/backup",
    backup: "/restore/download",
  },
  siteInfo: {
    get: "/siteinfo",
    add: "/siteinfo",
    update: "/siteinfo",
  },
};