import backend from './backend';
import paths from './paths';

export default {
  backend: backend(process.env),
  paths: paths(process.env)
};