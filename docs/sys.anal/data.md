# Data structure

## For tables

### Column Header structure

```ts
interface IColumn {
    title: String;
    position: Number;
    type: "number"|"string"|"date"|"datetime"|"timestamp"|string;
    tooltip: undefined|null|string;
    order: null|String;
    filter: Array<string>
}
```

## For the data for tables and ?diagram

### linking data with the header
```ts
interface IData {
    /**
     * @property {Number} id - year+month
     */
    id: number;
    /**
     * @property {Number} food - food and restourant, bar, other
     */
    food: number;
    /**
     * @property {Number} repair_maintenance - maintenance your technica, car, house OR reparing
     */
    repair_maintenance: number;
    /**
     * @property {Number} connection_internet - mobile phone operator, internet provider, smth else
     */
    connection_internet: number;
    /**
     * @property {Number} transport - bus, subway, taxi,...
     */
    transport: number;
    /**
     * @property {Number} medicine - prevention, therapy, treatment, ...
     */
    medicine: number;
    /**
     * @property {Number} sport - sport activities, sport clothes or things/tools, competitions,... (! not regular activities)
     */
    sport: number;
    /**
     * @property {Number} household - household chemicals, household tools/rags, ropes, threads, fabrics,...
     */
    household: number;
    /**
     * @property {Number} clothes - u know what it means
     */
    clothes: number;
    /**
     * @property {Number} studying - non regular spendings for studying
     */
    studying: number;
    /**
     * @property {Number} rest - spending to rest
     */
    rest: number;
    /**
     * @property {Number} undetermined - another non regular spendings
     */
    undetermined: number;
}
```


### таблица расходов не регулярных (разовых) в месяц по напра
```json
{
    "columns": [
        {
            "title": "питание",
            "position": 0,
            "type": "number",
            "order": null,
            "filter": []
        },
        {
            "title": "рем./обсл.",
            "position": 1,
            "type": "number",
            "tooltip": "ремонт/обслуживание",
            "order": null,
            "filter": []
        },
        {
            "title": "связь/интернет",
            "position": 2,
            "type": "number",
            "order": null,
            "filter": []
        },
        {
            "title": "транспорт",
            "position": 3,
            "type": "number",
            "order": null,
            "filter": []
        },
        {
            "title": "медицина",
            "position": 4,
            "type": "number",
            "tooltip": "лечение, профилактика, витамины",
            "order": null,
            "filter": []
        },
        {
            "title": "спорт",
            "position": 5,
            "type": "number",
            "order": null,
            "filter": []
        },
        {
            "title": "бытовые",
            "position": 6,
            "type": "number",
            "order": null,
            "filter": []
        },
        {
            "title": "одежда",
            "position": 7,
            "type": "number",
            "order": null,
            "filter": []
        },
        {
            "title": "учеба",
            "position": 8,
            "type": "number",
            "order": null,
            "filter": []
        },
        {
            "title": "отдых",
            "position": 9,
            "type": "number",
            "order": null,
            "filter": []
        },
        {
            "title": "прочее",
            "position": 10,
            "type": "number",
            "order": null,
            "filter": []
        }
    ],
    
    "data": [
        {
            "id": 202201,
            "food": 0,
            "repair_maintenance": 0,
            "connection_internet": 0,
            "transport": 0,
            "medicine": 0,
            "sport": 0,
            "household": 0,
            "clothes": 0,
            "studying": 0,
            "rest": 0,
            "undetermined": 0
        }
    ]
}
```
