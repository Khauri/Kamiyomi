# Extensions

Extensions/sources are the backbone of this application.

Extensions are packages that utilize providers to scrape data from websites and return meaningful results. The results should be in one of the expected formats.

## Setup

Depending on the type of extension being created, the extension will implement an appropriate extension type.

## Methods

The method call flow is inspired by [Tachiyomi's extension call flow](https://github.com/tachiyomiorg/tachiyomi-extensions/blob/master/CONTRIBUTING.md#extension-call-flow) in order to make porting extensions from Java more straightforward.

One major difference is the word 'manga' is specifically not used as this app is more generalized.

### fetchPopular

When a source is initially loaded, the `popular` function will be called. This should return a `PageInfo` object which will contain a number of `Publication`s. An `Publication` will be a manga, manwha, webtoon, webcomic, magazine, article or anything else serializable. 

## Providers

Extensions should make use of providers in order to 

### Browser

Puppeteer can be used as a headless virtual browser in order to scrape pages that have a lot of dynamic loading.
This method tends to be slower, so it's recommended to only use it when there's no other options.

### HTTP Client

The HTTP client is useful for interacting with apis or getting raw HTML to parse.
The HTTP client used is axios.
