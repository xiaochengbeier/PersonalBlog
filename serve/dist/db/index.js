"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = exports.User = exports.Tag = exports.Register = exports.Picker = exports.Critics = exports.Blog = exports.Atmaping = void 0;
const init_models_1 = require("./models/init-models");
Object.defineProperty(exports, "Atmaping", { enumerable: true, get: function () { return init_models_1.Atmaping; } });
Object.defineProperty(exports, "Blog", { enumerable: true, get: function () { return init_models_1.Blog; } });
Object.defineProperty(exports, "Critics", { enumerable: true, get: function () { return init_models_1.Critics; } });
Object.defineProperty(exports, "Picker", { enumerable: true, get: function () { return init_models_1.Picker; } });
Object.defineProperty(exports, "Register", { enumerable: true, get: function () { return init_models_1.Register; } });
Object.defineProperty(exports, "Tag", { enumerable: true, get: function () { return init_models_1.Tag; } });
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return init_models_1.User; } });
Object.defineProperty(exports, "Project", { enumerable: true, get: function () { return init_models_1.Project; } });
const index_1 = require("./sequelize/index");
init_models_1.initModels(index_1.sequelize);
