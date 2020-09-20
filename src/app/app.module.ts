import { BrowserModule } from '@angular/platform-browser';
import { NgModule, COMPILER_OPTIONS, CompilerFactory, Compiler} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { DynamicLoaderDirective } from './dynamic/directives/dynamic-loader.directive';
import { Directive1Directive } from './dynamic/directives/directive1.directive';
import { Directive2Directive } from './dynamic/directives/directive2.directive';
import { SanitizeHtmlPipe } from './dynamic/app.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SanitizeHtmlPipe,
    DynamicLoaderDirective,
    Directive1Directive,
    Directive2Directive
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    { provide: COMPILER_OPTIONS, useValue: {}, multi: true },
    { provide: CompilerFactory, useClass: JitCompilerFactory, deps: [COMPILER_OPTIONS] },
    { provide: Compiler, useFactory: createCompiler, deps: [CompilerFactory] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function createCompiler(compilerFactory: CompilerFactory): any{
  return compilerFactory.createCompiler();
}
