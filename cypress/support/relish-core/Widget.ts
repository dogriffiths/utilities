import Component from "./Component";
import TableRow from "./TableRow";

export default abstract class Widget<T> extends Component {
  private peer: T;

  constructor(peer: T, parent: Component) {
    super(parent);
    if (parent == null) {
      throw "Parent cannot be null";
    }
    parent.assertVisible();
    this.peer = peer;
  }

  public get(): T {
    return this.peer;
  }

  public abstract click(): void;

  public abstract assertInvisible(): void;

  public abstract assertVisible(): void;

  public abstract assertDisabled(): void;

  public abstract assertEnabled(): void;

  public abstract scrollTo(): void;

  matches(s: TableRow | string | TableRow[]): void {
    console.log('XXXXXXX s', s)
    if (typeof s === "string") {
      if (s != null) {
        if ("[INVISIBLE]" === s) {
          this.assertInvisible();
          return;
        }
        if ("[VISIBLE]" === s) {
          this.assertVisible();
          return;
        }
        if ("[ENABLED]" === s) {
          this.assertEnabled();
          return;
        }
        if ("[DISABLED]" === s) {
          this.assertDisabled();
          return;
        }
        // @ts-ignore
        if (s.startsWith("[[") && s.endsWith("]]")) {
          s = s.substring(1, s.length - 1);
        }
      }
    }
    super.matches(s);
  }
}
