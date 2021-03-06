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

import { FirebaseNamespace } from '@firebase/app-types';
import { _FirebaseNamespace } from '@firebase/app-types/private';
import { Component, ComponentType } from '@firebase/component';
import { PlatformLoggerService } from './platformLoggerService';
import { name, version } from '../package.json';

export function registerCoreComponents(firebase: FirebaseNamespace): void {
  (firebase as _FirebaseNamespace).INTERNAL.registerComponent(
    new Component(
      'platform-logger',
      container => new PlatformLoggerService(container),
      ComponentType.PRIVATE
    )
  );
  // Register `app` package.
  firebase.registerVersion(name, version);
  // Register platform SDK identifier (no version).
  firebase.registerVersion('fire-js', '');
}
