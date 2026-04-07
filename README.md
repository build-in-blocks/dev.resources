# @build-in-blocks/dev.resources

![Latest Version](https://img.shields.io/npm/v/@build-in-blocks/dev.resources.svg?label=latest&color=brightgreen&style=flat-square) ![NPM Downloads](https://img.shields.io/npm/d18m/%40build-in-blocks%2Fdev.resources?label=downloads%20(last%2018%20months)) ![build passing](https://img.shields.io/badge/build-passing-brightgreen?style=flat-square)

[![License: AGPL v3.0](https://img.shields.io/badge/license-AGPL%20v3.0-blue.svg?style=flat-square)](https://www.gnu.org/licenses/agpl-3.0) [![All Contributors](https://img.shields.io/github/all-contributors/build-in-blocks/dev.resources?color=ee8449&style=flat-square)](#contributors) [![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat-square)](https://github.com/build-in-blocks/dev.resources/blob/develop/docs.contributors/README.md)

#

**Built with:** Node.js v24.0.2

#

**Supported Node.js versions:** Node.js v20.x, v22.x, v24.x and v25.x - Monitored by central Blocks CI from [@build-in-blocks/dev.setup](https://www.npmjs.com/package/@build-in-blocks/dev.setup)

#

**Overview:** Shared `@build-in-blocks` framework Typescript code development library.

#

**Description:** Code used by more than one libraries from the `@build-in-blocks` framework so far, are gathered and developed in this library.

#

**User guide:** See [docs.users README.md](https://github.com/build-in-blocks/dev.resources/blob/develop/docs.users/README.md)

#

**Contributor guide:** See [docs.contributors README.md](https://github.com/build-in-blocks/dev.resources/blob/develop/docs.contributors/README.md)

#

**Run into any issues?** Report them via our [product issue reports repo](https://github.com/build-in-blocks/product-issue-reports/issues)

#

### Quick installation & usage guide

#### 1. Main package installation

Install the package as a `devDependency` in your project:

````
npm install -D @build-in-blocks/dev.resources
````

#### 2. When to install `typescript`

If you are using both this library and [@build-in-blocks/dev.build](https://www.npmjs.com/package/@build-in-blocks/dev.build) together in your project, then you don't need to install `typescript` in your project (the **@build-in-blocks/dev.build** library already does that internally, relative to your project). 

Otherwise, you'll need to manually install `typescript` in your project. See `typescript` table in the general guide for more information: [Typescript compatibility and usage](https://github.com/build-in-blocks/.github/wiki/Repo-User-Guide-Extension#table-typescript-compatibility-and-usage).

#### 3. Import needed resources

Import and use what you need from the library in your `.ts` or `.js` file, for example:

````
import { _default } from '@build-in-blocks/dev.resources';

console.log(_default);
````

> [!NOTE]  
> Visit the user guide 👆🏽 to see the full list of variables and functions available.

#

### Contributors

Thanks to these amazing contributors to the **@build-in-blocks/dev.resources** project. This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. See [emoji key](https://allcontributors.org/docs/en/emoji-key). Contributions of any kind welcome!

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="16.66%"><a href="https://github.com/Ifycode"><img src="https://avatars.githubusercontent.com/u/45185388?v=4?s=100" width="100px;" alt="Mary @Ifycode"/><br /><sub><b>Mary @Ifycode</b></sub></a><br /><a href="https://github.com/build-in-blocks/dev.resources/commits?author=Ifycode" title="Code">💻</a> <a href="https://github.com/build-in-blocks/dev.resources/commits?author=Ifycode" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="16.66%"><a href="https://github.com/apps/allcontributors"><img src="https://avatars.githubusercontent.com/in/23186?v=4?s=100" width="100px;" alt="allcontributors[bot]"/><br /><sub><b>allcontributors[bot]</b></sub></a><br /><a href="#tool-allcontributors[bot]" title="Tools">🔧</a> <a href="https://github.com/build-in-blocks/dev.resources/commits?author=allcontributors[bot]" title="Documentation">📖</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
