import { Designer } from '..';

export class ComponentManager {
  constructor(private readonly designer: Designer) {}

  registerComponents() {
    console.log(this.designer, '111')
  }

  destroy() {
    //
  }
}
