/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Service } from './api/service';
import {
  Component,
  ComponentType,
  ComponentContainer
} from '@firebase/component';
import { _FirebaseNamespace } from '@firebase/app-types/private';

import { name, version } from '../package.json';

/**
 * Type constant for Firebase Functions.
 */
const FUNCTIONS_TYPE = 'functions';

function factory(container: ComponentContainer, region?: string): Service {
  // Dependencies
  const app = container.getProvider('app').getImmediate();
  const authProvider = container.getProvider('auth-internal');
  const messagingProvider = container.getProvider('messaging');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new Service(app, authProvider, messagingProvider, region);
}

export function registerFunctions(instance: _FirebaseNamespace): void {
  const namespaceExports = {
    // no-inline
    Functions: Service
  };
  instance.INTERNAL.registerComponent(
    new Component(FUNCTIONS_TYPE, factory, ComponentType.PUBLIC)
      .setServiceProps(namespaceExports)
      .setMultipleInstances(true)
  );
  instance.registerVersion(name, version);
}
