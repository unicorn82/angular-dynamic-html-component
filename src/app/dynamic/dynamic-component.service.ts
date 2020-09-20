import { Compiler, ComponentFactory, Injectable, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Directive1Directive } from './directives/directive1.directive';
import { Directive2Directive} from './directives/directive2.directive';
@Injectable({
  providedIn: 'root'
})
export class DynamicComponentService {

  constructor(private compiler: Compiler) { }

  async generateDynamic(component: any): Promise<ComponentFactory<any>> {
    this.compiler.clearCache();

    const type = component;
    const module = this.generateNewModule(type);

    return new Promise(
      (resolve, reject) => {
        this.compiler.compileModuleAndAllComponentsAsync(module)
          .then((factories) => {
            const componentFactory = factories.componentFactories[0];
            resolve(componentFactory);
          },
            (error) => reject(error));
      });

  }

  private generateNewModule(componentType: any): any {
    // Define the module using NgModule decorator.
    const module = NgModule({
      declarations: [componentType,  Directive1Directive, Directive2Directive],
      imports: [CommonModule],
    })(class { });
    return module;
  }
}
