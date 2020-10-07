import jasmineRequire from 'jasmine-core/lib/jasmine-core/jasmine.js';

// tslint:disable-next-line:no-string-literal
window['jasmineRequire'] = jasmineRequire;
import 'jasmine-core/lib/jasmine-core/jasmine-html.js';
import 'jasmine-core/lib/jasmine-core/boot.js';

declare var jasmine;

import './polyfills';

import 'zone.js/dist/zone-testing';

import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// Spec files to include in the Stackblitz tests
import './tests.sb.ts';

function bootstrap() {
  // tslint:disable-next-line:no-string-literal
  if (window['jasmineRef']) {
    location.reload();
    return;
  } else {
    window.onload(undefined);
    // tslint:disable-next-line:no-string-literal
    window['jasmineRef'] = jasmine.getEnv();
  }

  // First, initialize the Angular testing environment.
  getTestBed().initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
  );
}
//

bootstrap();

//
