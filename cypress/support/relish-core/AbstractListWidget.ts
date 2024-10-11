import Widget from "./Widget";
import Component from "./Component";

export default abstract class AbstractListWidget<
  T,
  U extends Widget<T>
> extends Widget<T> {
  private widget: Widget<T>;

  constructor(widget: Widget<T>, parent: Component) {
    super(widget.get(), parent);
    if (parent == null) {
      throw "Parent cannot be null";
    }
    parent.assertVisible();
    this.widget = widget;
  }

  protected abstract items(): T[] | null;

  public get(): T {
    return this.widget.get();
  }

  public click(): void {
    this.widget.click();
  }

  public assertInvisible(): void {
    this.widget.assertInvisible();
  }

  public assertVisible(): void {
    this.widget.assertVisible();
  }

  public assertDisabled(): void {
    this.widget.assertDisabled();
  }

  public assertEnabled(): void {
    this.widget.assertEnabled();
  }

  public scrollTo(): void {
    this.widget.scrollTo();
  }
}
