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
}
