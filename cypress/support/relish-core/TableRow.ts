import Getable from "./Getable";

export default class TableRow implements Getable {
  private readonly map: { [n: string]: string };

  constructor(map: { [n: string]: any } | null) {
    this.map = map || {};
  }

  public except(...columnNames: string[]): TableRow {
    const exceptions: string[] = [];
    for (let columnName of columnNames) {
      exceptions.push(columnName.toUpperCase());
    }
    const filteredMap: { [n: string]: string } = {};
    for (let key in this.map) {
      if (exceptions.indexOf(key.toUpperCase()) === -1) {
        filteredMap[key] = this.map[key];
      }
    }
    return new TableRow(filteredMap);
  }

  public only(...columnNames: string[]): TableRow {
    const onlyThese: string[] = [];
    for (let columnName of columnNames) {
      onlyThese.push(columnName.toUpperCase());
    }
    const filteredMap: { [n: string]: string } = {};
    for (let key in this.map) {
      if (onlyThese.indexOf(key.toUpperCase()) > -1) {
        filteredMap[key] = this.map[key];
      }
    }
    return new TableRow(filteredMap);
  }

  public getString(key: string): string {
    return this.replaceExpressions(this.map[key]);
  }

  public toObjectMap(): object {
    const clonedMap: { [n: string]: string } = {};
    for (let key in this.map) {
      clonedMap[key] = this.map[key];
    }
    return clonedMap;
  }

  public put(key: string, value: string): void {
    this.map[key] = value;
  }

  public keys(): string[] {
    return Object.keys(this.map);
  }

  private replaceExpressions(value: string | null): string {
    if (value == null) {
      return "";
    }
    return value.replace("<today>", new Date().toString());
  }
}
