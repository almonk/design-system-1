import Component from '@glimmer/component';
import { assert } from '@ember/debug';

export const DEFAULT_COLOR = 'action';
export const COLORS = ['action', 'critical'];

export default class HdsDropdownListItemInteractiveComponent extends Component {
  /**
   * @param text
   * @type {string}
   * @description The text of the item. If no text value is defined an error will be thrown unless it is the generic or separator item type.
   */
  get text() {
    let { text } = this.args;

    assert(
      '@text for "Hds::Dropdown::ListItem::Interactive" must have a valid value',
      text !== undefined
    );

    return text;
  }

  /**
   * @param color
   * @type {string}
   * @default primary
   * @description Determines the color of the item (when item is set to interactive)
   */
  get color() {
    let { color = DEFAULT_COLOR } = this.args;

    assert(
      `@color for "Hds::Dropdown::ListItem::Interactive" must be one of the following: ${COLORS.join(
        ', '
      )}; received: ${color}`,
      COLORS.includes(color)
    );

    return color;
  }

  /**
   * @param icon
   * @type {string}
   * @default null
   * @description The name of the icon to be used.
   */
  get icon() {
    assert(
      `when the "Hds::ListItem::Interactive" @color is "critical" an @icon is required`,
      !(this.color === 'critical' && !this.args.icon)
    );

    return this.args.icon ?? null;
  }

  /**
   * Get the class names to apply to the component.
   * @method classNames
   * @return {string} The "class" attribute to apply to the component.
   */
  get classNames() {
    let classes = [
      'hds-dropdown-list-item',
      'hds-dropdown-list-item--interactive',
    ];

    // add a class based on the @color argument
    classes.push(`hds-dropdown-list-item--color-${this.color}`);

    return classes.join(' ');
  }
}