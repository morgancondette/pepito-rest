// Restify server and mongodb options
interface IConfig {
  SERVER_OPTIONS: IConfigServerOptions;
  MONGODB_OPTIONS: IConfigMongodbOptions;
  MONGODB_URI: string;
  SERVER_PORT: number;
}

interface IConfigServerOptions {
  name: string;
  strictRouting: boolean;
}

interface IConfigMongodbOptions {
  useMongoClient: boolean;
  user: string;
  pass: string;
}

export const CONFIG: IConfig = {
  SERVER_OPTIONS: {
    name: "",
    strictRouting: true,
  },
  MONGODB_OPTIONS: {
    useMongoClient: true,
    user: "",
    pass: ""
  },
  MONGODB_URI: "",
  SERVER_PORT: 8888
};
