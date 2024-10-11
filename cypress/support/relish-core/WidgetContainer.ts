import Widget from "./Widget";

export default interface WidgetContainer<T> {
  getWidget(key: string): Widget<T>;
}
