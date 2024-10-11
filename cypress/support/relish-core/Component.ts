import Getable from "./Getable";
import TableRow from "./TableRow";

function camelize(str: string): string {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index == 0 ? match.toLowerCase() : match.toUpperCase();
  });
}

export default abstract class Component implements Getable {
  parent: Component | null;

  protected constructor(parent: Component | null) {
    this.parent = parent;
  }

  getParent(): Component | null {
    return this.parent;
  }

  getRoot(): Component {
    const parent: Component | null = this.getParent();
    if (parent == null) {
      return this;
    }
    // if (parent instanceof Widget) {
    //     return parent.getRoot();
    // }
    return parent;
  }

  abstract assertVisible(): void;

  getString(key: string): string {
    const result: any = this.evaluateMethod(key);

    if (typeof result === "string") {
      return result;
    } else {
      return result();
    }
  }

  set(tr: TableRow | string | object): Component {
    let result = null;
    if (typeof tr === "string") {
      throw "Cannot set string values on base components";
    }
    let tableRow: TableRow =
      tr instanceof TableRow ? (tr as TableRow) : new TableRow(tr);
    for (let key of tableRow.keys()) {
      result = this.evaluateMethod(key);
      if (result instanceof Component) {
        result.set(tableRow.getString(key));
      } else {
        throw "Cannot set the value for " + key + "()";
      }
    }
    return this;
  }

  matches(v: TableRow | string | TableRow[]): void {
    if (v instanceof TableRow) {
      this.assertVisible();

      let tableRow: TableRow =
        v instanceof TableRow ? (v as TableRow) : new TableRow(v);
      for (let key of tableRow.keys()) {
        let expected = tableRow.getString(key);
        let evaluateMethod1 = this.evaluateMethod(key);
        if (typeof evaluateMethod1 === "string") {
          expect(evaluateMethod1).equals(expected);
        } else {
          evaluateMethod1.matches(expected);
        }
      }
    }
  }

  evaluateMethod(methodName: string): any {
    const t = this as { [key: string]: any };
    if (methodName in t) {
      if (typeof t[methodName] === "function") {
        return t[methodName]();
      }
      return t[methodName];
    }
    const camelizeName = camelize(methodName);
    if (camelizeName in t) {
      return t[camelizeName]();
    }
    throw "Cannot find value matching '" + methodName + "'";
  }

  toString(): string {
    if (this.parent != null) {
      return this.parent + "/" + this.describe();
    }
    return "/" + this.describe();
  }

  describe(): string {
    return this.constructor.toString();
  }
}
