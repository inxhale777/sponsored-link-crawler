# Sponsored Links Crawler

## Description
Collects ads link from Google, Bing and Yahoo from search result
via specified keywords, combine results, and return them via API

## How to run locally?
1. `git clone https://github.com/inxhale777/sponsored-link-crawler.git`
2. `npm install`
3. `npm run build`
4. `npm run serve`

## API
### Request URL:
> curl -X GET http://localhost:3000/api/v1/sponsored-links?pages=3&keywords=tiktok,instagram,youtube
### Query parameters:
| Name     | Type                   | Description                              | Required |
|----------|------------------------|------------------------------------------|----------|
| pages    | Number                 | number of pages to look at search engine |Yes |
| keywords | Comma separated string | keywords to search for                   |Yes |


## TODO
1.  Dedicated worker for each page & keyword combination. In current
implementation there is only one worker for each keyword
2. Abstract crawler interface to easily add new search engines
```
interface Crawler {
    run(browser: Browser, page: number, keyword: string): Promise<string[]>
}
```
3. Separate API folders for next versions: v2, v3, etc
4. Use shared in memory resources such as launched chrome instance between multiple task
in order to reduce worker startup time and utilize resource more effectively