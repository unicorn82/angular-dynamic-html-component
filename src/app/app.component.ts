import { Component, ViewChild, ViewContainerRef, AfterViewInit, ComponentRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DynamicComponentService } from './dynamic/dynamic-component.service';
import { DynamicLoaderDirective } from './dynamic/directives/dynamic-loader.directive';
import { SanitizeHtmlPipe } from './dynamic/app.pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  dynamicComponent: ComponentRef<any>;

  constructor(private dynamicComponentService: DynamicComponentService, private http: HttpClient,) { }

  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  htmlSanitize: string;

  ngAfterViewInit(): void{
    const configUrl = 'assets/sample.json';
    this.http
    .get(configUrl)
    .subscribe(response => {
      const data: any = response;
      this.generateUserDynamicComponent(data);
    });

    const configUrl2 = 'assets/sample2.json';
    this.http
    .get(configUrl2)
    .subscribe(response => {
       const data2: any = response;
       this.htmlSanitize = data2.content;
    });
  }

  private async generateUserDynamicComponent(dynamicData: any) {
    //  Define the component using Component decorator.
    const component = Component({
      template: dynamicData.content,
      styles: [dynamicData.css]
    })(DynamicLoaderDirective);


    const componentFactory = await this.dynamicComponentService.generateDynamic(component);
    //  Create the component and add to the view.
    const componentRef = this.container.createComponent(componentFactory);
    // Assign the service to the component instance
    // componentRef.instance.dataService = this.dataService;
    this.dynamicComponent = componentRef;
    this.container.insert(componentRef.hostView);
  }
}
