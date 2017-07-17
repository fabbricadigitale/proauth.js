<a name="0.3.2"></a>
## [0.3.2](https://github.com/fabbricadigitale/proauth.js/compare/v0.3.1...v0.3.2) (2017-07-17)


### Docs

* Browser matrix badge ([377f61508307730b9fcbb0e5aba66e2e2bc8401c](https://github.com/fabbricadigitale/proauth.js/commit/377f61508307730b9fcbb0e5aba66e2e2bc8401c))
* Update compatibility ([fdf3d3e5afd235d7481665a0caa76b4ba31cfc62](https://github.com/fabbricadigitale/proauth.js/commit/fdf3d3e5afd235d7481665a0caa76b4ba31cfc62))

### Fix

* Concurrency testing  ([1ad94c57948baf007f765c1d02baeb4a8a17e93e](https://github.com/fabbricadigitale/proauth.js/commit/1ad94c57948baf007f765c1d02baeb4a8a17e93e)), closes [#28](https://github.com/fabbricadigitale/proauth.js/issues/28)
* Ensure SauceLabs reporter config is not overridden ([316f79930937bc10a556c7d08df3c346f1350e97](https://github.com/fabbricadigitale/proauth.js/commit/316f79930937bc10a556c7d08df3c346f1350e97))
* Execute SauceLabs only on internal PRs ([804985785f08fba81ad8506b7177da3f513bd8be](https://github.com/fabbricadigitale/proauth.js/commit/804985785f08fba81ad8506b7177da3f513bd8be))
* Race condition in tests  ([184cdc20d51db2523431499a7aca8892fa08aaa9](https://github.com/fabbricadigitale/proauth.js/commit/184cdc20d51db2523431499a7aca8892fa08aaa9)), closes [#28](https://github.com/fabbricadigitale/proauth.js/issues/28)
* Tests for Safari 10 ([342b1e589da9939bbaa0d4b024d6e95d3553c42d](https://github.com/fabbricadigitale/proauth.js/commit/342b1e589da9939bbaa0d4b024d6e95d3553c42d))

### New

* Run tests on Saucelabs ([12ad9d818bc96799582692715d5171d8e633c3f5](https://github.com/fabbricadigitale/proauth.js/commit/12ad9d818bc96799582692715d5171d8e633c3f5))

### Update

* Add Android tests ([d85f889bac6a766ea0d66c31506ac4069346e64f](https://github.com/fabbricadigitale/proauth.js/commit/d85f889bac6a766ea0d66c31506ac4069346e64f))
* Improve SauceLabs fault tolerance  ([16b4087e722e69df5d2e66b726b5caa1b0162348](https://github.com/fabbricadigitale/proauth.js/commit/16b4087e722e69df5d2e66b726b5caa1b0162348))
* Refactor Saucelabs config to allow local testing ([418db72a6e0d8cd837fa8adabfad77a1c738446d](https://github.com/fabbricadigitale/proauth.js/commit/418db72a6e0d8cd837fa8adabfad77a1c738446d))
* Refactor SauceLabs configuration ([6589707d0ec6be9559dffa246076d0100ca965e2](https://github.com/fabbricadigitale/proauth.js/commit/6589707d0ec6be9559dffa246076d0100ca965e2))



<a name="0.3.1"></a>
## [0.3.1](https://github.com/fabbricadigitale/proauth.js/compare/v0.3.0...v0.3.1) (2017-06-22)


### Build

* Avoid race condition when making lib dir ([2ab7aae3dfb7698c42682fbcc503685e318fe59a](https://github.com/fabbricadigitale/proauth.js/commit/2ab7aae3dfb7698c42682fbcc503685e318fe59a))

### Fix

* Override mimetype also when no "content-type" header was received ([6ae208434d9747e11a9ae2e7fcfeeda945971458](https://github.com/fabbricadigitale/proauth.js/commit/6ae208434d9747e11a9ae2e7fcfeeda945971458))

### New

* Client whenReady promise ([a0a1567067043dc25aef41afa1562ce03c7f4cd7](https://github.com/fabbricadigitale/proauth.js/commit/a0a1567067043dc25aef41afa1562ce03c7f4cd7))
* Use native Karma webserver to avoid golang dependency ([3cc532ee676bb611494946247b72f7183297fb5a](https://github.com/fabbricadigitale/proauth.js/commit/3cc532ee676bb611494946247b72f7183297fb5a))

### Update

* Add linting to tests ([f622aa021d295fc2d930ce5f32c22384a9698da0](https://github.com/fabbricadigitale/proauth.js/commit/f622aa021d295fc2d930ce5f32c22384a9698da0))
* Keywords in package.json ([9c41de0acdcf2fc18d9fcf968e8355ebf459731b](https://github.com/fabbricadigitale/proauth.js/commit/9c41de0acdcf2fc18d9fcf968e8355ebf459731b))
* Lint correctly every file under "src" folder ([980f00c8e3eb68c7fcb76ca56cf10a6930c95d8b](https://github.com/fabbricadigitale/proauth.js/commit/980f00c8e3eb68c7fcb76ca56cf10a6930c95d8b))
* Refactor config ([dba7d72c9360dc2f886116ffca5d76c0db8ebb73](https://github.com/fabbricadigitale/proauth.js/commit/dba7d72c9360dc2f886116ffca5d76c0db8ebb73))
* Tests refactoring  ([0de381b334c5d0711f608c8e619d12b593323ef8](https://github.com/fabbricadigitale/proauth.js/commit/0de381b334c5d0711f608c8e619d12b593323ef8)), closes [#22](https://github.com/fabbricadigitale/proauth.js/issues/22)



<a name="0.3.0"></a>
# 0.3.0 (2017-06-15)


### Breaking

* Rejection on Client.login() error ([4ce9b8e37fc7d9262b8395276411f65bea3b1513](https://github.com/fabbricadigitale/proauth.js/commit/4ce9b8e37fc7d9262b8395276411f65bea3b1513))

### Build

* Autoinstall deps ([6cbbf02f24420ccb6527c8478a9d4f4b66fd341e](https://github.com/fabbricadigitale/proauth.js/commit/6cbbf02f24420ccb6527c8478a9d4f4b66fd341e))
* Build script ([497179a128ec327320acd996d59fc19f203a48d3](https://github.com/fabbricadigitale/proauth.js/commit/497179a128ec327320acd996d59fc19f203a48d3))
* Build system refinements ([c71998d08393968d7130bb689d450b753e84b5f9](https://github.com/fabbricadigitale/proauth.js/commit/c71998d08393968d7130bb689d450b753e84b5f9))
* Cross-platform CHANGELOG editor ([9a8a69ff6082c2f86b27299df52e80e7b87195d4](https://github.com/fabbricadigitale/proauth.js/commit/9a8a69ff6082c2f86b27299df52e80e7b87195d4))
* External source maps for production ([52217c8a8f1be348899c4de5198cc8cd963a5b37](https://github.com/fabbricadigitale/proauth.js/commit/52217c8a8f1be348899c4de5198cc8cd963a5b37))
* Fresh build system ([5b1ac7ef47ed2029ef073ccefbd972bebccb357d](https://github.com/fabbricadigitale/proauth.js/commit/5b1ac7ef47ed2029ef073ccefbd972bebccb357d))
* Include sources within distribution ([b2143f684a5d8baae4ddc8b918015b18bf459e6f](https://github.com/fabbricadigitale/proauth.js/commit/b2143f684a5d8baae4ddc8b918015b18bf459e6f))
* New simplified build system ([0b5d5a6c1b3de2740fe5f41440afa8ba6088cfea](https://github.com/fabbricadigitale/proauth.js/commit/0b5d5a6c1b3de2740fe5f41440afa8ba6088cfea))
* Postinstall script again ([82b82ebb370343e5864b8d0111cfe60e47a3810d](https://github.com/fabbricadigitale/proauth.js/commit/82b82ebb370343e5864b8d0111cfe60e47a3810d))
* Prepublish rather than postinstall script ([3daed74835a92b10a54e43d7ead06cacc3153cb5](https://github.com/fabbricadigitale/proauth.js/commit/3daed74835a92b10a54e43d7ead06cacc3153cb5))
* Prepublish script ([593bf07c2820a32835c2359c3a76bf1424dfbf66](https://github.com/fabbricadigitale/proauth.js/commit/593bf07c2820a32835c2359c3a76bf1424dfbf66))
* Tasks improvements ([a74f507296024ad893ed492dfb129d7fe176d276](https://github.com/fabbricadigitale/proauth.js/commit/a74f507296024ad893ed492dfb129d7fe176d276))
* Trying to make the package build when installed ([d93e6dc4ff7d4e0e84072cf53cc0cb19301456e0](https://github.com/fabbricadigitale/proauth.js/commit/d93e6dc4ff7d4e0e84072cf53cc0cb19301456e0))

### Docs

* Add configuration paragraph to readme ([66c57e0fd57736ea5d5bb436a431578c0193d9ac](https://github.com/fabbricadigitale/proauth.js/commit/66c57e0fd57736ea5d5bb436a431578c0193d9ac))
* Build status badge ([f09f2cfd50489a7e9fe6cae9a4dd1f2f96ea0bf5](https://github.com/fabbricadigitale/proauth.js/commit/f09f2cfd50489a7e9fe6cae9a4dd1f2f96ea0bf5))
* Codecov badge ([5c4a6e49ceae3085e96a3d4b0ba3d2902c6423cf](https://github.com/fabbricadigitale/proauth.js/commit/5c4a6e49ceae3085e96a3d4b0ba3d2902c6423cf))
* Codecov badge link ([10ae2116df4bad154225c7820defd66703537a55](https://github.com/fabbricadigitale/proauth.js/commit/10ae2116df4bad154225c7820defd66703537a55))
* Default and legacy mode diagrams ([445c343a156d60b436d88fa0b6185f97e483e71d](https://github.com/fabbricadigitale/proauth.js/commit/445c343a156d60b436d88fa0b6185f97e483e71d))
* Fix typos ([99df6e1774a1d4471d4afb979b834806326c4e04](https://github.com/fabbricadigitale/proauth.js/commit/99df6e1774a1d4471d4afb979b834806326c4e04))
* Minimum node version documented ([f1cda28bfb150746f44b0e6ca51573047afdcb08](https://github.com/fabbricadigitale/proauth.js/commit/f1cda28bfb150746f44b0e6ca51573047afdcb08))
* Readme ([d26b96b36ea7e475df0f05a4c13e7cad48b142e1](https://github.com/fabbricadigitale/proauth.js/commit/d26b96b36ea7e475df0f05a4c13e7cad48b142e1))
* Update documentation ([aaaa756fe91b6ec161e3f31b7d24f4dd2a5674bc](https://github.com/fabbricadigitale/proauth.js/commit/aaaa756fe91b6ec161e3f31b7d24f4dd2a5674bc))
* Update readme ([2a2a5a0f236b1e73a4e5206de1b27f088f6fabac](https://github.com/fabbricadigitale/proauth.js/commit/2a2a5a0f236b1e73a4e5206de1b27f088f6fabac))
* Update readme ([cdb328ee04eccab31e0c52175ff3b7a17dc32234](https://github.com/fabbricadigitale/proauth.js/commit/cdb328ee04eccab31e0c52175ff3b7a17dc32234))
* Update README and move dev how-to away  ([059ea409569fd4e26edfd40aa7cb5e4b4d78c086](https://github.com/fabbricadigitale/proauth.js/commit/059ea409569fd4e26edfd40aa7cb5e4b4d78c086))

### Fix

* Abort method now follows the XHR standard ([a7e5a7e4ee5a6fb8186742818b682fa298eebf0a](https://github.com/fabbricadigitale/proauth.js/commit/a7e5a7e4ee5a6fb8186742818b682fa298eebf0a))
* Add dependency to babel-eslint to make `lint` npm task work ([a92f42b38aee0267caf39497f6bc5b14e4a3081f](https://github.com/fabbricadigitale/proauth.js/commit/a92f42b38aee0267caf39497f6bc5b14e4a3081f))
* Add doctype to demo files ([d879d16a3ec805b9dbaeaa40ef3654444dffff79](https://github.com/fabbricadigitale/proauth.js/commit/d879d16a3ec805b9dbaeaa40ef3654444dffff79))
* After fetch error stop cascading through promises ([a6f34db4a424d017ca319b5349372c818f6fad45](https://github.com/fabbricadigitale/proauth.js/commit/a6f34db4a424d017ca319b5349372c818f6fad45))
* Avoid loop when fetch is polyfilled ([5017ee698d3cfde0def5d758dc8dbc26a84c969a](https://github.com/fabbricadigitale/proauth.js/commit/5017ee698d3cfde0def5d758dc8dbc26a84c969a))
* Avoid to fetch oauth endpoint with token ([7010ede6e36643dbd2e9ad86710657068736a9aa](https://github.com/fabbricadigitale/proauth.js/commit/7010ede6e36643dbd2e9ad86710657068736a9aa))
* Cannot re-use request when bodyUsed ([85da6d4b40d3e85f0ad73374b13dc6d12cc29dc2](https://github.com/fabbricadigitale/proauth.js/commit/85da6d4b40d3e85f0ad73374b13dc6d12cc29dc2))
* Concurrent token refreshing ([164a74cee0612e6a3a8a838a177a95a5a03330f8](https://github.com/fabbricadigitale/proauth.js/commit/164a74cee0612e6a3a8a838a177a95a5a03330f8))
* Disable git commit hooks during releasing phase ([112049ba972d149ce6c61f9d2758e41ca510ac70](https://github.com/fabbricadigitale/proauth.js/commit/112049ba972d149ce6c61f9d2758e41ca510ac70))
* Do not throw error when setting unsafe header ([ee1f770cc4ef64359b7997172e0a2d4102af6184](https://github.com/fabbricadigitale/proauth.js/commit/ee1f770cc4ef64359b7997172e0a2d4102af6184))
* Enable extending builtin XHR ([e7c39d97f7bd79f779545aa9fd4d15f69ae6dcea](https://github.com/fabbricadigitale/proauth.js/commit/e7c39d97f7bd79f779545aa9fd4d15f69ae6dcea))
* EventTarget scoping ([6696445c8b8d3f1fabfba27df34957fca63d1226](https://github.com/fabbricadigitale/proauth.js/commit/6696445c8b8d3f1fabfba27df34957fca63d1226))
* Fake serviceWorker event scoping ([7a1ee097c239348fb9ecd477affc8848d9d463f3](https://github.com/fabbricadigitale/proauth.js/commit/7a1ee097c239348fb9ecd477affc8848d9d463f3))
* GetAllResponseHeaders returns sorted headers to follow the XHR standard ([ae561ba11361419cfd35f243f750306c3253b2c2](https://github.com/fabbricadigitale/proauth.js/commit/ae561ba11361419cfd35f243f750306c3253b2c2))
* Goes in timeout correctly test ([d4e75ff019b901a89ddc9007fca20fb06563831d](https://github.com/fabbricadigitale/proauth.js/commit/d4e75ff019b901a89ddc9007fca20fb06563831d))
* Headers objects are not iterable on Edge ([ed532602cf1a22bc2b1d3edcc4baf14e05e17abf](https://github.com/fabbricadigitale/proauth.js/commit/ed532602cf1a22bc2b1d3edcc4baf14e05e17abf))
* Improve symbols naming convention ([12dbd9a1e00ed24151d5fc3ceedf722d17093a86](https://github.com/fabbricadigitale/proauth.js/commit/12dbd9a1e00ed24151d5fc3ceedf722d17093a86))
* JSdoc ([e4425e19d2015d8b517ab8f88511c2025dceba1c](https://github.com/fabbricadigitale/proauth.js/commit/e4425e19d2015d8b517ab8f88511c2025dceba1c))
* Legacy mode flag condition ([1ce794074c6d591982012cbc14c6ab570112c4b1](https://github.com/fabbricadigitale/proauth.js/commit/1ce794074c6d591982012cbc14c6ab570112c4b1))
* Make service worker work also during first page load ([428b5a8b2542d16b8e9c7b7acd8f205c322a0397](https://github.com/fabbricadigitale/proauth.js/commit/428b5a8b2542d16b8e9c7b7acd8f205c322a0397))
* Make tests pass on MacOS ([4e3e94375095e979336ba26e2a2a9b221861780a](https://github.com/fabbricadigitale/proauth.js/commit/4e3e94375095e979336ba26e2a2a9b221861780a))
* NPM `lib` task ([1cb336b0afdb2ec5c7dd9f10e0def809615ffeee](https://github.com/fabbricadigitale/proauth.js/commit/1cb336b0afdb2ec5c7dd9f10e0def809615ffeee))
* Preserve client namespace ([fd6e752bc1b8cf96f4ca8bea90075d952f8a6ade](https://github.com/fabbricadigitale/proauth.js/commit/fd6e752bc1b8cf96f4ca8bea90075d952f8a6ade))
* Promise polyfill does not absolutize URLs ([7a457cbe55d258aefe0e938cd73b10394beeafba](https://github.com/fabbricadigitale/proauth.js/commit/7a457cbe55d258aefe0e938cd73b10394beeafba))
* Refactor packages ([446ca7ce746d12afd8527769bfb85a25964a13ab](https://github.com/fabbricadigitale/proauth.js/commit/446ca7ce746d12afd8527769bfb85a25964a13ab))
* Release workflow no more loops ([22183fa1d24ad4fc592ef909bc25627118421a36](https://github.com/fabbricadigitale/proauth.js/commit/22183fa1d24ad4fc592ef909bc25627118421a36))
* Remove duplicated test ([0bc11a00415e1a1c43d46ea5c4bce5036f0074b3](https://github.com/fabbricadigitale/proauth.js/commit/0bc11a00415e1a1c43d46ea5c4bce5036f0074b3))
* Reply message with error ([3ad4a6d835f1632686af88ab86afa7c21a5b18ba](https://github.com/fabbricadigitale/proauth.js/commit/3ad4a6d835f1632686af88ab86afa7c21a5b18ba))
* ResponseText now follows the XMLHttpRequest standard ([5d4784a8463308f984e887ac7a9f16b3606cefbe](https://github.com/fabbricadigitale/proauth.js/commit/5d4784a8463308f984e887ac7a9f16b3606cefbe))
* Return empty string also with undefined responseBody ([4c69ba84d12f2b5c44d26fac0dba1d2d921a2275](https://github.com/fabbricadigitale/proauth.js/commit/4c69ba84d12f2b5c44d26fac0dba1d2d921a2275))
* Return empty string instead of null when statusText is empty ([4e0f7a1df6e707061c6d6ef6f801f46091a8d575](https://github.com/fabbricadigitale/proauth.js/commit/4e0f7a1df6e707061c6d6ef6f801f46091a8d575))
* Return null in responseXML also when response body is empty string ([93d2bd99a7702e436047df4588ac537b511e302b](https://github.com/fabbricadigitale/proauth.js/commit/93d2bd99a7702e436047df4588ac537b511e302b))
* Return null in responseXML also when response body is undefined ([f7d4402017ab330648711408636d77dc4b357659](https://github.com/fabbricadigitale/proauth.js/commit/f7d4402017ab330648711408636d77dc4b357659))
* Return null instead of a document with parse error if XML document is invalid ([35a936c3ac3319d79f35d69e90f0247bc20e4184](https://github.com/fabbricadigitale/proauth.js/commit/35a936c3ac3319d79f35d69e90f0247bc20e4184))
* Safari issue when extending Event ([08527b77cc477a4bbccfb866ddf66e56f4042f5f](https://github.com/fabbricadigitale/proauth.js/commit/08527b77cc477a4bbccfb866ddf66e56f4042f5f))
* Session persistence ([82bafbef6cc7f89544d406339e6e849866b5a895](https://github.com/fabbricadigitale/proauth.js/commit/82bafbef6cc7f89544d406339e6e849866b5a895))
* Throw error if open() is called without 2 mandatory params ([d561e1ff28cd5db57055320c7f3a37272a5acaf5](https://github.com/fabbricadigitale/proauth.js/commit/d561e1ff28cd5db57055320c7f3a37272a5acaf5))
* Typos ([a4a02ee60d35fbf14988b2dfd727ada019422708](https://github.com/fabbricadigitale/proauth.js/commit/a4a02ee60d35fbf14988b2dfd727ada019422708))
* XHR Content type ([16fa637fccd82404370a5a472d1903b4251ade99](https://github.com/fabbricadigitale/proauth.js/commit/16fa637fccd82404370a5a472d1903b4251ade99))
* XHR errors ([52809123734c6e13c82d5fb9a7de8e8f3a2453e4](https://github.com/fabbricadigitale/proauth.js/commit/52809123734c6e13c82d5fb9a7de8e8f3a2453e4))
* XHR Event handling by extending native XHR ([f2595b0b98ccf88e98b91dce2450c1572cc9bf9b](https://github.com/fabbricadigitale/proauth.js/commit/f2595b0b98ccf88e98b91dce2450c1572cc9bf9b))

### New

* Add option to customize auto-registering of SW  ([f4f4e9971112a400fc918aa1f07dba3c6a034e1a](https://github.com/fabbricadigitale/proauth.js/commit/f4f4e9971112a400fc918aa1f07dba3c6a034e1a)), closes [#11](https://github.com/fabbricadigitale/proauth.js/issues/11)
* Add ServiceWorker mode ([61fd51c4e17bc98d6fafc7cc90a54423f2cb5b0d](https://github.com/fabbricadigitale/proauth.js/commit/61fd51c4e17bc98d6fafc7cc90a54423f2cb5b0d))
* Add timeout feature ([c1d9764b1838ad8b5d2af04fc3de6294ed7ebc82](https://github.com/fabbricadigitale/proauth.js/commit/c1d9764b1838ad8b5d2af04fc3de6294ed7ebc82))
* Babel transpilation to ES5 [WIP] ([213db5212581303d246809e729a487d35c726418](https://github.com/fabbricadigitale/proauth.js/commit/213db5212581303d246809e729a487d35c726418))
* Base files ([48947e7130db32aa68fbc6c623ec72e841f5cbcf](https://github.com/fabbricadigitale/proauth.js/commit/48947e7130db32aa68fbc6c623ec72e841f5cbcf))
* Changelog ([fc0c636fe2f754b7b36e67022414de885df30ddb](https://github.com/fabbricadigitale/proauth.js/commit/fc0c636fe2f754b7b36e67022414de885df30ddb))
* CI setup ([97c730bf0be2a846c5293bfaf408f9f01a55bcfe](https://github.com/fabbricadigitale/proauth.js/commit/97c730bf0be2a846c5293bfaf408f9f01a55bcfe))
* Client side authorization ([f4e30f60a3266e7e625f23662649704cb1ce7023](https://github.com/fabbricadigitale/proauth.js/commit/f4e30f60a3266e7e625f23662649704cb1ce7023))
* Client skeleton ([ad4f8da28a7bb3f3ed839fe978a64b9194c9a019](https://github.com/fabbricadigitale/proauth.js/commit/ad4f8da28a7bb3f3ed839fe978a64b9194c9a019))
* Codecov ([a9d58805d13679e08932b96eaab06eee077fb426](https://github.com/fabbricadigitale/proauth.js/commit/a9d58805d13679e08932b96eaab06eee077fb426))
* Common package for re-usable elements ([8ba7e4815593063937f85b977ea8653256bddf5e](https://github.com/fabbricadigitale/proauth.js/commit/8ba7e4815593063937f85b977ea8653256bddf5e))
* Coverage ([804b73187eab1f5d06a4c3cfee941d729025d17b](https://github.com/fabbricadigitale/proauth.js/commit/804b73187eab1f5d06a4c3cfee941d729025d17b))
* EcmaScript linter configuration ([237264a291fe35efcb786d627605c7dacabcf4f5](https://github.com/fabbricadigitale/proauth.js/commit/237264a291fe35efcb786d627605c7dacabcf4f5))
* Initial ASCII sketch to document the architecture ([b09a2bae54d126af2225aa4cb9d4ed2070e8660a](https://github.com/fabbricadigitale/proauth.js/commit/b09a2bae54d126af2225aa4cb9d4ed2070e8660a))
* Legacy sub-package ([df0d504a5b6be3523a0bb427ab127ab544e66947](https://github.com/fabbricadigitale/proauth.js/commit/df0d504a5b6be3523a0bb427ab127ab544e66947))
* License ([732de57640729bbd21baef8107bb5c3554424d98](https://github.com/fabbricadigitale/proauth.js/commit/732de57640729bbd21baef8107bb5c3554424d98))
* Multiple build targets ([26501f0ce6317e7409cdf74314f51fb7faf5ae85](https://github.com/fabbricadigitale/proauth.js/commit/26501f0ce6317e7409cdf74314f51fb7faf5ae85))
* Postinstall script ([043316ac76e830a370a4c31c9ed46b6cd81b0f7d](https://github.com/fabbricadigitale/proauth.js/commit/043316ac76e830a370a4c31c9ed46b6cd81b0f7d))
* Release scripts ([9fbce0261b159406d766367b4fd7ffd96baf2d46](https://github.com/fabbricadigitale/proauth.js/commit/9fbce0261b159406d766367b4fd7ffd96baf2d46))
* Request handling logic ([1ff7e968915de270754344ff574c6ec3f9848e44](https://github.com/fabbricadigitale/proauth.js/commit/1ff7e968915de270754344ff574c6ec3f9848e44))
* ResponseURL property in XHR ([ef22e9f50d510f9e2c19ced0ed86efd126bd5e76](https://github.com/fabbricadigitale/proauth.js/commit/ef22e9f50d510f9e2c19ced0ed86efd126bd5e76))
* Service sub-package ([2901fcbae3361d03873adc244dd9828e79522d5a](https://github.com/fabbricadigitale/proauth.js/commit/2901fcbae3361d03873adc244dd9828e79522d5a))
* Setup tests ([13ce7d290daab745dc987817ec7a9ea32d8c0fb2](https://github.com/fabbricadigitale/proauth.js/commit/13ce7d290daab745dc987817ec7a9ea32d8c0fb2))
* Split test configuration to allow loading different packages for different browsers ([a8aaf050917ef7b3abd0ae14f25195ec8131c640](https://github.com/fabbricadigitale/proauth.js/commit/a8aaf050917ef7b3abd0ae14f25195ec8131c640))

### Update

* Ability to shutdown test server ([a2784aadbcb48244fdf8281ece56df4a429ce79c](https://github.com/fabbricadigitale/proauth.js/commit/a2784aadbcb48244fdf8281ece56df4a429ce79c))
* Add new tests ([bc4319e140985be3df64f55887fb7f11ebcf1182](https://github.com/fabbricadigitale/proauth.js/commit/bc4319e140985be3df64f55887fb7f11ebcf1182))
* Add new tests ([831de47451669973cf0e478ef3788387a770e705](https://github.com/fabbricadigitale/proauth.js/commit/831de47451669973cf0e478ef3788387a770e705))
* Add new tests ([189aaacdc1a1ea93d0e6751c343dca35805545d6](https://github.com/fabbricadigitale/proauth.js/commit/189aaacdc1a1ea93d0e6751c343dca35805545d6))
* Add new tests ([6829b8cba38ccb66ecc5d81e0446300f053853eb](https://github.com/fabbricadigitale/proauth.js/commit/6829b8cba38ccb66ecc5d81e0446300f053853eb))
* Add new tests ([77d7836c304067ed3fa4c7590742c1684c1b2319](https://github.com/fabbricadigitale/proauth.js/commit/77d7836c304067ed3fa4c7590742c1684c1b2319))
* Add new tests ([02e2083788d1dfdced1c1b5178878bd981202bd8](https://github.com/fabbricadigitale/proauth.js/commit/02e2083788d1dfdced1c1b5178878bd981202bd8))
* Better handling of responseURL ([2f6f67b57495cbe3c47a279fd87dd08dbd1c475f](https://github.com/fabbricadigitale/proauth.js/commit/2f6f67b57495cbe3c47a279fd87dd08dbd1c475f))
* Better headers and error handling ([d7f27cce6f7d9e50673dad47664a282c3848290a](https://github.com/fabbricadigitale/proauth.js/commit/d7f27cce6f7d9e50673dad47664a282c3848290a))
* Bundle `client` into `default` and `legacy` packages  ([a19d136527aa223137dff263bc8d8d9b006b9fad](https://github.com/fabbricadigitale/proauth.js/commit/a19d136527aa223137dff263bc8d8d9b006b9fad))
* Client message handler is now declared within the constructor ([70ef9f1d8689be253ef4a9a481c18aea5eeddf1a](https://github.com/fabbricadigitale/proauth.js/commit/70ef9f1d8689be253ef4a9a481c18aea5eeddf1a))
* Code style ([4288dcd25fa952b5b0b86a1b31ff5d3d8e4e8273](https://github.com/fabbricadigitale/proauth.js/commit/4288dcd25fa952b5b0b86a1b31ff5d3d8e4e8273))
* Code style plus minor improvements ([58836bedf76292c6d87a3491b893bc189ed96c8f](https://github.com/fabbricadigitale/proauth.js/commit/58836bedf76292c6d87a3491b893bc189ed96c8f))
* Communication protocol and session handling ([764eabd803672b7c75479c6c69daffb8e399cde5](https://github.com/fabbricadigitale/proauth.js/commit/764eabd803672b7c75479c6c69daffb8e399cde5))
* Create worker methods at prototype level ([f91084c480bdfb0d704479cfe85dfd8c08dcfe0f](https://github.com/fabbricadigitale/proauth.js/commit/f91084c480bdfb0d704479cfe85dfd8c08dcfe0f))
* Demo ([65e9851240b66c305312900e8eee3168a71d6d19](https://github.com/fabbricadigitale/proauth.js/commit/65e9851240b66c305312900e8eee3168a71d6d19))
* Dependencies ([836507aa7c5aa68eeb118f3775f908d783178535](https://github.com/fabbricadigitale/proauth.js/commit/836507aa7c5aa68eeb118f3775f908d783178535))
* Disabling ES5 traspiling ([2bd92f5daf39b7ce416c9e047120b2b50c15faaf](https://github.com/fabbricadigitale/proauth.js/commit/2bd92f5daf39b7ce416c9e047120b2b50c15faaf))
* Entrypoint ([36ad3db43f43cfe6b28cec06b4a88f3fba34fdcc](https://github.com/fabbricadigitale/proauth.js/commit/36ad3db43f43cfe6b28cec06b4a88f3fba34fdcc))
* ES5 Transpiler [WIP] ([f310351ae0d89e01976b14c7168e84f34343a65e](https://github.com/fabbricadigitale/proauth.js/commit/f310351ae0d89e01976b14c7168e84f34343a65e))
* ES6 refinements ([d20075fc91cc1367a83146fc4c6d88a2d424e0fc](https://github.com/fabbricadigitale/proauth.js/commit/d20075fc91cc1367a83146fc4c6d88a2d424e0fc))
* ES6 refinements ([0532d2782fd6e0fd4ae5331dcae6f864481298fa](https://github.com/fabbricadigitale/proauth.js/commit/0532d2782fd6e0fd4ae5331dcae6f864481298fa))
* Exclude test and lib folders from linting ([147da32a1397cdbbaeb7d555267e5fece8e86812](https://github.com/fabbricadigitale/proauth.js/commit/147da32a1397cdbbaeb7d555267e5fece8e86812))
* Fix coverage source files ([5b115d510d610143a7798b55b921ba3799d9f67e](https://github.com/fabbricadigitale/proauth.js/commit/5b115d510d610143a7798b55b921ba3799d9f67e))
* For-Of  ([898f40d8638d451e2d1c2d7ac5134bdd46ffecb5](https://github.com/fabbricadigitale/proauth.js/commit/898f40d8638d451e2d1c2d7ac5134bdd46ffecb5))
* Gitignore ([fd4d5d5250eaf1920a9f7a17a294e936e11b0be0](https://github.com/fabbricadigitale/proauth.js/commit/fd4d5d5250eaf1920a9f7a17a294e936e11b0be0))
* Improve and cleanup client ([bb4cf2cd2aea90b7b544eb0bd2a8b84042f96412](https://github.com/fabbricadigitale/proauth.js/commit/bb4cf2cd2aea90b7b544eb0bd2a8b84042f96412))
* Improve communication protocol ([b5b12b635a03d6fda2f20a6d3de9a63973aa26d0](https://github.com/fabbricadigitale/proauth.js/commit/b5b12b635a03d6fda2f20a6d3de9a63973aa26d0))
* Improve Oauth2Handler code ([aab2c224f486c5c702776381d7ced05d269dbb99](https://github.com/fabbricadigitale/proauth.js/commit/aab2c224f486c5c702776381d7ced05d269dbb99))
* Make legacyMode read-only ([75060c883b9d1a08249d4232318d6a476f9b3518](https://github.com/fabbricadigitale/proauth.js/commit/75060c883b9d1a08249d4232318d6a476f9b3518))
* Managed url event routing ([e7223480b25d4906582ec90a5e688f5d8edd0661](https://github.com/fabbricadigitale/proauth.js/commit/e7223480b25d4906582ec90a5e688f5d8edd0661))
* Minimum node engine is node 4 ([ca89a3eef4e14f3fae479f5052f3208b606a9c50](https://github.com/fabbricadigitale/proauth.js/commit/ca89a3eef4e14f3fae479f5052f3208b606a9c50))
* Move legacyMode from settings to client ([1ee795b6e27762faf3ceb597340effb848002155](https://github.com/fabbricadigitale/proauth.js/commit/1ee795b6e27762faf3ceb597340effb848002155))
* Npm ignore list ([ca08b24b3a80edefc6f1273afb048a0cbb94a744](https://github.com/fabbricadigitale/proauth.js/commit/ca08b24b3a80edefc6f1273afb048a0cbb94a744))
* Package main file ([4c53231b8000379dc462a741a8d908553ee72e33](https://github.com/fabbricadigitale/proauth.js/commit/4c53231b8000379dc462a741a8d908553ee72e33))
* Rationalize user settings ([ae3c049beb1a0d8b1608c2a323d210702b73609a](https://github.com/fabbricadigitale/proauth.js/commit/ae3c049beb1a0d8b1608c2a323d210702b73609a))
* Refactor ([b8206a6696faa416454f6fbd09a8283f26b2fbf0](https://github.com/fabbricadigitale/proauth.js/commit/b8206a6696faa416454f6fbd09a8283f26b2fbf0))
* Refactor ([357728a272c42f2ebacf71241d902eb02c5768c1](https://github.com/fabbricadigitale/proauth.js/commit/357728a272c42f2ebacf71241d902eb02c5768c1))
* Refactor ([99f595cd15af01ab0fbdd17b28f1479e91787c86](https://github.com/fabbricadigitale/proauth.js/commit/99f595cd15af01ab0fbdd17b28f1479e91787c86))
* Refactor code to follow guidelines ([facb4ddb3914f0bd4392efb900706fc98f618190](https://github.com/fabbricadigitale/proauth.js/commit/facb4ddb3914f0bd4392efb900706fc98f618190))
* Refactor following code standards ([fa9948a713bbafa5ec8f08a695a6d763e5813a11](https://github.com/fabbricadigitale/proauth.js/commit/fa9948a713bbafa5ec8f08a695a6d763e5813a11))
* Release now also includes Markdown files ([8fd89508c7fb814b9d4a773c0f26ec94b5fd20bc](https://github.com/fabbricadigitale/proauth.js/commit/8fd89508c7fb814b9d4a773c0f26ec94b5fd20bc))
* Release process has been split into two manual phases ([8e32f6b9b890d0fcc2d11b2da7c47f6fd5f519bf](https://github.com/fabbricadigitale/proauth.js/commit/8e32f6b9b890d0fcc2d11b2da7c47f6fd5f519bf))
* Remove `console.log` statements from dist build ([b6f1781fab5a10ee322201fc6fd784d7127e1d9f](https://github.com/fabbricadigitale/proauth.js/commit/b6f1781fab5a10ee322201fc6fd784d7127e1d9f))
* Remove deprecated `legacySrc` setting ([3e69df2c752b707d224f34470e60da5f86a9e78c](https://github.com/fabbricadigitale/proauth.js/commit/3e69df2c752b707d224f34470e60da5f86a9e78c))
* Remove deprecated `service` package ([9a8ca1ef1918be46666f25a4f38f91c6214f332b](https://github.com/fabbricadigitale/proauth.js/commit/9a8ca1ef1918be46666f25a4f38f91c6214f332b))
* Remove feature detection ([f8bc2dd2c44554e708d126e39cd8624e9ff6c77d](https://github.com/fabbricadigitale/proauth.js/commit/f8bc2dd2c44554e708d126e39cd8624e9ff6c77d))
* Remove unneeded .entries ([90e3e4e5da5d1496ea75db6f6061e1074ce1236b](https://github.com/fabbricadigitale/proauth.js/commit/90e3e4e5da5d1496ea75db6f6061e1074ce1236b))
* Remove unused imports ([e759836178d0a97d790f69be56d7a4372f576d6f](https://github.com/fabbricadigitale/proauth.js/commit/e759836178d0a97d790f69be56d7a4372f576d6f))
* Run linter before the tests ([7635b6cf63898c956b8a488db34843d2f54dc487](https://github.com/fabbricadigitale/proauth.js/commit/7635b6cf63898c956b8a488db34843d2f54dc487))
* Show warning instead of log when trying to create a synchronous XHR  ([3264b05a05d3979aa20515f695bd040169a7b32a](https://github.com/fabbricadigitale/proauth.js/commit/3264b05a05d3979aa20515f695bd040169a7b32a)), closes [#16](https://github.com/fabbricadigitale/proauth.js/issues/16)
* Small refactor ([276b969902eefa4d52104fba16d6316ca2f75467](https://github.com/fabbricadigitale/proauth.js/commit/276b969902eefa4d52104fba16d6316ca2f75467))
* Source maps for code coverage ([effbc0892199260079a4084cd63252901238e665](https://github.com/fabbricadigitale/proauth.js/commit/effbc0892199260079a4084cd63252901238e665))
* Test server shutdown ([85afeb83bf8ff616f2c94ad819d563aec7bd8c02](https://github.com/fabbricadigitale/proauth.js/commit/85afeb83bf8ff616f2c94ad819d563aec7bd8c02))
* Testing automatically build library now ([b92635e06e89b398d46a3ac15720b64687f1eff1](https://github.com/fabbricadigitale/proauth.js/commit/b92635e06e89b398d46a3ac15720b64687f1eff1))
* Turn off semicolons check in linter ([984badca9fee4bd2ea0d9ad24cb81bdec0d71fe6](https://github.com/fabbricadigitale/proauth.js/commit/984badca9fee4bd2ea0d9ad24cb81bdec0d71fe6))
* Use string templates rather than string concat ([b2af9d363ce19775eab3e10f7bc33a66a07976ad](https://github.com/fabbricadigitale/proauth.js/commit/b2af9d363ce19775eab3e10f7bc33a66a07976ad))
* XHR members visibility improved ([9445d49000d1ee8b51fab457c0d1bf4b586de729](https://github.com/fabbricadigitale/proauth.js/commit/9445d49000d1ee8b51fab457c0d1bf4b586de729))

### Upgrade

* Dependencies ([bac7d49fa777344bfe4c293e63d19988eb258f9e](https://github.com/fabbricadigitale/proauth.js/commit/bac7d49fa777344bfe4c293e63d19988eb258f9e))
* Dependencies lock file ([6c049793455706a2dad1ce4165800b1beff5f823](https://github.com/fabbricadigitale/proauth.js/commit/6c049793455706a2dad1ce4165800b1beff5f823))
* Fetch polyfill ([bdea1d772016e11795765faeb9d06dafd773f5d6](https://github.com/fabbricadigitale/proauth.js/commit/bdea1d772016e11795765faeb9d06dafd773f5d6))
* Library babel-eslint no longer needed ([1b574441ae5cf6ced71f13250e0743dcc36459d6](https://github.com/fabbricadigitale/proauth.js/commit/1b574441ae5cf6ced71f13250e0743dcc36459d6))
* No coveralls anymore ([8f2ef18a9ef1f2d3aba0140475b068e7f086a07c](https://github.com/fabbricadigitale/proauth.js/commit/8f2ef18a9ef1f2d3aba0140475b068e7f086a07c))
