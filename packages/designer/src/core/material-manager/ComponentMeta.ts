import { ComponentMetaSchema } from '../../types';

export class ComponentMeta {
  constructor(private readonly componentMeta: ComponentMetaSchema) {}

  get schema() {
    return this.componentMeta
  }

  get snippets() {
    return this.componentMeta.snippets
  }

  get componentName() {
    return this.componentMeta.componentName
  }

  get disableBehaviors() {
    return this.configure?.component?.disableBehaviors
  }

  get configure() {
    return this.componentMeta.configure
  }

  get props() {
    return this.componentMeta.props
  }

  get isContainer() {
    return this.configure?.component?.isContainer
  }

  get isModal() {
    return this.configure?.component?.isContainer
  }
}
